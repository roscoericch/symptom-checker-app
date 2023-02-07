import Symptoms from "../../components/symptoms/symptoms";
import SelectedSymptoms from "../../components/symptoms/SelectedSymptoms";
import DiagnosisResult from "../../components/symptoms/DiagnosisResult";
const Diagnosis = () => {
  return (
    <div className="grid grid-cols-2 gap-x-[2rem] content-start">
      <div className="grid grid-cols-1 gap-[1rem] content-start justify-itemsstart">
        <Symptoms />
        <SelectedSymptoms />
      </div>
      <div className="flex justify-center max-h-[90vh] overflow-y-scroll">
        <DiagnosisResult />
      </div>
    </div>
  );
};

export default Diagnosis;
