import { List } from "@mui/material";
import axios, { Axios } from "axios";
import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { demo_symptoms } from "../components/DATA/Demo.Symptoms";

export const DataContext = createContext({
  demoSymptoms: demo_symptoms,
  selectedSymptoms: [],
  diagnosis: [],
  GetDiagnosis: () => {},
  UpdateDemoSymptoms: () => {},
  AddSelectedSymptoms: () => {},
  deleteSelectedSymptoms: () => {},
});

export const DataProvider = ({ children }) => {
  const [demoSymptoms, SetDemoSymptoms] = useState(demo_symptoms);
  const [selectedSymptoms, SetSelectedSymptoms] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]);
  //   const getProposedSymptoms = (ListId) => {
  //     const ProposedSymptoms = await axios
  //       .get(
  //         `https://sandbox-healthservice.priaid.ch/symptoms/proposed?symptoms=[${ListId}]&gender=male&year_of_birth=19&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNpa2lydXJhemFrMUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjEwOTI4IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDIyLTA3LTE5IiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2NjAxMTc5MjAsIm5iZiI6MTY2MDExMDcyMH0.mgIiUGBZB26l1qydR1f6q-lThwQb67Yzc6alDijFapo&format=json&language=en-gb`
  //       )
  //       .then((res) => {
  //         console.log(res.data);
  //         SetDemoSymptoms(res.data);
  //       });
  //     return ProposedSymptoms;
  //   };
  const AddSelectedSymptoms = async (symptom) => {
    // list = Axios.get("");
    // SetDemoSymptoms(List);
    const redFlag = await axios
      .get(
        `https://sandbox-healthservice.priaid.ch/redflag?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNpa2lydXJhemFrMUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjEwOTI4IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDIyLTA3LTE5IiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2NjAyNjQwNjksIm5iZiI6MTY2MDI1Njg2OX0.-tfnZP_UjpE14zHlgBi5HSSbrfhYmIWw1dlSugBrivQ&symptomId=${symptom.ID}&format=json&language=en-gb`
      )
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
    SetSelectedSymptoms([
      ...selectedSymptoms,
      { symptom: symptom, redFlag: redFlag },
    ]);
  };

  const deleteSelectedSymptoms = (symptom) => {
    const updatedSymptom = selectedSymptoms.filter((e) => e !== symptom);
    console.log(updatedSymptom);
    SetSelectedSymptoms(updatedSymptom);
    // if (!selectedSymptoms.length) {
    //   SetDemoSymptoms(demo_symptoms);
    // }
  };

  const GetDiagnosis = () => {
    const SymptomID = selectedSymptoms.map((e) => e.symptom.ID);
    axios
      .get(
        `https://sandbox-healthservice.priaid.ch/diagnosis?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNpa2lydXJhemFrMUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjEwOTI4IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDIyLTA3LTE5IiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2NjAyNjQwNjksIm5iZiI6MTY2MDI1Njg2OX0.-tfnZP_UjpE14zHlgBi5HSSbrfhYmIWw1dlSugBrivQ&symptoms=[${SymptomID}]&gender=male&year_of_birth=19&format=json`
      )
      .then((res) => setDiagnosis(res.data));
  };

  useEffect(() => {
    if (!selectedSymptoms.length) {
      SetDemoSymptoms(demo_symptoms);
      return;
    }
    if (selectedSymptoms.length) {
      const ListId = selectedSymptoms.map((e) => e.symptom.ID);
      console.log(ListId);
      //   getProposedSymptoms(ListId);
      axios
        .get(
          `https://sandbox-healthservice.priaid.ch/symptoms/proposed?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNpa2lydXJhemFrMUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjEwOTI4IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDIyLTA3LTE5IiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2NjAyNjQwNjksIm5iZiI6MTY2MDI1Njg2OX0.-tfnZP_UjpE14zHlgBi5HSSbrfhYmIWw1dlSugBrivQ&language=en-gb&symptoms=[${ListId}]&gender=male&year_of_birth=1981&format=json`
        )
        .then((res) => {
          console.log(res.data);
          SetDemoSymptoms(res.data);
        });
      //   console.log(ProposedSymptoms);
      return;
    }
  }, [selectedSymptoms]);
  const value = {
    demoSymptoms,
    selectedSymptoms,
    AddSelectedSymptoms,
    deleteSelectedSymptoms,
    diagnosis,
    GetDiagnosis,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
