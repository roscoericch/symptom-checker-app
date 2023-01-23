import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./contexts/contexts";
import DashBoard from "./components/Dashboard/Dashboard";
import Diagnosis from "./Pages/Diagnosis/Diagnosis";
import Specialisation from "./Pages/Specialisations/Specialisation";
import Issues from "./Pages/Issues/Issues";
import BodyDiagnosis from "./Pages/BodyDiagnosis/BodyDiagnosis";
import Test from "./components/External/External";

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="" element={<DashBoard />}>
          <Route path="/" element={<Diagnosis />} />
          <Route path="bodydiagnosis" element={<BodyDiagnosis />} />
          <Route path="specialisation" element={<Specialisation />} />
          <Route path="issues" element={<Issues />} />
        </Route>
        <Route path="/test" element={<Test />} />
      </Routes>
    </DataProvider>
  );
}

export default App;
