import { useState } from "react";
import PropTypes from "prop-types";

const EditablePartido = ({ partido, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPartido, setEditedPartido] = useState({ ...partido });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPartido({ ...editedPartido, [name]: value });
  };

  const handleSave = () => {
    onUpdate(editedPartido);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPartido({ ...partido });
    setIsEditing(false);
  };

  return (
    <li className="formulario_li">
      {isEditing ? (
        <>
          <p>
            <strong>Local:</strong>{" "}
            <input
              type="text"
              name="equipo_1"
              value={editedPartido.equipo_1}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <strong>Visitante:</strong>{" "}
            <input
              type="text"
              name="equipo_2"
              value={editedPartido.equipo_2}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <strong>Resultado Local:</strong>{" "}
            <input
              type="number"
              name="resultado_equipo_1"
              value={editedPartido.resultado_equipo_1 || ""}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Resultado Visitante:</strong>{" "}
            <input
              type="number"
              name="resultado_equipo_2"
              value={editedPartido.resultado_equipo_2 || ""}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Fecha:</strong>{" "}
            <input
              type="datetime-local"
              name="fecha"
              value={editedPartido.fecha.slice(0, 16)}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <strong>Ubicación:</strong>
            <input
              type="text"
              name="ubicacion"
              value={editedPartido.ubicacion}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <strong>Estado:</strong>{" "}
            <select
              name="estado"
              value={editedPartido.estado}
              onChange={handleChange}
              required
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Jugado">Jugado</option>
              <option value="Pospuesto">Pospuesto</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </p>
          <p>
            <strong>Tipo de Partido:</strong>{" "}
            <select
              name="tipo_partido"
              value={editedPartido.tipo_partido}
              onChange={handleChange}
              required
            >
              <option value="Amistoso">Amistoso</option>
              <option value="Liga-IMD">Liga-IMD</option>
              <option value="Torneo">Torneo</option>
            </select>
          </p>
          <div className="contenedor-button">
            <button onClick={handleSave}>Guardar</button>
            <button onClick={handleCancel}>Cancelar</button>
          </div>
        </>
      ) : (
        <>
          <p>
            <strong>Equipos:</strong> {partido.equipo_1} vs {partido.equipo_2}
          </p>
          <p>
            <strong>Resultado:</strong>{" "}
            {partido.resultado_equipo_1 !== null &&
            partido.resultado_equipo_1 !== undefined
              ? partido.resultado_equipo_1
              : "-"}{" "}
            -{" "}
            {partido.resultado_equipo_2 !== null &&
            partido.resultado_equipo_2 !== undefined
              ? partido.resultado_equipo_2
              : "-"}
          </p>
          <p>
            <strong>Fecha:</strong>{" "}
            {partido.fecha.replace("T", " ").slice(0, 16)}
          </p>
          <p className="p-enlace">
            <strong>Ubicación:</strong> {partido.ubicacion}{" "}
            <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(partido.ubicacion)}`}
            target="_blank"
            rel="noopener noreferrer"
            >
              Ver en Google Maps
            </a>
          </p>
          <p>
            <strong>Estado:</strong> {partido.estado}
          </p>
          <p>
            <strong>Tipo de Partido:</strong> {partido.tipo_partido}
          </p>
          <div className="contenedor-button">
            <button onClick={() => setIsEditing(true)}>Editar</button>
            <button onClick={() => onDelete(partido.id)}>Eliminar</button>
          </div>
        </>
      )}
    </li>
  );
};

EditablePartido.propTypes = {
  partido: PropTypes.shape({
    id: PropTypes.number.isRequired,
    equipo_1: PropTypes.string.isRequired,
    equipo_2: PropTypes.string.isRequired,
    resultado_equipo_1: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    resultado_equipo_2: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    fecha: PropTypes.string.isRequired,
    estado: PropTypes.string.isRequired,
    tipo_partido: PropTypes.string.isRequired,
    ubicacion: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EditablePartido;
