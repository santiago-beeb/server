import express from "express";
import morgan from "morgan";
import cors from "cors";

//Routes
import userRoutes from "./routes/user.routes.js";

const app = express();

//settings
const PORT = process.env.PORT || 3001;
app.listen(PORT);

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//Route
app.use("/api/user", userRoutes);

export { app };
