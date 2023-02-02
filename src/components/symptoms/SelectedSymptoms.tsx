import { Card, Tooltip } from "antd";
import { useContext } from "react";
import { DataContext } from "../../contexts/contexts";
import { GrFlagFill } from "react-icons/gr";
import { GiCancel } from "react-icons/gi";

const gridStyle: React.CSSProperties = {
  width: "50%",
  textAlign: "left",
  padding: "1rem",
};

type TitleProps = {
  action: () => void;
};

const Title = ({ action }: TitleProps) => (
  <div className="flex items-center justify-between">
    <div>symptoms</div>
    <button
      onClick={action}
      className="bg-green-500 rounded-[4px] text-white text-center text-[0.9rem] py-[6px] px-[16px]"
    >
      GET DIAGNOSIS
    </button>
  </div>
);
const SelectedSymptoms = () => {
  const { store, deleteSelectedSymptoms, getDiagnosis } =
    useContext(DataContext);
  return (
    <Card
      title={
        <Title
          action={() => {
            getDiagnosis(store.selectedSymptoms);
          }}
        />
      }
    >
      {store.selectedSymptoms.map((e, i) => (
        <Card.Grid
          key={`${i}ee`}
          className="flex gap-[0.5rem] items-center justify-between p[0.5rem]"
          style={gridStyle}
        >
          <div className="text-[1rem]">
            <span>
              {e.symptom.Name}
              {e.redFlag && (
                <Tooltip
                  title="you have selected a symptom with a redFlag"
                  color="red"
                >
                  <GrFlagFill className="text-red-600 ml-[0.2rem] cursor-pointer inline-block" />
                </Tooltip>
              )}
            </span>
          </div>
          <GiCancel
            className="cursor-pointer"
            onClick={() => {
              deleteSelectedSymptoms(e, store);
            }}
          />
        </Card.Grid>
      ))}
    </Card>
  );
};

export default SelectedSymptoms;
