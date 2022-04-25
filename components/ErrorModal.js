import React, { useEffect, useState } from "react";

export function ErrorModal(props) {
  return (
    <div
      className="fixed w-full h-full bg-black bg-opacity-50
      left-0 top-0 z-50 flex items-center justify-center"
    >
      <div className="bg-white  p-4 rounded-lg shadow-md m-3">
        <h2>Error !!!</h2>
        <p className="my-3 ">
          We can not get updade data right now. We show you 09.03.2022's data{" "}
        </p>
        <button
          className="border rounded p-1 text-white bg-red"
          onClick={() => {
            props.setError(false);
          }}
        >
          close
        </button>
      </div>
    </div>
  );
}
