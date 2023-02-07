import SearchBox from "../../antd/atoms/searchbox";
import { symptom } from "../../contexts/contexts";
import { useContext } from "react";
import { DataContext } from "../../contexts/contexts";
import { useEffect, useState } from "react";
import Spinner from "../../antd/atoms/Spinner";
const Symptoms = () => {
  const { store, getSymptoms, addSelectedSymptoms } = useContext(DataContext);
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
      <SearchBox onSearch={onSearchChange} placeholder="Search Symptoms" />
      <div className="overflow-y-scroll h-full max-h-[65vh]">
        <div className="grid grid-cols-2 auto-rows-auto gap-4 content-start justify-items-start p-[1rem] rounded-[5px] border-solid border-[1px] border-[#f0f0f0]">
          {store.symptoms.map((e: symptom) => (
            <div
              key={e.ID}
              onClick={async () => {
                addSelectedSymptoms(e, store);
              }}
              className="bg-blue-200 max-w-fit my-auto rounded-[8px] text-left p-[0.5rem] cursor-pointer"
            >
              {e.Name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Symptoms;
