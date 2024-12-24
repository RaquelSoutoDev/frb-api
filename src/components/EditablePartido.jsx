import { useState } from "react";
import PropTypes from "prop-types";

const EditablePartido = ({ partido, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPartido, setEditedPartido] = useState(partido);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPartido({ ...editedPartido, [name]: value });
  };

  const handleSave = () => {
    onUpdate(editedPartido);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPartido(partido); 
    setIsEditing(false);
  };

  return (
    <li className="formulario_li">
      <div className="partido-info">
        <p>
          <strong>Equipos:</strong>{" "}
          {isEditing ? (
            <>
              <input
                type="text"
                name="equipo_1"
                value={editedPartido.equipo_1}
                onChange={handleChange}
                required
              />
              {" vs "}
              <input
                type="text"
                name="equipo_2"
                value={editedPartido.equipo_2}
                onChange={handleChange}
                required
              />
            </>
          ) : (
            `${partido.equipo_1} vs ${partido.equipo_2}`
          )}
        </p>
        <p>
          <strong>Estado:</strong>{" "}
          {isEditing ? (
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
          ) : (
            partido.estado
          )}
        </p>
        <p>
          <strong>Fecha:</strong>{" "}
          {isEditing ? (
            <input
              type="datetime-local"
              name="fecha"
              value={editedPartido.fecha}
              onChange={handleChange}
              required
            />
          ) : (
            new Date(partido.fecha).toLocaleString("es-ES")
          )}
        </p>
        <p>
          <strong>Tipo:</strong>{" "}
          {isEditing ? (
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
          ) : (
            partido.tipo_partido
          )}
        </p>
        <p>
          <strong>Resultado:</strong>{" "}
          {isEditing ? (
            <>
              <input
                type="number"
                name="resultado_equipo_1"
                value={editedPartido.resultado_equipo_1}
                onChange={handleChange}
              />
              {" - "}
              <input
                type="number"
                name="resultado_equipo_2"
                value={editedPartido.resultado_equipo_2}
                onChange={handleChange}
              />
            </>
          ) : (
            `${partido.resultado_equipo_1}-${partido.resultado_equipo_2}`
          )}
        </p>
      </div>

      <div className="contenedor-button">
        {isEditing ? (
          <>
            <button onClick={handleSave}>Guardar</button>
            <button onClick={handleCancel}>Cancelar</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Editar</button>
            <button onClick={() => onDelete(partido.id)}>Eliminar</button>
          </>
        )}
      </div>
    </li>
  );
};

EditablePartido.propTypes = {
  partido: PropTypes.shape({
    id: PropTypes.number.isRequired,
    equipo_1: PropTypes.string.isRequired,
    equipo_2: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
    estado: PropTypes.string.isRequired,
    tipo_partido: PropTypes.string.isRequired,
    resultado_equipo_1: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    resultado_equipo_2: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EditablePartido;
