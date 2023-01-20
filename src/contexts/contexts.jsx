import useApi from "../api/useApi";
import { createContext, useEffect, useState, useReducer } from "react";

export const DataContext = createContext({
  store: {},
  getDiagnosis: () => {},
  getSymptoms: () => {},
  getProposedSymptoms: () => {},
  addSelectedSymptoms: () => {},
  deleteSelectedSymptoms: () => {},
});

const initialState = {
  symptoms: [],
  selectedSymptoms: [],
  diagnosis: [],
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case "getSymptoms":
      return { ...state, symptoms: action.payload };
    case "addSelectedSymptom":
      return {
        ...state,
        selectedSymptoms: [...state.selectedSymptoms, action.payload],
      };
    case "deleteSelectedSymptom":
      const Arr = state.selectedSymptoms.filter(
        (e) => e.symptom.ID !== action.payload.symptom.ID
      );
      return { ...state, selectedSymptoms: Arr };
    case "updateDiagnosis":
      return { ...state, diagnosis: action.payload };
    default:
      throw new Error("unidentified specified types");
  }
};

export const DataProvider = ({ children }) => {
  const { sendRequest } = useApi();
  const [store, dispatch] = useReducer(storeReducer, initialState);
  const getSymptoms = async () => {
    const data = await sendRequest
      .get(
        `https://sandbox-healthservice.priaid.ch/symptoms?token=${sessionStorage.getItem(
          "token"
        )}&format=json&language=en-gb`
      )
      .then((res) => dispatch({ type: "getSymptoms", payload: res.data }));
    return data;
  };
  const getProposedSymptoms = async (selectedSymptoms) => {
    const symptomsList = selectedSymptoms.map((e) => e.symptom.ID);
    const symptoms = await sendRequest
      .get(
        `https://sandbox-healthservice.priaid.ch/symptoms/proposed?symptoms=[${symptomsList}]&gender=male&year_of_birth=19&token=${sessionStorage.getItem(
          "token"
        )}&format=json&language=en-gb`
      )
      .then((res) => res.data);
    dispatch({ type: "getSymptoms", payload: symptoms });
  };
  const addSelectedSymptoms = async (symptom) => {
    const redFlag = await sendRequest
      .get(
        `https://sandbox-healthservice.priaid.ch/redflag?token=${sessionStorage.getItem(
          "token"
        )}&symptomId=${symptom.ID}&format=json&language=en-gb`
      )
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "addSelectedSymptom",
          payload: { symptom, redFlag: res.data },
        });
        console.log(store, symptom);
      });
    return
  };

  const deleteSelectedSymptoms = (selectedSymptom) => {
    dispatch({ type: "deleteSelectedSymptom", payload: selectedSymptom });
  };

  const getDiagnosis = async (selectedSymptoms) => {
    const SymptomID = selectedSymptoms.map((e) => e.symptom.ID);
    const diagnosis = await sendRequest
      .get(
        `https://sandbox-healthservice.priaid.ch/diagnosis?token=${sessionStorage.getItem(
          "token"
        )}&symptoms=[${SymptomID}]&gender=male&year_of_birth=1982&format=json`
      )
      .then((res) => res.data);
    dispatch({ type: "updateDiagnosis", payload: diagnosis });
  };
  const value = {
    store,
    getSymptoms,
    getProposedSymptoms,
    getDiagnosis,
    addSelectedSymptoms,
    deleteSelectedSymptoms,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
