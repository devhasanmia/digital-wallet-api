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
          </ul>

          <h2>👤 User Routes</h2>
          <ul>
              <li><code>GET /api/v1/user/profile</code> — Get own profile</li>
              <li><code>GET /api/v1/wallet</code> — View wallet balance</li>
              <li><code>POST /api/v1/wallet/top-up</code> — Add money to own wallet</li>
              <li><code>POST /api/v1/wallet/withdraw</code> — Withdraw money</li>
              <li><code>POST /api/v1/wallet/send</code> — Send money to another user</li>
              <li><code>GET /api/v1/transactions/me</code> — Transaction history</li>
          </ul>

          <h2>🧑‍💼 Agent Routes</h2>
          <ul>
              <li><code>POST /api/v1/agent/cash-in</code> — Add money to user (cash-in)</li>
              <li><code>POST /api/v1/agent/cash-out</code> — Withdraw money from user (cash-out)</li>
              <li><code>GET /api/v1/agent/commissions</code> — View commission history (optional)</li>
          </ul>

          <h2>🛠️ Admin Routes</h2>
          <ul>
              <li><code>GET /api/v1/admin/users</code> — View all users</li>
              <li><code>GET /api/v1/admin/agents</code> — View all agents</li>
              <li><code>GET /api/v1/admin/wallets</code> — View all wallets</li>
              <li><code>PATCH /api/v1/admin/wallet/block/:id</code> — Block a wallet</li>
              <li><code>PATCH /api/v1/admin/wallet/unblock/:id</code> — Unblock a wallet</li>
              <li><code>PATCH /api/v1/admin/agent/approve/:id</code> — Approve agent</li>
              <li><code>PATCH /api/v1/admin/agent/suspend/:id</code> — Suspend agent</li>
              <li><code>PATCH /api/v1/admin/settings</code> — Set transaction fee (optional)</li>
          </ul>

          <h2>📘 Docs & Testing</h2>
          <ul>
              <li>Postman Collection: <code>./postman_collection.json</code></li>
              <li>README.md: Setup, usage, all endpoints</li>
              <li>Video: Demo with explanation (max 10 min)</li>
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