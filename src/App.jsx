import Partidos from "./components/Partidos";
import "./styles/style.css"

function App() {
  return (
    <div className="app">
      <h1 className="app_h1">Menos Cachitas y Más Cucharitas</h1>
      <h3 className="app_h3">Una app hecha para Furbolleras</h3>
      <Partidos />
    </div>
  );
}

export default App;
