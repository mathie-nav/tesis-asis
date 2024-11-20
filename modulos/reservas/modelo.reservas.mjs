import pool from "../../conexiones/conexion.mjs";

async function modeloObtenerReservas() {
  try {
    //const resultado = await pool.query(`SELECT * FROM public."Reservas"`);
    const resultado = await pool.query(`SELECT * FROM public."Reservas"`);
    resultado.rows.forEach(
      function(fila){
        fila.FechaHora = parsearFechaCompleta(fila.FechaHora)
      }
    );
    //console.log(resultado);
    return resultado.rows;
  } catch (error) {
    throw error;
  }
}

async function modeloObtenerReserva(id) {
  try {
    const resultado = await pool.query(
      `SELECT * FROM public."Reservas" WHERE "idReservas"=$1`,
      [id]
    );
    //console.log(resultado);
    return resultado.rows;
  } catch (error) {
    throw error;
  }
}

async function modeloRegistrarReserva(reserva) {
  try {
    const {
      FechaHora,
      HorasReservadas,
      idCliente,
      idVehiculo,
      DuracionReserva,
      idTipoReserva,
      Estado,
      idLugarReservado
    } = reserva;
    const resultado = await pool.query(
      `INSERT INTO public."Reservas"(
      "FechaHora", "HorasReservadas", "idCliente", "idVehiculo", "DuracionReserva", "idTipoReserva", "Estado", "idLugarReservado")
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING "idReservas";`,
      [
        FechaHora,
        HorasReservadas,
        idCliente,
        idVehiculo,
        DuracionReserva,
        idTipoReserva,
        Estado,
        idLugarReservado,
      ]
    );
    return resultado.rows;
  } catch (error) {
    throw error;
  }
}

async function modeloModificarReserva(reserva, idReserva) {
  try {
    const {
      FechaHora,
      HorasReservadas,
      idCliente,
      idVehiculo,
      DuracionReserva,
      idTipoReserva,
      Estado,
      idLugarReservado
    } = reserva;

    console.log(parseInt(idReserva));
    console.log(reserva);

    const resultado = await pool.query(
      `UPDATE "Reservas" 
      SET "FechaHora" = $1, "HorasReservadas" = $2, "idCliente" = $3, "idVehiculo" = $4, 
          "DuracionReserva" = $5, "idTipoReserva" = $6, "Estado" = $7, "idLugarReservado" = $8 
      WHERE "idReservas" = $9`,
      [
        FechaHora,         // $1
        HorasReservadas,   // $2
        idCliente,         // $3
        idVehiculo,        // $4
        DuracionReserva,   // $5
        idTipoReserva,     // $6
        Estado,            // $7
        idLugarReservado,  // $8
        parseInt(idReserva) // $9
      ]
    );

    console.log(resultado);

    return resultado.rowCount;
  } catch (error) {
    throw error;
  }
}


async function modeloCancelarReserva(id) {
  try {
    const resultado = await pool.query(
      `DELETE FROM "Reservas" WHERE "idReservas"=$1`,
      [id]
    );

    //console.log(resultado);

    return resultado.rowCount;
  } catch (error) {
    throw error;
  }
}

function parsearFechaCompleta(fechaString) {
  // Convierte la cadena en un objeto Date
  const fecha = new Date(fechaString);

  // Obtiene el año, mes, día, horas, minutos y segundos
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes empieza en 0, así que sumamos 1
  const dia = String(fecha.getDate()).padStart(2, '0');
  const horas = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');
  const segundos = String(fecha.getSeconds()).padStart(2, '0');

  // Retorna la fecha completa en formato YYYY-MM-DD HH:MM:SS
  return `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
}


export {
  modeloObtenerReservas,
  modeloObtenerReserva,
  modeloRegistrarReserva,
  modeloModificarReserva,
  modeloCancelarReserva,
};
