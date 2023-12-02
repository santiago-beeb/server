import { config } from "dotenv";

config(); 

export default {
  host: process.env.HOST || "",
  database: process.env.DATABASE || "",
  user: process.env.USER || "",
  password: process.env.PASSWORD || "",
  port: process.env.DB_PORT || "",
  key: process.env.SECRET_KEY
};

//prueba de commit
