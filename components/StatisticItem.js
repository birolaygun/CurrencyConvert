import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


const StatisticItem = (props) => {
  return (
    <div className="m-2 sm:text-lg">
      <div className="flex justify-around items-center p-1">
        <div className="font-bold mr-2 text-darkBlue">
          {props.multiplication}{" "}
        </div>
        <div>
   
          {props.value > 0
            ?  Number(props.value).toFixed(5)
            
            :<FontAwesomeIcon
              className="w-5 h-5 animate-spin"
              icon={faSpinner}
            />
          }
        </div>
      </div>
      <hr className="opacity-50" />
    </div>
  );
};

export default StatisticItem;
