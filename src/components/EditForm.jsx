import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const EditForm = ({ partido, onCancel, onSubmit }) => {
  const [form, setForm] = useState({
    equipo_1: "",
    equipo_2: "",
    resultado_equipo_1: "",
    resultado_equipo_2: "",
    fecha: "",
    estado: "",
    tipo_partido: "",
  });

  useEffect(() => {
    if (partido) {
      const formattedDate = partido.fecha
        ? new Date(partido.fecha).toISOString().slice(0, 16)
        : "";
      setForm({ ...partido, fecha: formattedDate });
    }
  }, [partido]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
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
      <select
        name="estado"
        value={form.estado}
        onChange={handleChange}
        required
      >
        <option value="Pendiente">Pendiente</option>
        <option value="Jugado">Jugado</option>
        <option value="Pospuesto">Pospuesto</option>
        <option value="Cancelado">Cancelado</option>
      </select>
      <select
        name="tipo_partido"
        value={form.tipo_partido}
        onChange={handleChange}
        required
      >
        <option value="Amistoso">Amistoso</option>
        <option value="Liga-IMD">Liga-IMD</option>
        <option value="Torneo">Torneo</option>
      </select>
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
};

EditForm.propTypes = {
  partido: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditForm;
