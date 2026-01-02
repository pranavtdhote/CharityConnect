import { useState, useEffect } from "react";
import { ethers } from "ethers";
import charityAbi from "./Contract/CharityDonation.json";
import "./App.css";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [registeredCharities, setRegisteredCharities] = useState([]);
    const [fundRequests, setFundRequests] = useState([]);
    const [donateAmount, setDonateAmount] = useState("0");
    const [selectedCharity, setSelectedCharity] = useState("");
    const [charityName, setCharityName] = useState("");
    const [charityWallet, setCharityWallet] = useState("");
    const [requestAmount, setRequestAmount] = useState("0");
    const [voteRequestId, setVoteRequestId] = useState("0");
    const [voteDecision, setVoteDecision] = useState(true);

    useEffect(() => {
        const loadBlockchainData = async () => {
            if (!window.ethereum) return alert("Install MetaMask");
            const provider = new ethers.BrowserProvider(window.ethereum);
            setProvider(provider);
            const signer = await provider.getSigner();
            setSigner(signer);
            const contract = new ethers.Contract(contractAddress, charityAbi.abi, signer);
            setContract(contract);
            await loadCharities(contract);
            await loadFundRequests(contract);
        };
        loadBlockchainData();
    }, []);

    const loadCharities = async (contract) => {
        const charities = await contract.getRegisteredCharities();
        setRegisteredCharities(charities);
    };

    const loadFundRequests = async (contract) => {
        const requests = [];
        const count = await contract.fundRequestCount();
        for (let i = 1; i <= count; i++) {
            const request = await contract.fundRequests(i);
            requests.push({
                id: i,
                charity: request.charity,
                amount: ethers.formatEther(request.amount),
                approvals: request.approvals,
                rejections: request.rejections,
                executed: request.executed
            });
        }
        setFundRequests(requests);
    };

    const registerCharity = async () => {
        if (!charityName || !charityWallet) return alert("Please enter all details");
        try {
            const tx = await contract.registerCharity(charityName, charityWallet);
            await tx.wait();
            alert("Charity Registered Successfully!");
            await loadCharities(contract);
        } catch (error) {
            alert("Error registering charity: " + error.reason);
        }
    };

    const donate = async () => {
        if (!selectedCharity || donateAmount <= 0) return alert("Invalid input");
        try {
            const tx = await contract.donate(selectedCharity, { value: ethers.parseEther(donateAmount) });
            await tx.wait();
            alert("Donation Successful");
            await loadCharities(contract);
        } catch (error) {
            alert("Error donating: " + error.reason);
        }
    };

    const requestFunds = async () => {
        if (requestAmount <= 0) return alert("Invalid amount");
        try {
            const tx = await contract.createFundRequest(ethers.parseEther(requestAmount));
            await tx.wait();
            alert("Fund Request Created");
            await loadFundRequests(contract);
        } catch (error) {
            alert("Error requesting funds: " + error.reason);
        }
    };

    const voteOnRequest = async () => {
        try {
            const tx = await contract.voteOnFundRequest(voteRequestId, voteDecision);
            await tx.wait();
            alert("Vote Cast Successfully");
            await loadFundRequests(contract);
        } catch (error) {
            alert("Error voting: " + error.reason);
        }
    };

    const withdrawFunds = async () => {
        try {
            const tx = await contract.withdrawFunds();
            await tx.wait();
            alert("Funds Withdrawn Successfully");
        } catch (error) {
            alert("Error withdrawing funds: " + error.reason);
        }
    };

    return (
        <div className="app-container">
            <h1>Charity Donation DApp</h1>
            <div className="charity-section">
                <h2>Register New Charity</h2>
                <input type="text" placeholder="Charity Name" className="input" onChange={(e) => setCharityName(e.target.value)} />
                <input type="text" placeholder="Charity Wallet Address" className="input" onChange={(e) => setCharityWallet(e.target.value)} />
                <button className="button button-primary" onClick={registerCharity}>Register Charity</button>
            </div>
            <div className="charity-section">
                <h2>Donate to Charity</h2>
                <select className="dropdown" onChange={(e) => setSelectedCharity(e.target.value)}>
                    <option value="">Select a Charity</option>
                    {registeredCharities.map((charity, index) => (
                        <option key={index} value={charity}>{charity}</option>
                    ))}
                </select>
                <input type="number" placeholder="Enter amount in ETH" className="input" onChange={(e) => setDonateAmount(e.target.value)} />
                <button className="button button-primary" onClick={donate}>Donate</button>
            </div>
            <div className="charity-section">
                <h2>Request Funds</h2>
                <input type="number" placeholder="Enter amount to request" className="input" onChange={(e) => setRequestAmount(e.target.value)} />
                <button className="button button-primary" onClick={requestFunds}>Request Funds</button>
            </div>
            <div className="charity-section">
                <h2>Vote on Fund Requests</h2>
                <input type="number" placeholder="Request ID" className="input" onChange={(e) => setVoteRequestId(e.target.value)} />
                <select className="dropdown" onChange={(e) => setVoteDecision(e.target.value === "true")}> 
                    <option value="true">Approve</option>
                    <option value="false">Reject</option>
                </select>
                <button className="button button-primary" onClick={voteOnRequest}>Vote</button>
            </div>
            <button className="button button-secondary" onClick={withdrawFunds}>Withdraw Funds</button>
        </div>
    );
}

export default App;
