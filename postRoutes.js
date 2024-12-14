import express from "express";
import postRoutes from "../controllers/post.js";

const app = express();

app.post("/add", postRoutes.add);

export default app;
