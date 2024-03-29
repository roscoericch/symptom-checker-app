import useApi from "../api/useApi";
import React, {
  createContext,
  useEffect,
  useState,
  useReducer,
  PropsWithChildren,
} from "react";

export type symptom = {
  ID: number;
  Name: string;
};
type selectedSymptom = {
  symptom: symptom;
  redFlag: string;
};
export type dataState = {
  symptoms: Array<symptom>;
  selectedSymptoms: Array<selectedSymptom>;
  diagnosis: Array<Record<string, any>>;
  status: string;
};
type ACTIONTYPE =
  | { type: "getSymptoms"; payload: Array<symptom> }
  | { type: "addSelectedSymptom"; payload: selectedSymptom }
  | { type: "deleteSelectedSymptom"; payload: selectedSymptom }
  | { type: "updateDiagnosis"; payload: Array<{}> }
  | { type: "status"; payload: string };

const initialState = {
  symptoms: [],
  selectedSymptoms: [],
  diagnosis: [],
  status: "",
};
type store = {
  store: dataState;
  getDiagnosis: (c: Array<selectedSymptom>) => void;
  getSymptoms: () => void;
  getProposedSymptoms: (c: Array<selectedSymptom>) => void;
  addSelectedSymptoms: (c: symptom, store: dataState) => void;
  deleteSelectedSymptoms: (c: selectedSymptom, store: dataState) => void;
};
type Props = {
  children: React.ReactNode;
};
export const DataContext = createContext<store>({
  store: initialState,
  getDiagnosis: () => {},
  getSymptoms: () => {},
  getProposedSymptoms: () => {},
  addSelectedSymptoms: () => {},
  deleteSelectedSymptoms: () => {},
});

const storeReducer = (
  state: dataState | typeof initialState,
  action: ACTIONTYPE
) => {
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
    case "status":
      return { ...state, status: action.payload };
    default:
      throw new Error("unidentified specified types");
  }
};
export const DataProvider = ({ children }: Props) => {
  const { sendRequest } = useApi();
  const [store, dispatch] = useReducer(storeReducer, initialState);
  const getSymptoms = async () => {
    const data = await sendRequest
      .get(
        `https://sandbox-healthservice.priaid.ch/symptoms?token=${sessionStorage.getItem(
          "token"
        )}&format=json&language=en-gb`
      )
      .then((res) => {
        if (res.data) {
          dispatch({ type: "getSymptoms", payload: res.data });
          sessionStorage.setItem("symptoms", JSON.stringify(res.data));
        }
      });
    return;
  };
  const getProposedSymptoms = async (
    selectedSymptoms: Array<selectedSymptom>
  ) => {
    const symptomsList = selectedSymptoms.map((e) => e.symptom.ID);
    if (symptomsList.length > 0) {
      const symptoms = await sendRequest
        .get(
          `https://sandbox-healthservice.priaid.ch/symptoms/proposed?symptoms=[${symptomsList}]&gender=male&year_of_birth=19&token=${sessionStorage.getItem(
            "token"
          )}&format=json&language=en-gb`
        )
        .then((res) => res.data);
      dispatch({ type: "getSymptoms", payload: symptoms });
      return;
    } else {
      getSymptoms();
      return;
    }
  };
  const addSelectedSymptoms = async (symptom: symptom, store: dataState) => {
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
        return res.data;
      });
    getProposedSymptoms([...store.selectedSymptoms, { symptom, redFlag }]);
    return;
  };

  const deleteSelectedSymptoms = (
    selectedSymptom: selectedSymptom,
    store: dataState
  ) => {
    dispatch({ type: "deleteSelectedSymptom", payload: selectedSymptom });
    const selectedSymptoms = store.selectedSymptoms.filter(
      (e) => e.symptom !== selectedSymptom.symptom
    );
    getProposedSymptoms(selectedSymptoms);
  };

  const getDiagnosis = async (selectedSymptoms: Array<selectedSymptom>) => {
    dispatch({ type: "status", payload: "loading" });
    const SymptomID = selectedSymptoms.map((e) => e.symptom.ID);
    const diagnosis = await sendRequest
      .get(
        `https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=[${SymptomID}]&gender=male&year_of_birth=1982&token=${sessionStorage.getItem(
          "token"
        )}&format=json&language=en-gb`
      )
      .then((res) => {
        if (res.data) {
          dispatch({ type: "updateDiagnosis", payload: res.data });
          dispatch({ type: "status", payload: "success" });
        }
      });
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
