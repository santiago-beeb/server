import express from "express";
import morgan from "morgan";
import cors from "cors";

import { getConnection } from './database/database.js'; // Importa la conexión a la base de datos
import prueba from './models/prueba.js'; // Importa el modelo que has definido


// Routes
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

// Setting the port
const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Configuración inicial
(async () => {
  try {
    // Conecta a la base de datos
    const sequelize = getConnection();

    // Sincroniza los modelos con la base de datos (crea las tablas si no existen)
    await sequelize.sync();

    console.log("Tablas creadas y modelos sincronizados con éxito.");
  } catch (error) {
    console.error("Error en la configuración inicial:", error);
  }
})();

// Export the app (optional)
export default app;
