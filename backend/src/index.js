import 'dotenv/config';

import cors from 'cors';
import express from "express";
import connectDB from './database/db.js';

import registerRoutes from './routes/registerRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

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
