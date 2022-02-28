import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import ReactTooltip from "react-tooltip";

const Info = (props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  return (
    <span className="text-xs sm:text-sm md:text-base">
      <div className="mt-2">
        We use mid-market rates{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-info-circle inline mb-1"
          viewBox="0 0 16 16"
          data-tip="React-tooltip"
          data-for="info"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        </svg>
        {isMounted && (
          <ReactTooltip id="info" type="info">
            These are derived from the mean <br /> between "buy" and "sell"
            rates
            <br />
            from global currency markets. <br /> There are no transaction rates.
          </ReactTooltip>
        )}
      </div>
      <div className="mt-2">
        <span>
          <Moment fromNow className=" font-bold ">
            {(new Date(props.time)).getTime()}
          </Moment>{" "}
          <span>rates updated </span>
        </span>{" "}
      </div>
    </span>
  );
};

export default Info;
