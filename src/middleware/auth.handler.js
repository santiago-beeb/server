import { verifyToken } from "../helper/jwt.js";

const checkAdminRole = async (req, res) => {
  try {
    const user = req.user;

    if (user && user.rol === 1) {
      res.json({ isAdmin: true });
    } else {
      res.json({ isAdmin: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function requireAuth(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Token no válido" });
  }

  req.user = decoded;
  next();
}

export { checkAdminRole, requireAuth };
