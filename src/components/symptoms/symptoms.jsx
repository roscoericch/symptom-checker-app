import React from "react";
import axios from "axios";
import "./symptoms.scss";
import { useContext } from "react";
import { DataContext } from "../../contexts/contexts";

import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { GiCancel } from "react-icons/gi";
const Symptoms = () => {
  const [searchSymptoms, setSearchSymptoms] = useState("");
  const {
    demoSymptoms,
    selectedSymptoms,
    AddSelectedSymptoms,
    deleteSelectedSymptoms,
    diagnosis,
    GetDiagnosis,
  } = useContext(DataContext);
  const [filteredSymptoms, setfilteredSymptoms] = useState(demoSymptoms);
  useEffect(() => {
    const newfilteredSymptoms = demoSymptoms.filter((symptoms) =>
      symptoms.Name.toLocaleLowerCase().includes(searchSymptoms)
    );
    setfilteredSymptoms(newfilteredSymptoms);
  }, [demoSymptoms, searchSymptoms]);

  const onSearchChange = (event) => {
    const searchString = event.target.value.toLocaleLowerCase();
    setSearchSymptoms(searchString);
  };
  return (
    <div>
      <input
        placeholder="SearchSymptoms"
        type="search"
        onChange={onSearchChange}
      />
      <div className="symptoms">
        {filteredSymptoms.map((e) => (
          <div
            key={e.ID}
            onClick={() => {
              AddSelectedSymptoms(e);
            }}
          >
            {e.Name}
          </div>
        ))}
      </div>
      <div className="selectedSymptoms">
        {selectedSymptoms.map((e) => (
          <div className="selectedSymptom" key={e.symptom.ID}>
            <span>{e.symptom.Name}</span>
            <span>{e.redFlag}</span>
            <GiCancel onClick={() => deleteSelectedSymptoms(e)} />
          </div>
        ))}
      </div>
      <Button onClick={GetDiagnosis} variant="contained" color="secondary">
        Get Diagnosis
      </Button>
      <div>{diagnosis}</div>
    </div>
  );
};

export default Symptoms;
