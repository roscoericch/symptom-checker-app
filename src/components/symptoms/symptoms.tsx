import "./symptoms.scss";
import SearchBox from "../../antd/atoms/searchbox";
import { symptom } from "../../contexts/contexts";
import React, { useContext } from "react";
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
  const [filteredSymptoms, setfilteredSymptoms] = useState<Array<symptom> | []>(
    []
  );
  const [searchSymptoms, setSearchSymptoms] = useState("");
  useEffect(() => {
    console.log("useEffect");
    getSymptoms();
    setfilteredSymptoms(store.symptoms);
  }, []);

  const onSearchChange = (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchString = value;
    setSearchSymptoms(searchString);
    const newfilteredSymptoms = store.symptoms.filter((symptoms) =>
      symptoms.Name.toLocaleLowerCase().includes(searchString)
    );
    setfilteredSymptoms(newfilteredSymptoms);
  };
  return (
    <div>
      {/* <input
        placeholder="SearchSymptoms"
        type="search"
        value={searchSymptoms}
        onChange={onSearchChange}
      /> */}
      <SearchBox onSearch={onSearchChange} placeholder="Search Symptoms" />
      <div className="overflow-scroll">
        {filteredSymptoms.map((e: symptom) => (
          <div
            key={e.ID}
            onClick={async () => {
              addSelectedSymptoms(e);
              getProposedSymptoms(store.selectedSymptoms);
            }}
            className="bg-blue-200 text-center w-[6rem]"
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
      {/* <div>{store?.diagnosis}</div> */}
    </div>
  );
};

export default Symptoms;
