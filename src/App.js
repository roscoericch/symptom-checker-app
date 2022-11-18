import "./App.css";
import { DataProvider } from "./contexts/contexts";
import Test from "./components/External/External";
import Symptoms from "./components/symptoms/symptoms";

function App() {
  return (
    <DataProvider>
      <Test />
    </DataProvider>
  );
}

export default App;
