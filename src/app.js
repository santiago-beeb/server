import express from "express";
import morgan from "morgan";
import cors from "cors";

//Routes
import userRoutes from "./routes/user.routes.js";

const app = express();

//settings
//app.set("port", 3001);

app.listen(3001)

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//Route
app.use("/api/user", userRoutes);

export { app };