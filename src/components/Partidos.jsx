import { useState, useEffect, useMemo } from "react";
import { eliminarPartido, getPartidos, editarPartido } from "../api/api";
import FormPartido from "./FormPartido";
import EditablePartido from "./EditablePartido";

const Partidos = () => {
  const [partidos, setPartidos] = useState([]);
  const [filtros, setFiltros] = useState({
    estado: "",
    tipo_partido: "",
    equipo: "",
    fecha: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const data = await getPartidos();
        setPartidos(data); 
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
        alert("Partido eliminado con éxito");
      } catch (error) {
        console.error("Error al eliminar el partido:", error);
        alert("Error al eliminar el partido");
      }
    }
  };

  const handleEditSubmit = async (updatedPartido) => {
    try {
      const partidoEditado = await editarPartido(updatedPartido.id, updatedPartido);
      setPartidos((prev) =>
        prev.map((partido) =>
          partido.id === partidoEditado.id ? partidoEditado : partido
        )
      );
      alert("Partido editado con éxito");
    } catch (error) {
      console.error("Error al editar el partido:", error);
      alert("Error al editar el partido");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetFiltros = () => {
    setFiltros({
      estado: "",
      tipo_partido: "",
      equipo: "",
      fecha: "",
    });
  };

  const filteredPartidos = useMemo(() => {
    return partidos.filter((partido) => {
      const matchEstado = !filtros.estado || partido.estado === filtros.estado;
      const matchTipo =
        !filtros.tipo_partido || partido.tipo_partido === filtros.tipo_partido;
      const matchEquipo =
        !filtros.equipo ||
        partido.equipo_1.toLowerCase().includes(filtros.equipo.toLowerCase()) ||
        partido.equipo_2.toLowerCase().includes(filtros.equipo.toLowerCase());
      const matchFecha = !filtros.fecha || partido.fecha.startsWith(filtros.fecha);
      return matchEstado && matchTipo && matchEquipo && matchFecha;
    });
  }, [partidos, filtros]);

  if (loading) {
    return <p className="p-cargando">Cargando partidos...</p>;
  }

  return (
    <div className="contenedor-principal">
      <div className="contenedor-izquierda">
        <div className="contenedor-formulario">
          <h3>Crear Partido</h3>
          <FormPartido setPartidos={setPartidos} />
        </div>

        <div className="contenedor-filtros">
          <h3>Filtros</h3>
          <select
            name="estado"
            value={filtros.estado}
            onChange={handleFilterChange}
          >
            <option value="">Todos los estados</option>
            <option value="Jugado">Jugado</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Pospuesto">Pospuesto</option>
            <option value="Cancelado">Cancelado</option>
          </select>

          <select
            name="tipo_partido"
            value={filtros.tipo_partido}
            onChange={handleFilterChange}
          >
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
        <h2>Partidos</h2>
        <ul>
          {filteredPartidos.map((partido) => (
            <EditablePartido
              key={partido.id}
              partido={partido}
              onUpdate={handleEditSubmit}
              onDelete={handleEliminar}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Partidos;
