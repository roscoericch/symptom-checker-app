import React, { useContext } from "react";
import { DataContext } from "../../contexts/contexts";
import { Divider, Progress } from "antd";
import Spinner from "../../antd/atoms/Spinner";
const img = require("../../assets/medicimg.png");

const DiagnosisResult = () => {
  const { store } = useContext(DataContext);
  return (
    <div className="flex flex-col justifybetween w-full">
      {store.diagnosis.length > 0 ? (
        <>
          <div className="flex justify-between items-center text-[1.2rem] font-[600] py-[0.5rem]">
            <div>Diagnosis Result</div>
            <div className="text-right">Result Accuracy</div>
          </div>
          {store.diagnosis.map((e, i) => (
            <div key={i}>
              <div className="flex items-center justify-between gap-[1rem] pl-[0.5rem] pr-[1.5rem]">
                <div className="flex flex-col items-start justify-center">
                  <div className="text-[1rem]">{e.Issue.Name}</div>
                  {e.Issue.profName && (
                    <div>Professional name:{e.Issue.profName}</div>
                  )}
                  <div>
                    {e.Specialisation.map((i: any, j: any) => (
                      <div key={j}>{i.Name}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <Progress
                    type="circle"
                    percent={parseInt(e.Issue.Accuracy)}
                    width={80}
                  />
                </div>
              </div>
              <Divider />
            </div>
          ))}
        </>
      ) : (
        <div className="h-full relative">
          {store.status === "loading" ? (
            <Spinner />
          ) : (
            <img src={img} className="h-full w-full" alt="img" />
          )}
        </div>
      )}
    </div>
  );
};

export default DiagnosisResult;
