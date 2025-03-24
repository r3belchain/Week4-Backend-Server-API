
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();


const app = express();
app.use(express.json());
app.use("/api", routes);  // Prefix "/api"

// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);


