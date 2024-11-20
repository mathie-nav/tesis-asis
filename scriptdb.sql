--Solo con postgress local
CREATE DATABASE dbeparking;

-- Solo con Docker
-- Conectar a la base de datos
\c dbeparking

CREATE TABLE IF NOT EXISTS public."Cliente"
(
    "idCliente" serial NOT NULL,
    "Apellido" character varying(50) COLLATE pg_catalog."default",
    "Nombre" character varying(50) COLLATE pg_catalog."default",
    "Dni" character varying(10) COLLATE pg_catalog."default",
    "Password" text COLLATE pg_catalog."default",
    "Email" character varying(200) COLLATE pg_catalog."default",
    "idTipoCliente" integer,
    "IdVehiculo" integer,
    "Activo" boolean,
    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("idCliente"),
    CONSTRAINT "DNI_UK" UNIQUE ("Dni")
);

CREATE TABLE IF NOT EXISTS public."Lugar"
(
    "idLugar" serial NOT NULL,
    "Nivel" integer,
    "Capacidad" integer,
    "idTipoVehiculo" integer,
    CONSTRAINT "Lugar_pkey" PRIMARY KEY ("idLugar")
);

CREATE TABLE IF NOT EXISTS public."Reservas"
(
    "idReservas" serial NOT NULL,
    "FechaHora" date,
    "HorasReservadas" time,
    "idCliente" integer,
    "DuracionReserva" integer,
    "idTipoReserva" integer,
    "Estado" boolean,
    "idVehiculo" integer,
    "idLugarReservado" integer,
    CONSTRAINT "Reservas_pkey" PRIMARY KEY ("idReservas")
);

CREATE TABLE IF NOT EXISTS public."TipoCliente"
(
    "idTipoCliente" serial NOT NULL,
    "Descripcion" character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT "TipoCliente_pkey" PRIMARY KEY ("idTipoCliente")
);

CREATE TABLE IF NOT EXISTS public."TipoReserva"
(
    "idTipoReserva" serial NOT NULL,
    "Descripcion" character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT "TipoReserva_pkey" PRIMARY KEY ("idTipoReserva")
);

CREATE TABLE IF NOT EXISTS public."TipoVehiculo"
(
    "idTipoVehiculo" serial NOT NULL,
    "Descripcion" character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT "TipoVehiculo_pkey" PRIMARY KEY ("idTipoVehiculo")
);

CREATE TABLE IF NOT EXISTS public."Vehiculo"
(
    "idVehiculo" serial NOT NULL,
    "Patente" character varying(30) COLLATE pg_catalog."default",
    "Color" character varying(30) COLLATE pg_catalog."default",
    "idCliente" integer,
    "Marca" character varying(30) COLLATE pg_catalog."default",
    "Modelo" character varying(50) COLLATE pg_catalog."default",
    "Foto" text COLLATE pg_catalog."default",
    "Descripcion" character varying(50) COLLATE pg_catalog."default",
    "idTipoVehiculo" integer,
    CONSTRAINT "Vehiculo_pkey" PRIMARY KEY ("idVehiculo")
);

--ALTER TABLE IF EXISTS public."Cliente"
--    ADD CONSTRAINT "Cliente_IdVehiculo_fkey" FOREIGN KEY ("IdVehiculo")
--    REFERENCES public."Vehiculo" ("idVehiculo") MATCH SIMPLE
--    ON UPDATE NO ACTION
--    ON DELETE CASCADE
--    NOT VALID;


ALTER TABLE IF EXISTS public."Cliente"
    ADD CONSTRAINT "Cliente_idTipoCliente_fkey" FOREIGN KEY ("idTipoCliente")
    REFERENCES public."TipoCliente" ("idTipoCliente") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public."Lugar"
    ADD CONSTRAINT "Lugar_idTipoVehiculo_fkey" FOREIGN KEY ("idTipoVehiculo")
    REFERENCES public."TipoVehiculo" ("idTipoVehiculo") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public."Reservas"
    ADD CONSTRAINT "Reservas_idCliente_fkey" FOREIGN KEY ("idCliente")
    REFERENCES public."Cliente" ("idCliente") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public."Reservas"
    ADD CONSTRAINT "Reservas_idLugarReservado_fkey" FOREIGN KEY ("idLugarReservado")
    REFERENCES public."Lugar" ("idLugar") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public."Reservas"
    ADD CONSTRAINT "Reservas_idTipoReserva_fkey" FOREIGN KEY ("idTipoReserva")
    REFERENCES public."TipoReserva" ("idTipoReserva") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public."Reservas"
    ADD CONSTRAINT "Reservas_idVehiculo_fkey" FOREIGN KEY ("idVehiculo")
    REFERENCES public."Vehiculo" ("idVehiculo") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public."Vehiculo"
    ADD CONSTRAINT "Vehiculo_idCliente_fkey" FOREIGN KEY ("idCliente")
    REFERENCES public."Cliente" ("idCliente") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Vehiculo"
    ADD CONSTRAINT "Vehiculo_idTipoVehiculo_fkey" FOREIGN KEY ("idTipoVehiculo")
    REFERENCES public."TipoVehiculo" ("idTipoVehiculo") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;

-- Insercion de datos temporales
--------------------------------
--Tipos de vehiculos

INSERT INTO public."TipoVehiculo"("Descripcion")
	VALUES ('Vehiculo');
INSERT INTO public."TipoVehiculo"("Descripcion")
	VALUES ('Camioneta');
INSERT INTO public."TipoVehiculo"("Descripcion")
	VALUES ('Motocicleta');

--Tipos de cliente

INSERT INTO public."TipoCliente"("Descripcion")
	VALUES ('Abonado');

INSERT INTO public."TipoCliente"("Descripcion")
	VALUES ('Huesped');

--Tipos de reserva

INSERT INTO public."TipoReserva"("Descripcion")
	VALUES ('Por dia');
INSERT INTO public."TipoReserva"("Descripcion")
	VALUES ('Por hora');

--Niveles

--Nivel 0 o PB para vehiculos
INSERT INTO public."Lugar"("Nivel", "Capacidad", "idTipoVehiculo")
	VALUES (0, 20, 1);

--Nivel 1 o para motocicletas
INSERT INTO public."Lugar"("Nivel", "Capacidad", "idTipoVehiculo")
	VALUES (1, 10, 3);

--Clientes

INSERT INTO public."Cliente"("Apellido", "Nombre", "Dni", "Password", "Email", "idTipoCliente", "IdVehiculo", "Activo")
	VALUES ('Navarro', 'Mathias', '34908046', 'nav123', 'math-nav@mail.com', 1, 1, true);

INSERT INTO public."Cliente"("Apellido", "Nombre", "Dni", "Password", "Email", "idTipoCliente", "IdVehiculo", "Activo")
	VALUES ('Herrera', 'Augusto', '40200300', 'aug123', 'aug-h@mail.com', 1, 2, true);

INSERT INTO public."Cliente"("Apellido", "Nombre", "Dni", "Password", "Email", "idTipoCliente", "IdVehiculo", "Activo")
	VALUES ('Vanni', 'Agustin', '40150200', 'agu123', 'agusvanni@mail.com', 2, 3, true);

--Vehiculos

INSERT INTO public."Vehiculo"("Patente", "Color", "idCliente", "Marca", "Modelo", "Foto", "Descripcion", "idTipoVehiculo")
	VALUES ('AA300ZL' , 'Rojo', 1, 'Ford', 'Fiesta', 'imagen.jpeg', 'Paragolpe chocado', '1');

INSERT INTO public."Vehiculo"("Patente", "Color", "idCliente", "Marca", "Modelo", "Foto", "Descripcion", "idTipoVehiculo")
	VALUES ('AB347CL' , 'Negro', 2, 'Chevrolet', 'Trucker', 'imagen.jpeg', '', '2');

INSERT INTO public."Vehiculo"("Patente", "Color", "idCliente", "Marca", "Modelo", "Foto", "Descripcion", "idTipoVehiculo")
	VALUES ('CA100XZ' , 'Plata', 3, 'Honda', 'Biz', 'imagen.jpeg', '', '1');

--Reservas

INSERT INTO public."Reservas"("FechaHora", "HorasReservadas", "idCliente", "DuracionReserva", "idTipoReserva", "Estado", "idVehiculo", "idLugarReservado")
	VALUES ('2024-11-15', '12:00:00', 1, 2, 2, true, 1, 1);

INSERT INTO public."Reservas"("FechaHora", "HorasReservadas", "idCliente", "DuracionReserva", "idTipoReserva", "Estado", "idVehiculo", "idLugarReservado")
	VALUES ('2024-11-16', '15:00:00', 2, 3, 1, true, 2, 1);
