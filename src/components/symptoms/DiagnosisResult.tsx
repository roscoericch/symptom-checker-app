import React, { useContext } from "react";
import { DataContext } from "../../contexts/contexts";
import { Divider, Progress } from "antd";

const DiagnosisResult = () => {
  const { store } = useContext(DataContext);
  return (
    <div className="flex flex-col items-center justify-center">
      {store.diagnosis.map((e, i) => (
        <div key={i}>
          <div className="grid grid-cols-2">
            <div className="flex flex-col">
              <div className="text-[1.4rem]">{e.Issue.Name}</div>
              <div>{e.Issue.profName}</div>
              <div>
                {e.Specialisation.map((i: any, j: any) => (
                  <div key={j}>{i.Name}</div>
                ))}
              </div>
            </div>
            <Progress
              type="circle"
              percent={Number(e.Issue.Accuracy)}
              width={60}
            />
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default DiagnosisResult;
