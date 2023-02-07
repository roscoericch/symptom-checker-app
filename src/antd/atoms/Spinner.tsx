import React from "react";
import { Spin } from "antd";

const Spinner = () => (
  <div className="absolute top-[50%] left-[0] h-[90vh] translate-y-[-50%] w-full bg-slate-200">
    <Spin
      tip="Getting Results"
      className="relative top-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%]"
    />
  </div>
);

export default Spinner;
