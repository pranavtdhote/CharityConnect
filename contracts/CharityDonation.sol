// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CharityDonation {
    address public owner;
    bool public isPaused = false; // Emergency Stop

    struct Charity {
        string name;
        address payable wallet;
        uint256 totalDonations;
        uint256 totalWithdrawn;
        bool isRegistered;
    }

    struct Withdrawal {
        uint256 amount;
        uint256 timestamp;
    }
    
    struct FundRequest {
        address charity;
        uint256 amount;
        uint256 approvals;
        uint256 rejections;
        bool executed;
        mapping(address => bool) voted;
    }

    mapping(address => Charity) public charities;
    mapping(address => mapping(address => uint256)) public donations;
    mapping(address => Withdrawal[]) public withdrawalHistory;
    mapping(uint256 => FundRequest) public fundRequests;
    
    address[] public registeredCharities;
    uint256 public fundRequestCount = 0;

    event DonationReceived(address indexed donor, address indexed charity, uint256 amount);
    event FundsWithdrawn(address indexed charity, uint256 amount);
    event CharityRegistered(address indexed charity, string name);
    event FundRequestCreated(uint256 indexed requestId, address indexed charity, uint256 amount);
    event FundRequestVoted(uint256 indexed requestId, address indexed voter, bool approved);
    event FundRequestExecuted(uint256 indexed requestId, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier onlyCharity() {
        require(charities[msg.sender].isRegistered, "Only registered charities can request funds");
        _;
    }
    
    modifier whenNotPaused() {
        require(!isPaused, "Contract is paused");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function togglePause() public onlyOwner {
        isPaused = !isPaused;
    }

    function registerCharity(string memory _name, address payable _charityWallet) public onlyOwner {
        require(!charities[_charityWallet].isRegistered, "Charity already registered");
        charities[_charityWallet] = Charity(_name, _charityWallet, 0, 0, true);
        registeredCharities.push(_charityWallet);
        emit CharityRegistered(_charityWallet, _name);
    }

    function donate(address _charity) public payable whenNotPaused {
        require(msg.value > 0, "Must send some ETH");
        require(charities[_charity].isRegistered, "Charity not registered");

        donations[msg.sender][_charity] += msg.value;
        charities[_charity].totalDonations += msg.value;

        emit DonationReceived(msg.sender, _charity, msg.value);
    }

    function createFundRequest(uint256 _amount) public onlyCharity whenNotPaused {
        require(_amount > 0, "Amount must be greater than 0");
        require(getCharityBalance(msg.sender) >= _amount, "Not enough available funds");
        
        fundRequestCount++;
        FundRequest storage request = fundRequests[fundRequestCount];
        request.charity = msg.sender;
        request.amount = _amount;
        request.approvals = 0;
        request.rejections = 0;
        request.executed = false;
        
        emit FundRequestCreated(fundRequestCount, msg.sender, _amount);
    }

    function voteOnFundRequest(uint256 _requestId, bool _approve) public whenNotPaused {
        FundRequest storage request = fundRequests[_requestId];
        require(!request.voted[msg.sender], "You have already voted");
        require(donations[msg.sender][request.charity] > 0, "Only donors can vote");
        
        request.voted[msg.sender] = true;
        if (_approve) {
            request.approvals += 1;
        } else {
            request.rejections += 1;
        }
        emit FundRequestVoted(_requestId, msg.sender, _approve);
    }

    function executeFundRequest(uint256 _requestId) public whenNotPaused {
        FundRequest storage request = fundRequests[_requestId];
        require(!request.executed, "Request already executed");
        require(request.approvals > request.rejections, "Not enough approvals");
        require(getCharityBalance(request.charity) >= request.amount, "Not enough available funds");
        
        request.executed = true;
        charities[request.charity].wallet.transfer(request.amount);
        charities[request.charity].totalWithdrawn += request.amount;
        emit FundRequestExecuted(_requestId, request.amount);
    }

    function getCharityBalance(address _charity) public view returns (uint256) {
        return charities[_charity].totalDonations - charities[_charity].totalWithdrawn;
    }

    function getRegisteredCharities() public view returns (address[] memory) {
        return registeredCharities;
    }

    function getWithdrawalHistory(address _charity) public view returns (Withdrawal[] memory) {
        return withdrawalHistory[_charity];
    }
}
