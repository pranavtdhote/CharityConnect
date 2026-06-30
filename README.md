# ❤️ CharityConnect

> A decentralized charity donation platform that combines the transparency of blockchain with the usability of modern web technologies.

![Laravel](https://img.shields.io/badge/Laravel-11-red)
![PHP](https://img.shields.io/badge/PHP-8.2-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38BDF8)
![Solidity](https://img.shields.io/badge/Solidity-0.8.x-black)
![Hardhat](https://img.shields.io/badge/Hardhat-Web3-yellow)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📖 Overview

CharityConnect is a blockchain-enabled donation platform that connects donors with verified NGOs and charitable organizations.

Traditional donation platforms often suffer from limited transparency, making it difficult for donors to track how their contributions are used. CharityConnect solves this problem by leveraging Ethereum smart contracts to create a secure, transparent, and tamper-proof donation system.

Every donation is recorded on-chain, allowing donors to verify transactions while organizations can manage fundraising campaigns efficiently.

---

## ✨ Features

### 👤 User Authentication
- Secure Login & Registration
- Laravel Jetstream Authentication
- Profile Management

### 🏢 NGO Management
- NGO Registration
- NGO Verification
- Organization Dashboard
- Campaign Creation

### 💰 Donations
- Cryptocurrency Donations
- Donation History
- Real-time Transaction Records
- Transparent Fund Tracking

### 📢 Fundraising Campaigns
- Create Campaigns
- Set Funding Goals
- Campaign Progress Tracking
- Milestone-based Fund Release

### 🔐 Smart Contracts
- Charity Registration
- Donate to NGOs
- Campaign Creation
- Secure Fund Withdrawal
- Blockchain Transaction Verification

---

# 🏗️ System Architecture

```
                 Donor
                   │
                   ▼
          Laravel Frontend
                   │
        ---------------------
        │                   │
        ▼                   ▼
 Laravel Backend      Ethereum Blockchain
        │                   │
        ▼                   ▼
     MySQL DB         Smart Contracts
```

---

# 🛠️ Tech Stack

## Frontend
- Laravel Blade
- Tailwind CSS
- Alpine.js

## Backend
- Laravel 11
- PHP 8+
- Laravel Jetstream

## Database
- MySQL

## Blockchain
- Solidity
- Hardhat
- Ethers.js

## Wallet
- MetaMask

---

# 📂 Project Structure

```
CharityConnect
│
├── app/
├── bootstrap/
├── config/
├── database/
├── public/
├── resources/
│     ├── css
│     ├── js
│     └── views
├── routes/
├── storage/
├── contracts/
├── scripts/
├── test/
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/pranavtdhote/CharityConnect.git
cd CharityConnect
```

## Install Laravel Dependencies

```bash
composer install
```

## Install Node Packages

```bash
npm install
```

## Configure Environment

```bash
cp .env.example .env
```

Generate application key

```bash
php artisan key:generate
```

Configure database credentials inside `.env`

```env
DB_DATABASE=charityconnect
DB_USERNAME=root
DB_PASSWORD=
```

Run migrations

```bash
php artisan migrate
```

Compile frontend

```bash
npm run dev
```

Start Laravel

```bash
php artisan serve
```

---

# 🔗 Smart Contract Setup

Move to the blockchain directory

```bash
cd blockchain
```

Install dependencies

```bash
npm install
```

Compile contracts

```bash
npx hardhat compile
```

Run local blockchain

```bash
npx hardhat node
```

Deploy contracts

```bash
npx hardhat run scripts/deploy.js --network localhost
```

---

# 📷 Screenshots

## Home Page

> Add screenshot here

---

## NGO Dashboard

> Add screenshot here

---

## Donation Page

> Add screenshot here

---

## Blockchain Transaction

> Add MetaMask transaction screenshot here

---

# 🔐 Smart Contract Functions

### Charity Registration

```solidity
registerCharity()
```

Registers a verified charity.

---

### Donate

```solidity
donate()
```

Allows users to donate cryptocurrency.

---

### Create Campaign

```solidity
createCampaign()
```

Creates a fundraising campaign.

---

### Donate to Campaign

```solidity
donateToCampaign()
```

Allows donations to campaigns.

---

### Withdraw Funds

```solidity
withdrawFunds()
```

Transfers collected funds to authorized charities.

---

# 🎯 Future Enhancements

- Multi-chain support
- AI-powered NGO recommendation system
- Donation analytics dashboard
- NFT donation certificates
- QR-code donations
- Email notifications
- Mobile application
- Fiat payment gateway integration
- DAO-based charity governance

---

# 👨‍💻 Author

**Pranav Dhote**

B.Tech Information Technology  
AISSMS Institute of Information Technology, Pune

GitHub:
https://github.com/pranavtdhote


# 📄 License

This project is licensed under the MIT License.

---

## ⭐ If you found this project useful, consider giving it a Star!
