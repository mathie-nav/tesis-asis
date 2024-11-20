import express from "express";
import jwt from "jsonwebtoken";
import helmet from "helmet";

import {
  controladorObtenerReserva,
  controladorObtenerReservas,
  controladorRegistrarReserva,
  controladorModificarReserva,
  controladorCancelarReserva,
} from "./reservas/controlador.reservas.mjs";

import {
  controladorLogin,
  controladorLogout,
  controladorObtenerDatosCliente,
} from "./usuarios/controlador.usuarios.mjs";

const rutasCRUD = express.Router();

rutasCRUD.use("/api/v1", express.json());

const verificarAcceso = (req, res, next) => {
  // Obtenemos desde la cabecera "cookie" el ID
  try {
    const { auth } = req.cookies;
    const datos = jwt.verify(auth, FRASE_SECRETA);
    //crea una nueva propiedad y la pasa desde el middleware a el endpoint por medio del request
    req._usuarioLogin = datos;
    next();
  } catch (error) {
    res.redirect("/");
  }
};

rutasCRUD.use("/acceso", helmet(), verificarAcceso, express.static("front"));

//endpoint de prueba para TESTEAR
rutasCRUD.get("/api/v1/usuario", verificarAcceso, (req, res) => {
  try {
    //envia como respuesta el usuario logueado
    const { id } = req._usuarioLogin;
    res.status(200).json(id);
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

//api reservas
rutasCRUD.get("/api/v1/reservas", verificarAcceso, controladorObtenerReservas); // listo

rutasCRUD.get(
  "/api/v1/reservas/:id",
  verificarAcceso,
  controladorObtenerReserva
); // listo
rutasCRUD.post(
  "/api/v1/reservas",
  verificarAcceso,
  controladorRegistrarReserva
); // listo
rutasCRUD.put(
  "/api/v1/reservas/:id",
  verificarAcceso,
  controladorModificarReserva
); // listo
rutasCRUD.delete(
  "/api/v1/reservas/:id",
  verificarAcceso,
  controladorCancelarReserva
); // listo

//api cliente
rutasCRUD.get(
  "/api/v1/cliente/:idCliente",
  verificarAcceso,
  controladorObtenerDatosCliente
);

// const USUARIOAPP = "34908046";
// const PASSAPP = "nav123";

// const baseDatos = {
//   dni: USUARIOAPP,
//   pass: PASSAPP,
//   idSesion: null,
// };

const FRASE_SECRETA = "capuchinos";

// Rutas autenticacion
rutasCRUD.post("/autenticacion", controladorLogin);
//logout y eliminacion de token
rutasCRUD.get("/logout", controladorLogout);

export default rutasCRUD;