import jwt from "jsonwebtoken";
import config from "../config.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.usr_id,
      rol: user.usr_rol,
    },
    config.key,
    {
      expiresIn: "1h",
    }
  );
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.key);
    return decoded;
  } catch (error) {
    return null;
  }
};

export { generateToken, verifyToken };
