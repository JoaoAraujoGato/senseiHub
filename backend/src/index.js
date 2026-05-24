import 'dotenv/config';

import express from "express";
import connectDB from './database/db.js';

import registerRoutes from './routes/registerRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());

registerRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
