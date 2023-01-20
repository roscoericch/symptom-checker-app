import "./App.css";
import { DataProvider } from "./contexts/contexts";
import Symptoms from "./components/symptoms/symptoms";

function App() {
  return (
    <DataProvider>
      <Symptoms />
    </DataProvider>
  );
}

export default App;
