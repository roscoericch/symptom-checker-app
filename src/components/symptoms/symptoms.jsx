import axios from "axios";
import "./symptoms.scss";
import { useContext } from "react";
import { DataContext } from "../../contexts/contexts";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { GiCancel } from "react-icons/gi";
const Symptoms = () => {
  const {
    store,
    getSymptoms,
    getProposedSymptoms,
    getDiagnosis,
    addSelectedSymptoms,
    deleteSelectedSymptoms,
  } = useContext(DataContext);
  const [filteredSymptoms, setfilteredSymptoms] = useState([]);
  const [searchSymptoms, setSearchSymptoms] = useState("");
  useEffect(() => {
    console.log("useEffect");
    if (store.symptoms.length < 1) {
      getSymptoms().then(() => {
        setfilteredSymptoms(store.symptoms);
      });
      return;
    }
    setfilteredSymptoms(store.symptoms);
  }, [store]);

  const onSearchChange = (event) => {
    const searchString = event.target.value.toLocaleLowerCase();
    setSearchSymptoms(searchString);
    const newfilteredSymptoms = store.symptoms.filter((symptoms) =>
      symptoms.Name.toLocaleLowerCase().includes(searchString)
    );
    setfilteredSymptoms(newfilteredSymptoms);
  };
  return (
    <div>
      <input
        placeholder="SearchSymptoms"
        type="search"
        value={searchSymptoms}
        onChange={onSearchChange}
      />
      <div className="symptoms">
        {filteredSymptoms.map((e) => (
          <div
            key={e.ID}
            onClick={async () => {
              addSelectedSymptoms(e);
              // console.log(state);
            }}
          >
            {e.Name}
          </div>
        ))}
      </div>
      <div className="selectedSymptoms">
        {store.selectedSymptoms.map((e, i) => (
          <div className="selectedSymptom" key={`${i}ee`}>
            <span>{e.symptom.Name}</span>
            <span>{e.redFlag}</span>
            <GiCancel onClick={() => deleteSelectedSymptoms(e)} />
          </div>
        ))}
      </div>
      <Button
        onClick={() => getDiagnosis(store.selectedSymptoms)}
        variant="contained"
        color="secondary"
      >
        Get Diagnosis
      </Button>
      <div>{store?.diagnosis}</div>
    </div>
  );
};

export default Symptoms;
