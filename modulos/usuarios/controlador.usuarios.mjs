import {
  modeloObtenerUsuario,
  modeloObtenerDatosCliente,
} from "./modelo.usuarios.mjs";
import jwt from "jsonwebtoken";

const FRASE_SECRETA = "capuchinos";

async function controladorLogin(req, res) {
  try {
    const { dni, clave } = req.body;
    // console.log("usuario enviado desde front: " + dni);
    // console.log("clave enviada desde front: " + clave);

    if (!dni || !clave) {
      return res
        .status(400)
        .json({ usuario: false, mensaje: "DNI y clave son requeridos" });
    }

    const datos = await modeloObtenerUsuario(dni, clave);
    const { idCliente } = datos[0];

    // console.log(
    //   "id del usuario encontrado en la base de datos que se encuentra logueado: " +
    //     idCliente
    // );

    if (idCliente) {
      //si existe procedo a conceder el acceso y guardar el token
      const payload = { id: idCliente };
      const token = jwt.sign(payload, FRASE_SECRETA, { expiresIn: "10m" });

      res.cookie("auth", token, {
        //genero la cookie
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      //prueba para el token (habilitar para testear con postman)
      //res.json(token);
      //redireccion para la pagina
      res.redirect("/acceso");
      //res.status(200).json({ idCliente: datos[0].idCliente, usuario: true });
    }

    // if (datos.length > 0) {
    //   //res.status(200).json({ idCliente: datos[0].idCliente, usuario: true });
    // } else {
    //   res.status(404).json({ dni: dni, clave: clave });
    //   //res.status(404).json({ usuario: false });
    //   //res.redirect("/");
    // }
  } catch (error) {
    res.status(500).json({ usuario: false, mensaje: "Error en el servidor" });
  }
}

async function controladorLogout(req, res) {
  res.cookie("auth", "", { maxAge: 0 });
  res.redirect("/");
}

async function controladorObtenerDatosCliente(req, res) {
  try {
    const { idCliente } = req.params;
    //console.log(idCliente);
    const datos = await modeloObtenerDatosCliente(idCliente);
    //console.log(datos);

    if (datos != null) {
      res.status(200).json({ datos });
    } else {
      res.status(404).json({
        mensaje: `No se encontraron datos del cliente con id ${idCliente}`,
      });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
}

export { controladorLogin, controladorLogout, controladorObtenerDatosCliente };
