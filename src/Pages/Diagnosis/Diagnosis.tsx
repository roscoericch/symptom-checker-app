import Symptoms from "../../components/symptoms/symptoms";
import SelectedSymptoms from "../../components/symptoms/SelectedSymptoms";
import DiagnosisResult from "../../components/symptoms/DiagnosisResult";
const Diagnosis = () => {
  return (
    <div className="grid grid-cols-2 gap-[1rem]">
      <div className="grid grid-cols-1 gap-[1rem]">
        <Symptoms />
        <SelectedSymptoms />
      </div>
      <div className="flex justify-center">
        <DiagnosisResult />
      </div>
    </div>
  );
};

export default Diagnosis;
