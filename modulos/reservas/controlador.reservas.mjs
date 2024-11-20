import {
  modeloObtenerReservas,
  modeloObtenerReserva,
  modeloRegistrarReserva,
  modeloModificarReserva,
  modeloCancelarReserva,
} from "./modelo.reservas.mjs";

async function controladorObtenerReservas(req, res) {
  try {
    console.log(req._usuarioLogin)
    const datos = await modeloObtenerReservas();
    res.status(200).json(datos);
  } catch (error) {    
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
}

async function controladorObtenerReserva(req, res) {
  try {
    const { id } = req.params;
    const datos = await modeloObtenerReserva(id);
    
    if (datos.length > 0) {
      res.status(200).json(datos);
    } else {
      res.status(404).json({  mensaje: "Reserva no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
}

async function controladorModificarReserva(req, res) {
  try {
    const { id } = req.params;
    const reserva = {
      ...req.body, // convierte el json en un objeto
    };
    const datos = await modeloModificarReserva(reserva, id);
    if (datos > 0) {
      res.status(200).json({  mensaje: "Registro modificado exitosamente" });
    } else {
      res.status(400).json({  mensaje: "No se ha modificado ningún registro" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: error });
  }
}

async function controladorCancelarReserva(req, res) {
  try {
    const { id } = req.params;

    const datos = await modeloCancelarReserva(id);
    if (datos > 0) {
      res.status(200).json({  mensaje: "Registro eliminado exitosamente" });
    } else {
      res.status(400).json({  mensaje: "No se ha eliminado ningún registro" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: error });
  }
}

async function controladorRegistrarReserva(req, res) {
  try {
    const reserva = {
      ...req.body, // convierte el json en un objeto
    };
    const datos = await modeloRegistrarReserva(reserva);
    res.status(200).json(datos);
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: "Error en el servidor" });
    
  }
}

export {
  controladorObtenerReservas,
  controladorObtenerReserva,
  controladorRegistrarReserva,
  controladorModificarReserva,
  controladorCancelarReserva,
};
