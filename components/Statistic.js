import React, { useEffect, useState } from "react";
import StatisticItem from "./StatisticItem";

const Statistic = (props) => {
  const [values, setValues] = useState([]);
  const [first, setFirst] = useState([]);
  const [firstMax, setFirstMax] = useState([]);
  const [firstMin, setFirstMin] = useState([]);
  const [firstAvr, setFirstAvr] = useState([]);
  const [second, setSecond] = useState([]);
  const [secondMax, setSecondMax] = useState([]);
  const [secondMin, setSecondMin] = useState([]);
  const [secondAvr, setSecondAvr] = useState([]);

  useEffect(() => {

    setFirstMax(0)
    setFirstMin(0)
    setFirstAvr(0)
    setSecondMax(0)
    setSecondMin(0)
    setSecondAvr(0)


    let values;
    values = [];
    if (props.history[props.history.length - 1]?.value) {
      setValues([]);
      props.history.map((hr) => {
        values.push(hr.value);
      });
      setValues(values);
    }
  }, [props.history]);

  useEffect(() => {
    setFirst(values.slice(values.length - 31, values.length - 1));
    setSecond(values.slice(values.length - 91, values.length - 1));
  }, [values]);

  const calc = () => {




    setFirstMax(
      Math.max.apply(
        Math,
        first.map(function (o) {
          return 1 / o;
        })
      )
    );

    setFirstMin(
      Math.min.apply(
        Math,
        first.map(function (o) {
          return 1 / o;
        })
      )
    );

    let top30 = 0;
    first.map((ls) => {
      top30 += ls;
    });

    setFirstAvr(first.length / top30);

    setSecondMax(
      Math.max.apply(
        Math,
        second.map(function (o) {
          return 1 / o;
        })
      )
    );
    setSecondMin(
      Math.min.apply(
        Math,
        second.map(function (o) {
          return 1 / o;
        })
      )
    );

    let top90 = 0;
    second.map((ls) => {
      top90 += ls;
    });

    setSecondAvr(second.length / top90);
  };

  useEffect(() => {
    calc();
  }, [first, second]);

  return (
    <div className="w-full ">
      <div className=" bg-gray-100 rounded-t-lg flex flex-col items-center ">
        <div className="flex items-center p-3 mt-4 rounded-md ">
          <img
            className="shadow-card w-10 h-6 rounded"
            src={props.from.flag}
            alt=""
          />
          <button
            onClick={props.exchange}
            className={`shadow-md border rounded-full p-3 transition-all ease-in-out bg-white mx-5 ${
              props.turn && "rotate-180"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className=" bi bi-arrow-down-up text-[#0a146e] rotate-90 "
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
              />
            </svg>
          </button>
          <img
            className="shadow-card w-10 h-6 rounded"
            src={props.to.flag}
            alt=""
          />
        </div>

        <h1 className="text-lg font-semibold text-center">
          Statistics - {props.from.value} in 1 {props.to.value}
        </h1>
        <div className="flex items-center justify-evenly w-full m-5 font-narrow">
          <div className=" text font-title text-center">Last 30 Days</div>
          <div className=" text font-title text-center">Last 90 Days</div>
        </div>
      </div>

      <div className="bg-white rounded-b-lg p-1 flex items-center justify-evenly pb-7">

        <div className="w-full">
          <StatisticItem
          history={props.history}
            multiplication={"Max:"}
            from={props.from}
            to={props.to}
            value={firstMax}
          />
          <StatisticItem
          history={props.history}
            multiplication={"Min:"}
            from={props.from}
            to={props.to}
            value={firstMin}
          />
          <StatisticItem
          history={props.history}
            multiplication={"Avr:"}
            from={props.from}
            to={props.to}
            value={firstAvr}
          />
        </div>
        <div className="w-full">
          <StatisticItem
          history={props.history}
            multiplication={"Max:"}
            from={props.from}
            to={props.to}
            value={secondMax}
          />
          <StatisticItem
          history={props.history}
            multiplication={"Min:"}
            from={props.from}
            to={props.to}
            value={secondMin}
          />
          <StatisticItem
          history={props.history}
            multiplication={"Avr:"}
            from={props.from}
            to={props.to}
            value={secondAvr}
          />
        </div>
      </div>

      
    </div>
  );
};

export default Statistic;
