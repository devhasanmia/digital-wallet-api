import express, { Request, Response } from 'express'
import cors from "cors"
import helmet from 'helmet';
import morgan from 'morgan';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import { router } from './app/routes';

const app = express()

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1', router)


app.get("/", (req: Request, res: Response) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Digital Wallet API</title>
      <style>
          body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f9fafb;
              color: #333;
              padding: 2rem;
              text-align: center;
          }
          h1 {
              color: #1e40af;
              margin-bottom: 0.5rem;
          }
          h2 {
              color: #2563eb;
              margin-top: 2rem;
              margin-bottom: 0.5rem;
          }
          .info {
              background: #ffffff;
              padding: 2rem;
              border-radius: 10px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
              max-width: 800px;
              margin: auto;
              text-align: left;
          }
          ul {
              list-style: none;
              padding-left: 0;
          }
          li {
              margin-bottom: 0.5rem;
              font-size: 0.95rem;
          }
          code {
              background-color: #e5e7eb;
              padding: 3px 6px;
              border-radius: 5px;
              font-family: monospace;
          }
          footer {
              margin-top: 2rem;
              font-size: 0.85rem;
              color: #777;
          }
      </style>
  </head>
  <body>
      <h1>Digital Wallet API</h1>
      <br/>
      <div class="info">
          <p><strong>Version:</strong> 1.0.0</p>
          <p><strong>Status:</strong> ✅ Running</p>
          <p><strong>Base URL:</strong> <code>/api/v1</code></p>

          <h2>🔐 Auth Routes</h2>
          <ul>
              <li><code>POST /api/v1/auth/register</code> — Register new user/agent</li>
              <li><code>POST /api/v1/auth/login</code> — Login and get JWT token</li>
              <li><code>POST /api/v1/auth/logout</code> — Logout user</li>
          </ul>

          <h2>👤 User Routes</h2>
          <ul>
                            <li><code>GET /api/v1/user/profile</code> — Get own profile (accessible by <strong>admin, user, agent</strong>)</li>
          </ul>

          <h2>💼 Wallet Routes</h2>
          <ul>
              <li><code>GET /api/v1/wallet/</code> — View wallet balance</li>
              <li><code>POST /api/v1/wallet/send-money</code> — Send money to another user</li>
              <li><code>POST /api/v1/wallet/withdraw</code> — Withdraw money</li>
          </ul>

          <h2>📜 Transaction Routes</h2>
          <ul>
              <li><code>GET /api/v1/transactions/me</code> — View own transaction history</li>
              <li><code>POST /api/v1/wallet/add-money</code> — Add money to own wallet</li>
          </ul>

          <h2>🧑‍💼 Agent Routes</h2>
          <ul>
              <li><code>POST /api/v1/agent/cash-in</code> — Add money to user (cash-in)</li>
              <li><code>POST /api/v1/agent/withdraw</code> — Withdraw money from user (cash-out)</li>
              <!-- Optional: <li><code>GET /api/v1/agent/commissions</code> — View commission history</li> -->
          </ul>

          <h2>🛠️ Admin Routes</h2>
          <ul>
              <li><code>GET /api/v1/admin/users</code> — View all users</li>
              <li><code>GET /api/v1/admin/agents</code> — View all agents</li>
              <li><code>GET /api/v1/admin/wallets</code> — View all wallets</li>
              <li><code>PATCH /api/v1/admin/wallets/:walletId/block</code> — Block or unblock a wallet (body: { block: true/false })</li>
              <li><code>PATCH /api/v1/admin/agents/:agentId</code> — Approve or suspend agent (body: { status: "approved" | "rejected" })</li>
              <li><code>GET /api/v1/admin/transactions</code> — View all transactions</li>
          </ul>

          
      </div>

      <footer>
          &copy; ${new Date().getFullYear()} Digital Wallet API — Developed by MD. HASAN MIA
      </footer>
  </body>
  </html>
  `;
  res.send(html);
});

app.use(globalErrorHandler)
app.use(notFound);
export default app