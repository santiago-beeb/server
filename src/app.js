import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import { getConnection } from "./database/database.js";
import "./models/associations.js";

// Rutas
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: ["https://general-shop.vercel.app", "http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

// Rutas
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

// configurar puerto
const PORT = process.env.PORT || 3001;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

// //Configuración inicial
(async () => {
  try {
    const sequelize = getConnection();

    await sequelize.sync();

    console.log("Tablas creadas y modelos sincronizados con éxito.");
  } catch (error) {
    console.error("Error en la configuración inicial:", error);
  }
})();

export { app };
