import 'dotenv/config';

import cors from 'cors';
import express from "express";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './database/db.js';

import registerRoutes from './routes/registerRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// CSP desativado para não bloquear o Swagger UI em /doc
app.use(helmet({ contentSecurityPolicy: false }));
// CORS restrito por env (CORS_ORIGIN="http://a,http://b"); aberto se não definido
app.use(cors({ origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true }));
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }));

registerRoutes(app);

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Tratamento global de erros — evita vazar stack trace
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: status < 500 ? err.message : 'Erro interno do servidor' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
