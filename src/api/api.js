import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-frb.onrender.com", 
});

export const getPartidos = async () => {
  const response = await API.get("/partidos");
  console.log("Datos obtenidos del backend:", response.data);
  return response.data;
};

export const crearPartido = async (partido) => {
  const response = await API.post("/partidos", partido);
  return response.data;
};

export const editarPartido = async (id, partido) => {
  const response = await API.put(`/partidos/${id}`, partido);
  return response.data;
}

export const eliminarPartido = async (id) => {
  const response = await API.delete(`/partidos/${id}`);
  return response.data;
}

export default API;