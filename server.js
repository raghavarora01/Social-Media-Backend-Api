import express from "express";
import authRoutes from "./authRoute.js";
import postRoutes from "./postRoutes.js";
const app = express();
const PORT = 9000;
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the Express Server!");
});
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
