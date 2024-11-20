import pool from "../../conexiones/conexion.mjs";

async function modeloObtenerUsuario(dni, clave) {
  try {
    const resultado = await pool.query(
      `SELECT "idCliente" FROM "Cliente" c WHERE c."Dni" = '${dni}' AND c."Password" = '${clave}' AND c."Activo" = 'true'`
    );
    return resultado.rows;
  } catch (error) {
    throw error;
  }
}

async function modeloObtenerDatosCliente(idCliente) {
  try {
    //query anterior corregida
    // `SELECT c."Apellido", c."Nombre", c."Dni", c."Email", v."Patente", v."Color", v."Marca", v."Modelo", v."Descripcion"
    //   FROM "Cliente" c
    //   INNER JOIN "Vehiculo" v ON c."IdVehiculo" = v."idVehiculo"
    //   WHERE c."idCliente" = $1`

    const querystr = `SELECT v."idVehiculo", c."Apellido", c."Nombre", c."Dni", c."Email", v."Patente", v."idTipoVehiculo", v."Color", v."Marca", v."Modelo", v."Descripcion"   
      FROM "Cliente" c
      INNER JOIN "Vehiculo" v ON c."idCliente" = v."idCliente"
      WHERE c."idCliente" = $1`;

    const resultado = await pool.query(querystr, [idCliente]);

    return resultado.rows;
  } catch (error) {
    throw error;
  }
}

export { modeloObtenerUsuario, modeloObtenerDatosCliente };
