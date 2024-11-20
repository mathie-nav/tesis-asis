let vehiculos = [];
let vehiculoSel;
let vehiculoCargad;
//variables globales de ticket de reserva
let precioSenia;
let horaReserva;
let fechaReserva;

function getLanding(nombre, apellido) {
  const url = `frmLanding.html?nombre=${encodeURIComponent(
    nombre
  )}&apellido=${encodeURIComponent(apellido)}`;
  window.location.href = url;
}

function getMenus(nombre, apellido) {
  const url = `frmMenus.html?nombre=${encodeURIComponent(
    nombre
  )}&apellido=${encodeURIComponent(apellido)}`;
  window.location.href = url;
}

function cargarFormularioLanding() {
  fetch("frmLanding.html")
    .then((response) => response.text())
    .then((html) => {
      document.body.innerHTML = html;

      // Al cargar el formulario, llama a obtenerDatosUsuario y coloca los datos en los campos
      const userDetails = obtenerDatosUsuario(data.idCliente);
      document.getElementById("nombre").value = userDetails.datos.Nombre;
      document.getElementById("apellido").value = userDetails.datos.Apellido;
    })
    .catch((err) => console.error("Error al cargar el formulario:", err));
}
//--------------------------------------------------------------------
//
//--------------------------------------------------------------------

async function obtenerDatosUsuario(idCliente) {
  try {
    const response = await fetch(`/api/v1/cliente/${idCliente}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok)
      throw new Error("Error al obtener los detalles del usuario");

    const userDetails = await response.json();
    return userDetails;
  } catch (error) {
    console.error("Error en obtener Datos del Usuario:", error);
    return null;
  }
}

async function bienvenidaUsuario() {
  try {
    const respuesta = await fetch("/api/v1/usuario");
    if (!respuesta.ok) {
      throw new Error("Error al obtener el usuario");
    }
    const usuario = await respuesta.json();

    //guardo el id del usuario en el session storage
    sessionStorage.setItem("idCliente", usuario);
    //ya con el id del usuario ahora puedo utilizar el otro endpoint que me requiere el id
    const datosUsuario = await fetch(`/api/v1/cliente/${usuario}`);
    if (!respuesta.ok) {
      throw new Error("Error al obtener los datos de usuario");
    }
    const { datos } = await datosUsuario.json();
    document.getElementById("welcome-message-name-display").textContent =
      "Hola " + datos[0].Apellido + " " + datos[0].Nombre;
  } catch (error) {
    alert("No se pudieron cargar los datos del usuario");
  }
}

async function cargarDatosUsuario() {
  try {
    const respuesta = await fetch("/api/v1/usuario");
    if (!respuesta.ok) {
      throw new Error("Error al obtener el usuario");
    }
    const usuario = await respuesta.json();

    //ya con el id del usuario ahora puedo utilizar el otro endpoint que me requiere el id
    const datosUsuario = await fetch(`/api/v1/cliente/${usuario}`);
    if (!respuesta.ok) {
      throw new Error("Error al obtener los datos de usuario");
    }

    const { datos } = await datosUsuario.json();

    document.getElementById("username-display").textContent = datos[0].Nombre;
    document.getElementById("lastname-display").textContent = datos[0].Apellido;
    document.getElementById("dni-display").textContent = datos[0].Dni;
  } catch (error) {
    alert("No se pudieron cargar los datos del usuario");
  }
}

function cargarLugares() {
  const lugaresParking = document.getElementById("lugares-parking");
  const cantidadColumnas = 5;
  const cantidadLugares = 10;

  let numLugar = 1;
  for (let indice = 0; indice <= cantidadLugares; indice++) {
    const divRow = document.createElement("div");
    divRow.className = "parking-row";
    //divRow.textContent = indice;
    lugaresParking.appendChild(divRow);
    for (let indice = 0; indice < cantidadColumnas; indice++) {
      const div1 = document.createElement("div");
      div1.addEventListener("click", () => {
        sessionStorage.setItem("lugarSel", div1.textContent);
        //muestra el lugar
        alert("Lugar seleccionado: " + div1.textContent);
      });
      const div2 = document.createElement("div");
      div1.className = "parking-space reserved";
      div1.textContent = numLugar;
      numLugar++;
      div2.className = "parking-space available";
      div2.textContent = numLugar;
      div2.addEventListener("click", () => {
        sessionStorage.setItem("lugarSel", div2.textContent);
        //muestra el lugar
        alert("Lugar seleccionado: " + div2.textContent);
      });
      divRow.appendChild(div1);
      divRow.appendChild(div2);
      numLugar++;
    }
  }
}

function detalleVehiculoSel(vehiculo) {
  //cambiar por contenido dinamico
  if (vehiculo) {
    document.getElementById("infovehSel").textContent = vehiculo.Marca;
    document.getElementById("infovehMod").textContent = vehiculo.Modelo;
    document.getElementById("infovehPat").textContent = vehiculo.Patente;
    document.getElementById("infovehColor").textContent = vehiculo.Color;
    document.getElementById("infovehDesc").textContent = vehiculo.Descripcion;
  }
}

function detalleTicket() {
  let lugarSeleccionado = sessionStorage.getItem("lugarSel");
  let datosReserva = {
    Fecha: sessionStorage.getItem("FechaReserva"),
    Hora: sessionStorage.getItem("HoraReserva"),
    // "Precio" : sessionStorage.getItem("PrecioReserva")
  };

  //cambiar por contenido dinamico
  document.getElementById("fechareserva").textContent = datosReserva.Fecha;
  document.getElementById("horasreserva").textContent = datosReserva.Hora;
  document.getElementById("lugarreserva").textContent = lugarSeleccionado;
  // document.getElementById("preciototal").textContent = `$${Number.parseInt(
  //   Math.random() * 5000
  // )}`;

  let detallesVehiculo = cargarDatosVehiculoSel();
  //console.log(detallesVehiculo)

  document.getElementById("vehiculoTicket").textContent =
    detallesVehiculo.Marca + " " + detallesVehiculo.Modelo;
}

function cargarDatosVehiculoSel() {
  let vehiculo = {
    idVehiculo: sessionStorage.getItem("idVehiculo"),
    Marca: sessionStorage.getItem("Marca"),
    Patente: sessionStorage.getItem("Patente"),
    Color: sessionStorage.getItem("Color"),
    Modelo: sessionStorage.getItem("Modelo"),
    Descripcion: sessionStorage.getItem("Descripcion"),
  };

  return vehiculo;
}

function guardarDatosVehiculo(vehiculo) {
  sessionStorage.setItem("idVehiculo", vehiculo.idVehiculo);
  sessionStorage.setItem("Marca", vehiculo.Marca);
  sessionStorage.setItem("Patente", vehiculo.Patente);
  sessionStorage.setItem("Color", vehiculo.Color);
  sessionStorage.setItem("Modelo", vehiculo.Modelo);
  sessionStorage.setItem("Descripcion", vehiculo.Descripcion);
}

async function cargarCombos() {
  const vehiculosCliente = document.getElementById("carSelect");

  vehiculosCliente.addEventListener("change", (evento) => {
    //guardar vehiculo seleccionado

    vehiculoSel = vehiculos[vehiculosCliente.value];
    guardarDatosVehiculo(vehiculoSel);
  });

  const motosCliente = document.getElementById("motorcycleSelect");

  motosCliente.addEventListener("change", (evento) => {
    vehiculoSel = vehiculos[vehiculosCliente.value];
    guardarDatosVehiculo(vehiculoSel);
  });

  try {
    const respuesta = await fetch("/api/v1/usuario");
    if (!respuesta.ok) {
      throw new Error("Error al obtener el usuario");
    }
    const usuario = await respuesta.json();

    //ya con el id del usuario ahora puedo utilizar el otro endpoint que me requiere el id
    const datosUsuario = await fetch(`/api/v1/cliente/${usuario}`);
    if (!respuesta.ok) {
      throw new Error("Error al obtener los datos de usuario");
    }
    //datos que vienen del cliente con los vehiculos a su cargo
    const { datos } = await datosUsuario.json();

    let indice = 0;
    //console.log(datos)
    datos.forEach((elemento) => {
      vehiculos.push(elemento);
      const txtobj =
        elemento.Marca + " " + elemento.Modelo + " " + elemento.Patente;
      const opt = document.createElement("option");
      opt.value = indice;
      opt.textContent = txtobj;

      //---------------------------------
      switch (elemento.idTipoVehiculo) {
        case 1:
          //si es vehiculo agrega al primer combo
          vehiculosCliente.appendChild(opt);
          break;
        case 2:
          //si es camioneta agrega al primer combo
          vehiculosCliente.appendChild(opt);
          break;
        case 3:
          //si es moto agrega al segundo combo
          motosCliente.appendChild(opt);
          break;
        default:
          break;
      }
      indice++;
    });
  } catch (error) {
    throw error;
  }
}

async function pruebaApi() {
  const bodyReserva = {
    FechaHora: sessionStorage.getItem("FechaReserva"),
    HorasReservadas: sessionStorage.getItem("HoraReserva"),
    idCliente: sessionStorage.getItem("idCliente"),
    idVehiculo: sessionStorage.getItem("idVehiculo"),
    DuracionReserva: "1",
    idTipoReserva: "1",
    Estado: true,
    idLugarReservado: sessionStorage.getItem("lugarSel"),
  };
  console.log(bodyReserva);

  const response = await fetch(`/api/v1/reservas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyReserva),
  });

  console.log(response);
  // if (response.ok) {
  //   const result = await response.json();
  //   alert("Reserva registrada exitosamente.");
  // }else{
  //   alert("Reserva no registrada exitosamente.");
  // }
}

function generarReserva() {
  let fechaReserva = document.getElementById("fechaSel");
  let horaReserva = document.getElementById("horasSel");

  fechaReserva.addEventListener("change", () => {
    sessionStorage.setItem("FechaReserva", fechaReserva.value);
  });
  horaReserva.addEventListener("change", () => {
    sessionStorage.setItem("HoraReserva", horaReserva.value);
  });
}

//carga la funcion de acuerdo a la pagina que se este en visualizacion
window.onload = () => {
  const idPagina = document.body.id;

  switch (idPagina) {
    case "p-inicio":
      bienvenidaUsuario();
      break;
    case "p-menus":
      break;
    case "p-reserm1":
      cargarDatosUsuario();
      break;

    case "p-reserm2":
      cargarCombos();
      break;

    case "p-reserm41":
      generarReserva();
      break;

    case "p-reserm4":
      vehiculoCargad = cargarDatosVehiculoSel();
      detalleVehiculoSel(vehiculoCargad);
      break;

    case "p-reserm5":
      cargarLugares();
      break;

    case "p-reserm6":
      const btnReservar2 = document.getElementById("reservar2");

      // console.log(btnReservar2);

      btnReservar2.addEventListener("click", () => {
        pruebaApi();
      });

      //const btnReserva = document.getElementById("btnReservar");

      // btnReserva.addEventListener("click", () => {
      //   console.log("ingresa al event listener");

      //   const bodyReserva = {
      //     FechaHora: sessionStorage.getItem("FechaReserva"),
      //     HorasReservadas: sessionStorage.getItem("HoraReserva"),
      //     idCliente: sessionStorage.getItem("idCliente"),
      //     idVehiculo: sessionStorage.getItem("idVehiculo"),
      //     DuracionReserva: "1",
      //     idTipoReserva: "1",
      //     Estado: true,
      //     idLugarReservado: sessionStorage.getItem("lugarSel"),
      //   };

      //   console.log(bodyReserva);
      //------------------------------------------------------------------

      // const response = fetch(`/api/v1/reservas`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(bodyReserva),
      // }).then((dato)=>{
      //   //caso de exito
      //   console.log(dato)
      //   console.log(response)
      // },(error)=>{
      //   //caso de error
      //   console.log(error)
      // }
      // );

      // if (response.ok) {
      //   const result = await response.json();

      //   alert("Reserva registrada exitosamente.");
      // } else {
      //   alert("Ocurrió un error al registrar la reserva.");
      // }
      // alert("No se pudo registrar la reserva. Intente nuevamente.");
      // });

      detalleTicket();
      break;

    default:
      console.log("No se ha encontrado la pagina");
      break;
  }
};

//-----------------------------------------------------------------------------------
// Codigo a revisar
//-----------------------------------------------------------------------------------
//boton del login
// const btniniciarSesion = document.getElementById("start-session");
// btniniciarSesion.addEventListener("click", () => {
//   validarUsuario();
// });
// const btnCalendar = document.getElementById("start-session");
// btnCalendar.addEventListener("click", () => {
//   validarUsuario();
// });

//Valida si usuario = True y mantiene datos segun ID.
// async function validarUsuario() {
//   const dniIngresado = document.getElementById("dni").value;
//   const claveIngresada = document.getElementById("clave").value;

//   if (!dniIngresado || !claveIngresada) return;

//   const requestBody = { dni: dniIngresado, clave: claveIngresada };
//   try {
//     const res = await fetch("/api/v1/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(requestBody),
//     });

//     if (!res.ok) throw new Error("Error en la solicitud");
//     const data = await res.json();

//     if (data.usuario === true) {
//       const userDetails = await obtenerDatosUsuario(data.idCliente);
//       redirigirConDatos(userDetails.datos.Nombre, userDetails.datos.Apellido);
//     }
//   } catch (error) {
//     console.error("Error al validar el usuario:", error);
//     document.getElementById("mensaje").textContent =
//       "Error al validar el usuario.";
//   }
// }

// const comboBox = document.getElementById("miComboBox");

// function obtenerSeleccion() {
//     const valorSeleccionado = comboBox.value; // Obtiene el valor de la opción seleccionada
//     console.log("Valor seleccionado:", valorSeleccionado);
//     // Guardar en una variable
//     let miVariable = valorSeleccionado;
//     console.log("Guardado en variable:", miVariable);
// }
