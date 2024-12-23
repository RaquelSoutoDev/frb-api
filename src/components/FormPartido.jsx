import { useState } from "react";
import { crearPartido } from "../api/api";
import PropTypes from "prop-types";

const FormPartido = ({ setPartidos }) => {
  const initialState = {
    equipo_1: "",
    equipo_2: "",
    resultado_equipo_1: "",
    resultado_equipo_2: "",
    fecha: "",
    estado: "Pendiente",
    tipo_partido: "Amistoso",
  };

  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nuevoPartido = await crearPartido(form);
      setPartidos((prev) => [...prev, nuevoPartido]);
      setForm(initialState); 
      alert("Partido creado con éxito");
    } catch (err) {
      console.error("Error del backend:", err.response?.data || err.message);
      alert("Error al crear el partido");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="Formulario">
      <input
        type="text"
        name="equipo_1"
        placeholder="Equipo Local"
        value={form.equipo_1}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="equipo_2"
        placeholder="Equipo Visitante"
        value={form.equipo_2}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="resultado_equipo_1"
        placeholder="Resultado Local"
        value={form.resultado_equipo_1}
        onChange={handleChange}
      />
      <input
        type="number"
        name="resultado_equipo_2"
        placeholder="Resultado Visitante"
        value={form.resultado_equipo_2}
        onChange={handleChange}
      />
      <input
        type="datetime-local"
        name="fecha"
        value={form.fecha}
        onChange={handleChange}
        required
      />
      <select name="estado" value={form.estado} onChange={handleChange}>
        <option value="Pendiente">Pendiente</option>
        <option value="Jugado">Jugado</option>
        <option value="Pospuesto">Pospuesto</option>
        <option value="Cancelado">Cancelado</option>
      </select>
      <select
        name="tipo_partido"
        value={form.tipo_partido}
        onChange={handleChange}
      >
        <option value="Amistoso">Amistoso</option>
        <option value="Liga-IMD">Liga-IMD</option>
        <option value="Torneo">Torneo</option>
      </select>
      <button type="submit">Crear Partido</button>
    </form>
  );
};

FormPartido.propTypes = {
  setPartidos: PropTypes.func.isRequired,
};

export default FormPartido;
