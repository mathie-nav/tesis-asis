import express from "express";
import rutasCRUD from "./modulos/rutasCRUD.mjs";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();
const PUERTO = 3000;

//uso de middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//midlewares seguridad
app.use(helmet(), express.static("login"));
//app.use("/acceso", helmet(), express.static("front"));

//carga de rutas crud
app.use(rutasCRUD);

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
