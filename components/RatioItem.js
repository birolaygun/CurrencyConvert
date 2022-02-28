import React from "react";
import { useState, useEffect } from "react";
import { forSelects } from "../data/data";

const RatioItem = (props) => {
  const [list, setList] = useState([]);
  const [twoYearBefore, setTwoYearBefore] = useState();
  const [yearBefore, setYearBefore] = useState();
  const [mountBefore, setMountBefore] = useState();
  const [weekBefore, setweekBefore] = useState();
  const [dayBefore, setDayBefore] = useState();
  const [loading, setLoading] = useState(false);

  const calcRatio = (day, curCode) => {
    if (props.history[props.history.length - 1]) {
      let pastValues = Object.entries(
        props.history[props.history.length - day][1]
      ).map((histry) => ({
        currency: histry[0],
        value: histry[1],
      }));

      let pastValue = pastValues.find((fn) => fn.currency === curCode)?.value;
      let nowValue = props.now.find((fn) => fn.currency === curCode)?.value;

      if (props.otherValues === false) {
        return (nowValue / pastValue - 1) * 100;
      } else {
        return (pastValue / nowValue - 1) * 100;
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    setTwoYearBefore(99999999);

    if (props.history[props.history.length - 1]) {
      setTwoYearBefore(Number(calcRatio(731, props.to)).toFixed(2));
      setYearBefore(Number(calcRatio(366, props.to)).toFixed(2));
      setMountBefore(Number(calcRatio(31, props.to)).toFixed(2));
      setweekBefore(Number(calcRatio(8, props.to)).toFixed(4));
      setDayBefore(Number(calcRatio(2, props.to)).toFixed(6));
      if (props.carousel === 1) {
        setList([dayBefore, weekBefore]);
      } else if (props.carousel === 2) {
        setList([mountBefore, yearBefore, twoYearBefore]);
      } else {
        setList([
          dayBefore,
          weekBefore,
          mountBefore,
          yearBefore,
          twoYearBefore,
        ]);
      }

      setLoading(false);
    }
  }, [props.to, props.from, props.history, props.now]);

  return (
    <tr className="text-sm sm:text-lg border-b">
      <td
        className={
          props.carousel === 2
            ? "hidden"
            : "pt-3 pl-2 flex items-center flex-col"
        }
      >
        <img
          viewBox="0 0 16 16"
          className="h-5 w-10 rounded-sm shadow-card  "
          src={
            props.otherValues
              ? forSelects.find((fn) => fn.value === props.to).flag
              : props.from.flag
          }
          alt=""
        />
        <p className="text-[12px] text-center whitespace-nowrap">
          {props.otherValues
            ? ` against ${props.from.value} `
            : `against ${forSelects.find((fn) => fn.value === props.to).value}`}
        </p>
      </td>

      {list.map((li, i) => {
        return (
          <td key={i} className="p-1 text-center">
            <div>
              {list[list.length - 1] !== 99999999 && loading === false ? (
                <div>
                  <span> % {Math.abs(li)} </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className={`bi bi-caret-up-fill ml-1 inline-block mb-1 {} " 
            ${li == 0 ? " rotate-90 text-LightBlue" : ""}
            ${li > 0 ? "text-green " : ""}
            ${li < 0 ? "text-red-700 rotate-180" : ""} 
            `}
                    viewBox="0 0 16 16"
                  >
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>
                </div>
              ) : (
                <div className=" ">
                  <span className="animate-pulse animation-delay-75  ">L</span>
                  <span className="animate-pulse animation-delay-100 ">o</span>
                  <span className="animate-pulse animation-delay-150 ">a</span>
                  <span className="animate-pulse animation-delay-200 ">d</span>
                  <span className="animate-pulse animation-delay-300 ">i</span>
                  <span className="animate-pulse animation-delay-400 ">n</span>
                  <span className="animate-pulse animation-delay-500 ">g</span>
                  <span className="animate-pulse animation-delay-600 ">.</span>
                  <span className="animate-pulse animation-delay-700 ">.</span>
                  <span className="animate-pulse animation-delay-800 ">.</span>
                </div>
              )}
            </div>
          </td>
        );
      })}

      <td
        className={
          props.carousel === 2
            ? "pt-3 pl-2 flex items-center flex-col"
            : "hidden"
        }
      >
        <img
          viewBox="0 0 16 16"
          className="h-5 w-10 rounded-sm shadow-card  "
          src={
            props.otherValues
              ? forSelects.find((fn) => fn.value === props.to).flag
              : props.from.flag
          }
          alt=""
        />
        <p className="text-[12px] text-center whitespace-nowrap">
          {props.otherValues
            ? ` against ${props.from.value} `
            : `against ${forSelects.find((fn) => fn.value === props.to).value}`}
        </p>
      </td>
    </tr>
  );
};

export default RatioItem;
