import { useState, useEffect } from "react";
import { eliminarPartido, getPartidos, editarPartido } from "../api/api";
import FormPartido from "./FormPartido";
import EditForm from "./EditForm";

const Partidos = () => {
  const [partidos, setPartidos] = useState([]);
  const [filteredPartidos, setFilteredPartidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentPartido, setCurrentPartido] = useState(null);

  // Estado para filtros
  const [filtros, setFiltros] = useState({
    estado: "",
    tipo_partido: "",
    equipo: "",
    fecha: "",
  });

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const data = await getPartidos();
        setPartidos(data);
        setFilteredPartidos(data);
      } catch (error) {
        console.error("Error al obtener los partidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartidos();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás segurx de que quieres eliminar este partido?")) {
      try {
        await eliminarPartido(id);
        setPartidos((prev) => prev.filter((partido) => partido.id !== id));
        setFilteredPartidos((prev) => prev.filter((partido) => partido.id !== id));
        alert("Partido eliminado con éxito");
      } catch (error) {
        console.error("Error al eliminar el partido:", error);
        alert("Error al eliminar el partido");
      }
    }
  };

  const handleEditClick = (partido) => {
    setEditMode(true);
    setCurrentPartido(partido);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setCurrentPartido(null);
  };

  const handleEditSubmit = async (updatePartido) => {
    try {
      const partidoEditado = await editarPartido(updatePartido.id, updatePartido);
      setPartidos((prev) =>
        prev.map((partido) =>
          partido.id === partidoEditado.id ? partidoEditado : partido
        )
      );
      setFilteredPartidos((prev) =>
        prev.map((partido) =>
          partido.id === partidoEditado.id ? partidoEditado : partido
        )
      );
      setEditMode(false);
      setCurrentPartido(null);
      alert("Partido editado con éxito");
    } catch (error) {
      console.error("Error al editar el partido:", error);
      alert("Error al editar el partido");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));

    // Aplicar los filtros dinámicamente
    const partidosFiltrados = partidos.filter((partido) => {
      const matchEstado = !filtros.estado || partido.estado === value;
      const matchTipo = !filtros.tipo_partido || partido.tipo_partido === value;
      const matchEquipo =
        !filtros.equipo ||
        partido.equipo_1.includes(value) ||
        partido.equipo_2.includes(value);
      const matchFecha = !filtros.fecha || partido.fecha.startsWith(value);
      return matchEstado && matchTipo && matchEquipo && matchFecha;
    });

    setFilteredPartidos(partidosFiltrados);
  };

  const handleResetFiltros = () => {
    setFiltros({
      estado: "",
      tipo_partido: "",
      equipo: "",
      fecha: "",
    });
    setFilteredPartidos(partidos);
  };

  const formatDate = (fecha) => {
    const date = new Date(fecha);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("es-ES", options);
  };

  if (loading) {
    return <p>Cargando partidos...</p>;
  }

  return (
    <div className="contenedor-principal">
      <div className="contenedor-izquierda">
        <div className="contenedor-formulario">
        <h3>Crear/Editar</h3>
          {editMode ? (
            <EditForm
              partido={currentPartido}
              onCancel={handleCancelEdit}
              onSubmit={handleEditSubmit}
            />
          ) : (
            <FormPartido setPartidos={setPartidos} />
          )}
        </div>

        <div className="contenedor-filtros">
          <h3>Filtros</h3>
          <select name="estado" value={filtros.estado} onChange={handleFilterChange}>
            <option value="">Todos los estados</option>
            <option value="Jugado">Jugado</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Pospuesto">Pospuesto</option>
            <option value="Cancelado">Cancelado</option>
          </select>

          <select name="tipo_partido" value={filtros.tipo_partido} onChange={handleFilterChange}>
            <option value="">Todos los tipos</option>
            <option value="Amistoso">Amistoso</option>
            <option value="Liga-IMD">Liga-IMD</option>
            <option value="Torneo">Torneo</option>
          </select>

          <input
            type="text"
            name="equipo"
            placeholder="Buscar por equipo"
            value={filtros.equipo}
            onChange={handleFilterChange}
          />

          <input
            type="date"
            name="fecha"
            value={filtros.fecha}
            onChange={handleFilterChange}
          />

          <button onClick={handleResetFiltros}>Resetear filtros</button>
        </div>
      </div>

      <div className="contenedor-lista">
        <h2 className="app_h2">Partidos</h2>
        <ul>
          {filteredPartidos.map((partido) => (
            <li key={partido.id} className="formulario_li">
              <p className="host-grotesk-bold">
                {partido.equipo_1} vs {partido.equipo_2}
              </p>
              <p>Estado: {partido.estado}</p>
              <p>Fecha: {formatDate(partido.fecha)}</p>
              <p>Resultado: {partido.resultado_equipo_1}-{partido.resultado_equipo_2}</p>
              <div className="contenedor-button">
                <button onClick={() => handleEditClick(partido)}>Editar</button>
                <button onClick={() => handleEliminar(partido.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Partidos;
