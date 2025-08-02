# 💳 Digital Wallet API

A secure, role-based RESTful API for digital wallet operations, built with **Node.js**, **Express.js**, **MongoDB**, and **TypeScript**.

---

## 📦 Features

- 🔐 User, Agent, Admin roles with RBAC
- 💼 Wallet operations: Add, Send, Withdraw
- 💸 Agent cash-in & cash-out support
- 📜 Transaction history with rollback support
- 🛠️ Admin controls: approve agents, block wallets
- ✅ Error handling, request validation & modular structure

---

## ⚙️ Environment Setup

### 1️⃣ Clone the Project

```bash
git clone https://github.com/devhasanmia/digital-wallet-api.git
cd digital-wallet-api
```

### 2️⃣ Install Dependencies

```bash
yarn or npm install or bun install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
DATABASE=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=2h
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d

# Bcrypt Configuration
BCRYPT_SALT_ROUNDS=10

# Admin Seed User Credentials
ADMIN_NAME=Super Admin
ADMIN_EMAIL=digital.wallet@gmail.com
ADMIN_PHONE=017xxxxxxxx
ADMIN_PASSWORD=your_admin_password
ADMIN_ROLE=admin
```

### 4️⃣ Start the Server

```bash
npm run dev
```

---

## 🚀 API Documentation

📌 **Base URL**: `/api/v1`

---

### 🔐 Auth Routes

| Method | Endpoint           | Description                         |
|--------|--------------------|-------------------------------------|
| POST   | `/auth/register`   | Register new user or agent          |
| POST   | `/auth/login`      | Login and receive token             |
| POST   | `/auth/logout`     | Logout and invalidate token         |

---

### 👤 User Routes

| Method | Endpoint           | Description                                            |
|--------|--------------------|--------------------------------------------------------|
| GET    | `/user/profile`    | View own profile (accessible by user, agent, admin)   |

---

### 💼 Wallet Routes

| Method | Endpoint               | Description                         |
|--------|------------------------|-------------------------------------|
| GET    | `/wallet/`             | View own wallet balance             |
| POST   | `/wallet/send-money`   | Send money to another user          |
| POST   | `/wallet/withdraw`     | Withdraw money from wallet          |

---

### 📜 Transaction Routes

| Method | Endpoint                  | Description                         |
|--------|---------------------------|-------------------------------------|
| GET    | `/transactions/me`        | View own transaction history        |
| POST   | `/wallet/add-money`       | Add money to own wallet             |

---

### 🧑‍💼 Agent Routes

| Method | Endpoint              | Description                         |
|--------|-----------------------|-------------------------------------|
| POST   | `/agent/cash-in`      | Add money to user (cash-in)         |
| POST   | `/agent/withdraw`     | Withdraw money from user (cash-out) |

---

### 🛠️ Admin Routes

| Method | Endpoint                                | Description                                                             |
|--------|-----------------------------------------|-------------------------------------------------------------------------|
| GET    | `/admin/users`                          | View all users                                                          |
| GET    | `/admin/agents`                         | View all agents                                                         |
| GET    | `/admin/wallets`                        | View all wallets                                                        |
| PATCH  | `/admin/wallets/:walletId/block`        | Block/unblock wallet (`body: { block: true/false }`)                    |
| PATCH  | `/admin/agents/:agentId`                | Approve/suspend agent (`body: { status: "approved" | "rejected" }`)    |
| GET    | `/admin/transactions`                   | View all transactions                                                   |

---

## 🔐 Auth Example (JWT)

To access protected routes, include the access token in the request header:

```http
Authorization: <access_token>
```

---

## 🧪 Postman Collection

A sample collection is available in:

```
postman_collection.json
```

Import into Postman to test all routes easily.

---

## 📽️ Demo (Optional)

If needed, include a 5–10 minute recorded video showing:

- Register/login flow
- Wallet operations
- Agent transactions
- Admin controls

---

## 🧑‍💻 Author

**MD. HASAN MIA**  
📧 Email: your.email@example.com  
🌐 GitHub: [@yourusername](https://github.com/yourusername)

---

## 📄 License

This project is licensed under the **MIT License**.

---
