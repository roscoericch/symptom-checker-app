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
    if (store.symptoms.length < 1) {
      getSymptoms();
    }
  }, []);

  const onSearchChange = (value: string) => {
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
      <div className="overflow-y-scroll h-[70vh] grid grid-cols-1 gap-4">
        {store.symptoms.map((e: symptom) => (
          <div
            key={e.ID}
            onClick={async () => {
              addSelectedSymptoms(e, store);
            }}
            className="bg-blue-200 max-h-fit max-w-fit rounded-[8px] text-center p-[0.5rem]"
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
            <GiCancel
              onClick={() => {
                deleteSelectedSymptoms(e, store);
              }}
            />
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
