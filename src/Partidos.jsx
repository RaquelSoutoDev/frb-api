import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./style.css";

function Partidos() {
  return (
    <div className="contenedor-partidos">
      <p>Partidos</p>
      <form action="" className="Formulario">
        <button>Actualizar partido</button>
        <button>Subir Partido</button>
      </form>
    </div>
  );
}

export default Partidos;
