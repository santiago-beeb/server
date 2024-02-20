import { login } from "./userService";
import Usuario from "../models/usuario.js";

describe("login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deberia arrojar un error si falta el correo electronico o la contraseña", async () => {
    const loginData = {
      usr_email: "",
      usr_contrasenia: "",
    };

    await expect(login(loginData)).rejects.toMatchObject({
      status: 400,
      message: "El correo y la contraseña son requeridos",
    });
  });

  test("deberia arrojar un error si las credenciales son incorrectas", async () => {
    const loginData = {
      usr_email: "alzate0603@gmail.com",
      usr_contrasenia: "dsfdsfds",
    };

    await expect(login(loginData)).rejects.toMatchObject({
      status: 401,
      message: "Credenciales incorrectas",
    });
  });

  test("deberia arrojar un error si el usuario no está activo", async () => {
    const loginData = {
      usr_email: "jurkefikna@gufum.com",
      usr_contrasenia: "U2FsdGVkX18m5SDN5k+QCxwRTdQPwobyb33Y/KHl9JU=",
    };

    await expect(login(loginData)).rejects.toMatchObject({
      status: 403,
      message: "Usuario no activo",
    });
  });
});
