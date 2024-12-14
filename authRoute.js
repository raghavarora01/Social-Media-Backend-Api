import express from "express";
import authRoutes from "./auth.js";

const app = express();

app.post("/register", authRoutes.registerUser);
app.post("/login", authRoutes.login);


export default app;
