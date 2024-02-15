import { login } from "./userService";
import Usuario from "../models/usuario.js";

jest.mock("../models/usuario.js");

describe("login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deberia arrojar un error si falta el correo electronico o la contraseña", async () => {
    const loginData = {
      usr_email: "",
      usr_contrasenia: "password",
    };

    await expect(login(loginData)).rejects.toMatchObject({
      status: 400,
      message: "El correo y la contraseña son requeridos",
    });
  });
});
