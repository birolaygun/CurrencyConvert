import React from "react";

const AutoCalcItem = (props) => {
  return (
    <div>
      <div className="flex justify-around items-center p-1">
        <div className="font-bold">
          {props.multiplication.toLocaleString()} {props.from.value}{" "}
        </div>
        <div>
          {(props.multiplication * props.value).toLocaleString()}{" "}
          {props.to.value}
        </div>
      </div>
      <hr className="opacity-50" />
    </div>
  );
};

export default AutoCalcItem;
