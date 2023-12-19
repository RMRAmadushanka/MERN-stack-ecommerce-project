import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();
const port = process.env.PORT;
import { notFound, errorHandler } from "./middleware/errorHandler.js";

import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
connectDB();
const app = express();
app.use(cors());
app.use("/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
