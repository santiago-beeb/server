import express from "express";
import morgan from "morgan";
import cors from "cors";

//Routes
import shopRoutes from "./routes/shop.routes";

const app = express();

//settings
app.set("port", 8055);

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//Route
app.use("/api/shop", shopRoutes);

export { app };