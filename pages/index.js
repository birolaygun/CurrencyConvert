import Head from "next/head";
import Select, { components } from "react-select";
import { forSelects, monthNames } from "../data/data";
import { useState, useEffect } from "react";
import axios from "axios";
import AutoCalc from "../components/AutoCalc";
import Info from "../components/Info";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Statistic from "../components/Statistic";
import Ratio from "../components/Ratio";

import dynamic from "next/dynamic";

const LineChart = dynamic(() => import("../components/LineChart"), {
  ssr: false,
});

const Placeholder = (props) => {
  return <components.Placeholder {...props} />;
};

function Home(props) {
  const findInitial = (cur) => {
    return forSelects.find((cry) => cry.value === cur);
  };

  const INITIAL_FROM_SELECT = findInitial("TRY");
  const INITIAL_TO_SELECT = findInitial("EUR");

  const [fromSelectLabel, setFromSelectLabel] = useState(INITIAL_FROM_SELECT);
  const [toSelectLabel, setToSelectLabel] = useState(INITIAL_TO_SELECT);
  const [toSelectValue, setToSelectValue] = useState("");
  const [amount, setAmount] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [rates, setRates] = useState([]); //first data
  const [time, setTime] = useState(); //first data
  const [toSelectList, setToSelectList] = useState();
  const [fromSelectList, setFromSelectList] = useState();
  const [turn, setTurn] = useState(false);
  const [history, setHistory] = useState([]);
  const [allHistory, setAllHistory] = useState([]);

  const getData = async () => {
    await axios
      .get(
        `https://freecurrencyapi.net/api/v2/latest?apikey=
        97b92220-9403-11ec-bd76-6543974c851a&base_currency=${fromSelectLabel.value}`
      )
      .then((resp) => {
        setRates(resp.data.data);
        setTime(Date(resp.data.query.timestamp));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, [fromSelectLabel, amount]);

  const getHistory = async () => {
    setAllHistory([]);

    let year = new Date().getFullYear();
    let mount = new Date().getMonth() + 1;
    if (mount < 10) {
      mount = `0${mount.toString()}`;
    }
    let day = new Date().getDate();
    if (day < 10) {
      day = `0${day.toString()}`;
    }

    const resp = await axios.get(
      `https://freecurrencyapi.net/api/v2/historical?apikey=
      97b92220-9403-11ec-bd76-6543974c851a&base_currency=${fromSelectLabel.value}
        &date_from=2020-01-01&date_to=${year}-${mount}-${day}`
    );
    setAllHistory(resp.data.data);
  };

  useEffect(() => {
    getHistory();
  }, [fromSelectLabel]);

  useEffect(() => {
    if (allHistory) {
      setHistory(
        Object.entries(allHistory).map((cry) => {
          let shortMountName = Array(cry[0].split("-").reverse()).map((qwe) => {
            monthNames[Number(qwe[1])];
            return `${qwe[0]} ${monthNames[Number(qwe[1] - 1)]} ${qwe[2]}`;
          });
          if (
            Object.entries(cry[1]).find((re) => re[0] === toSelectLabel.value)
          ) {
            return {
              date: shortMountName,
              dataDate: new Date(cry[0]),
              // join("."),
              value: Object.entries(cry[1]).find(
                (re) => re[0] === toSelectLabel.value
              )[1],
            };
          }
        })
      );
    } else {
      setHistory([]);
    }
  }, [allHistory]);

  useEffect(() => {
    getHistory();
  }, []);

  const exchange = (e) => {
    setTurn(!turn);
    if (toSelectLabel !== "" && fromSelectLabel !== "") {
      let base = toSelectLabel;
      setToSelectLabel(fromSelectLabel);
      setFromSelectLabel(base);
    } else alert("you didn't choce anything to change");
    e.preventDefault();
  };

  useEffect(() => {
    setAmount(Number(amountInput.replace(",", ".")));
  }, [amountInput]);

  useEffect(() => {
    setToSelectList(
      forSelects.map((cry) =>
        cry.label === fromSelectLabel.label ? { ...cry, isDisabled: true } : cry
      )
    );
  }, [fromSelectLabel]);

  useEffect(() => {
    setFromSelectList(
      forSelects.map((cry) =>
        cry.label === toSelectLabel.label ? { ...cry, isDisabled: true } : cry
      )
    );
  }, [toSelectLabel]);

  useEffect(() => {
    if (
      rates &&
      Object.entries(rates).find((as) => as[0] == toSelectLabel.value)
    ) {
      setToSelectValue(
        Object.entries(rates).find((as) => as[0] == toSelectLabel.value)[1]
      );
    }
  }, [rates]);

  useEffect(() => {
    if (toSelectValue === 1) {
      getData();
    }
  }, [toSelectValue]);

  return (
    <div
      className=" flex items-center justify-center 
    flex-col p-2 overflow-x-hidden text-[0.9rem] md:text-[1rem]"
    >
      <Head>
        <title>
          Convert {fromSelectLabel.moneyName} to {toSelectLabel.moneyName}
        </title>
        <meta
          name="description"
          content="exchange rate learning and exchange calculation"
        />
        <link rel="icon" href="/favicon.ico" />
        <script
          src="https://kit.fontawesome.com/70060c513b.js"
          crossorigin="anonymous"
        ></script>
      </Head>

      <div className="text-center">
        <h1 className="text-white text-lg font-semibold pt-5">
          Convert {fromSelectLabel.moneyName} to {toSelectLabel.moneyName}
        </h1>
        <h2 className="text-white text font-title p-2">
          {" "}
          {fromSelectLabel.value} to {toSelectLabel.value}
        </h2>
      </div>

      <div className=" bigComonent ">
        <form
          className="md:flex md:items-center md:justify-between "
          onSubmit={() => submitForm()}
        >
          <div className="my-4 md:w-3/12 md:mr-1">
            <label className="font-bold" htmlFor="amount">
              amount
            </label>
            <br />

            <input
              id="amount"
              inputMode="decimal"
              className="border w-full rounded-[4px] p-[6px] my-1  transition ease-in-out
                focus:outline-darkBlue border-gray-100 hover:border-gray-300 h-[45px]"
              type="number"
              onChange={(e) => {
                setAmountInput(e.target.value);
              }}
              value={amountInput}
            />
          </div>

          <div className="my-4 md:w-4/12 md:mx-1">
            <label className="font-bold" htmlFor="from">
              from
            </label>
            <br />
            <img src="" alt="" />

            <Select
              instanceId={1}
              onChange={(e) => setFromSelectLabel(e)}
              value={fromSelectLabel}
              className=" w-full rounded-md my-1 focus:shadow-lg"
              closeMenuOnSelect={true}
              components={{ Placeholder }}
              styles={{
                placeholder: (base) => ({
                  ...base,
                  fontSize: "1em",
                  fontWeight: 400,
                }),
              }}
              options={fromSelectList}
            />
          </div>

          <div className="flex items-center justify-between md:mx-1 md:mt-6 ">
            <button
              onClick={exchange}
              className={`border rounded-full p-3 transition-all ease-in-out  ${
                turn && "rotate-180"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-down-up text-darkBlue md:rotate-90 "
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                />
              </svg>
            </button>
            <div className="md:hidden">
              <Info time={time} id={"id1"} />
            </div>
          </div>

          <div className="my-4 md:w-4/12 md:ml-1">
            <label className="font-bold" htmlFor="to">
              to
            </label>
            <br />

            <Select
              instanceId={1}
              onChange={(e) => {
                setToSelectLabel(e);
              }}
              value={toSelectLabel}
              className=" w-full rounded-md my-1 focus:shadow-lg"
              closeMenuOnSelect={true}
              components={{ Placeholder }}
              styles={{
                placeholder: (base) => ({
                  ...base,
                  fontSize: "1em",
                  fontWeight: 400,
                }),
              }}
              options={toSelectList}
            />
          </div>
        </form>

        {fromSelectLabel !== "" && toSelectLabel !== "" && toSelectValue > 0 && (
          <div className="flex items-center">
            <div>{fromSelectLabel.value + " -  "} </div>
            <div className="font-bold text-xl mx-3">
              {fromSelectLabel.symbol}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right -3"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
            <div className="font-bold text-xl mx-3">{toSelectLabel.symbol}</div>
            <div>{" - " + toSelectLabel.value}</div>{" "}
          </div>
        )}

        <div className="flex justify-between items-center md:my-5">
          <div>
            <div>
              {fromSelectLabel !== "" &&
                toSelectLabel !== "" &&
                toSelectValue > 0 && (
                  <div className="md:mt-10">
                    <label className="font-bold" htmlFor="amount">
                      {amount > 0 ? (
                        <div className="shadow-xl font-bold text-xl bg-darkBlue text-white w-fit p-3 rounded-lg my-4">
                          {amount.toLocaleString()} {fromSelectLabel.symbol} =
                          {" " + (amount * toSelectValue).toLocaleString()}{" "}
                          {toSelectLabel.symbol}
                        </div>
                      ) : (
                        <div className=" shadow-xl font-bold text-xl bg-navy text-white w-fit p-3 rounded-lg my-4 opacity-80">
                          Please enter amount
                          <span className="animate-ping ">.</span>
                          <span className="animate-ping animation-delay-150 ">
                            .
                          </span>
                          <span className="animate-ping animation-delay-300  ">
                            .
                          </span>
                        </div>
                      )}
                    </label>

                    <div className="leading-4 py-1 md:leading-3 md:pb-0">
                      <div>
                        <span className="font-bold">
                          1 {toSelectLabel.value} ={" "}
                        </span>
                        <span>
                          {" " +
                            (1 / toSelectValue).toFixed(6) +
                            " " +
                            fromSelectLabel.value}{" "}
                        </span>
                      </div>
                      <div className="md:my-3">
                        <span className="font-bold ">
                          1 {fromSelectLabel.value} ={" "}
                        </span>
                        <span>
                          {" " +
                            toSelectValue.toFixed(6) +
                            " " +
                            toSelectLabel.value}{" "}
                        </span>{" "}
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
          <div className="hidden md:block">
            <Info time={time} id={"id2"} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl ">
        {toSelectValue > 0 && (
          <div
            className="my-4 py-6 items-center justify-between w-full 
          max-w-7xl overflow-x-auto hidden md:flex rounded-md
          
          "
          >
            <div className=" w-full mx-3 ">
              <AutoCalc
                to={toSelectLabel}
                from={fromSelectLabel}
                value={toSelectValue}
              />
            </div>

            <div className=" w-full mx-3 ">
              <AutoCalc
                to={fromSelectLabel}
                from={toSelectLabel}
                value={1 / toSelectValue}
              />
            </div>
          </div>
        )}

        {toSelectValue > 0 && (
          <div className="smallComonent md:hidden  ">
            <Carousel
              // centerSlidePercentage={95}
              // centerMode={true}
              showArrows={false}
              showStatus={false}
              autoPlay={false}
              showThumbs={false}
              swipeable={true}
              emulateTouch={true}
              className="w-full "
              preventMovementUntilSwipeScrollTolerance={true}
              swipeScrollTolerance={35}
            >
              <div className="mb-9">
                <AutoCalc
                  to={fromSelectLabel}
                  from={toSelectLabel}
                  value={1 / toSelectValue}
                />{" "}
              </div>

              <div className=" mb-9">
                <AutoCalc
                  to={toSelectLabel}
                  from={fromSelectLabel}
                  value={toSelectValue}
                />
              </div>
            </Carousel>
          </div>
        )}
      </div>
        <div
        className="w-full shadow-card rounded-xl my-4 md:my-8 max-w-7xl 
        "
      >
        <LineChart
          history={history}
          from={fromSelectLabel}
          to={toSelectLabel}
          value={(1 / toSelectValue).toFixed(6)}
          time={time}
        />
      </div>
      <div className="smallComonent md:max-w-7xl shadow-none">
        {history && (
          <Ratio
            now={rates}
            history={allHistory}
            from={fromSelectLabel}
            to={toSelectLabel}
          />
        )}
      </div>



      <div className="smallComonent">
        {history && (
          <Statistic
            exchange={exchange}
            history={history}
            from={fromSelectLabel}
            to={toSelectLabel}
            turn={turn}
          />
        )}
      </div>

    </div>
  );
}

export default Home;
