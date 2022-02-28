import React from "react";
import AutoCalcItem from "./AutoCalcItem";

const AutoCalc = (props) => {
  return (
    <div className="w-full md:shadow-card md:rounded-lg ">
      <div className=" bg-gray-100 rounded-t-lg py-5 md:p-7">
        <h1 className=" text-lg text-center font-semibold pb-5">
          {" "}
          Convert {props.from.moneyName} to {props.to.moneyName}{" "}
        </h1>
        <div className="flex items-center justify-evenly ">
          <div className="flex items-center">
            <img
              className="w-9 h-5  rounded-sm mr-2 shadow-card"
              src={props.from.flag}
              alt=""
            />
            <div className=" whitespace-nowrap"> - {props.from.value}</div>
          </div>
          <div className="flex items-center ">
            <img
              className="shadow-card w-9 h-5 rounded-sm mr-2"
              src={props.to.flag}
              alt=""
            />
            <div className=" whitespace-nowrap"> - {props.to.value}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-b-lg p-1 md:p-3">
        <AutoCalcItem
          multiplication={1}
          from={props.from}
          to={props.to}
          value={props.value}
        />
        <AutoCalcItem
          multiplication={5}
          from={props.from}
          to={props.to}
          value={props.value}
        />
        <AutoCalcItem
          multiplication={10}
          from={props.from}
          to={props.to}
          value={props.value}
        />
        <AutoCalcItem
          multiplication={25}
          from={props.from}
          to={props.to}
          value={props.value}
        />
        <AutoCalcItem
          multiplication={50}
          from={props.from}
          to={props.to}
          value={props.value}
        />
        <AutoCalcItem
          multiplication={100}
          from={props.from}
          to={props.to}
          value={props.value}
        />
        <AutoCalcItem
          multiplication={500}
          from={props.from}
          to={props.to}
          value={props.value}
        />
        <AutoCalcItem
          multiplication={1000}
          from={props.from}
          to={props.to}
          value={props.value}
        />
        <AutoCalcItem
          multiplication={5000}
          from={props.from}
          to={props.to}
          value={props.value}
        />
        <AutoCalcItem
          multiplication={10000}
          from={props.from}
          to={props.to}
          value={props.value}
        />
        <AutoCalcItem
          multiplication={50000}
          from={props.from}
          to={props.to}
          value={props.value}
        />
        <AutoCalcItem
          multiplication={100000}
          from={props.from}
          to={props.to}
          value={props.value}
        />
      </div>
    </div>
  );
};

export default AutoCalc;
