import * as userService from "../services/userService.js";

const addUser = async (req, res) => {
  try {
    const result = await userService.addUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error.status) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const activateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await userService.activateUser(userId);
    res.status(200).json(result);
  } catch (error) {
    if (error.status) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const login = async (req, res) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    if (error.status) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const getDocumentTypes = async (req, res) => {
  try {
    const result = await userService.getDocumentTypes();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const methods = {
  addUser,
  login,
  getDocumentTypes,
  activateUser,
};
