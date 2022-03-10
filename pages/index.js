import Head from "next/head";
import Select, { components } from "react-select";
import {
  forSelects,
  monthNames,
  fakeAllHistory,
  fakeRates,
} from "../data/data";
import { useState, useEffect } from "react";
import axios from "axios";
import AutoCalc from "../components/AutoCalc";
import Info from "../components/Info";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Statistic from "../components/Statistic";
import Ratio from "../components/Ratio";
import dynamic from "next/dynamic";
import { ErrorModal } from "../components/ErrorModal";

const LineChart = dynamic(() => import("../components/LineChart"), {
  ssr: false,
});

const Placeholder = (props) => {
  return <components.Placeholder {...props} />;
};

function Home(props) {
  const INITIAL_FROM_SELECT = "TRY";
  const INITIAL_TO_SELECT = "EUR";

  const [fromSelectLabel, setFromSelectLabel] = useState({});
  const [toSelectLabel, setToSelectLabel] = useState({});
  const [fromSelectValue, setFromSelectValue] = useState("");
  const [toSelectValue, setToSelectValue] = useState("");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [amount, setAmount] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [rates, setRates] = useState([]); //first data
  const [time, setTime] = useState(); //first data
  const [toSelectList, setToSelectList] = useState();
  const [fromSelectList, setFromSelectList] = useState();
  const [turn, setTurn] = useState(false);
  const [history, setHistory] = useState([]);
  const [allHistory, setAllHistory] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    setFromSelectLabel(
      forSelects.find((fn) => fn?.value === INITIAL_FROM_SELECT)
    );
    setToSelectLabel(forSelects.find((fn) => fn?.value === INITIAL_TO_SELECT));
  }, []);

  const getData = async () => {
    const options = {
      method: "GET",
      url: "https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest",
      headers: {
        "x-rapidapi-host":
          "currency-conversion-and-exchange-rates.p.rapidapi.com",
        "x-rapidapi-key": "4cc7cdc681mshf7ecd386f871a02p18b787jsnee8cd7c9ed1b",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setRates(response.data.rates);
        setTime(response.data.date);
        setApiError(false);
      })
      .catch(function (error) {
        setRates(fakeRates);
        setTime("2022-03-09");
        setApiError(true);
      });
  };

  useEffect(() => {
    getData();
  }, []);

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

    const options = {
      method: "GET",
      url: "https://currency-conversion-and-exchange-rates.p.rapidapi.com/timeseries",
      params: {
        start_date: `${year - 1}-${mount}-${day}`,
        end_date: `${year}-${mount}-${day}`,
        from: "USD",
        to: "EUR,GBP",
      },
      headers: {
        "x-rapidapi-host":
          "currency-conversion-and-exchange-rates.p.rapidapi.com",
        "x-rapidapi-key": "4cc7cdc681mshf7ecd386f871a02p18b787jsnee8cd7c9ed1b",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setAllHistory(response.data.rates);
        setApiError(false);
      })
      .catch(function (error) {
        console.error(error);
        setAllHistory(fakeAllHistory);
        setApiError(true);
      });
  };

  useEffect(() => {
    getHistory();
  }, []);

  useEffect(() => {

    let pastArray = [];

    if (allHistory) {
      pastArray = [];

      Object.entries(allHistory).map((cry) => {
        let editedDate = Array(cry[0].split("-").reverse())[0];
        let shortMountName = monthNames[Number(editedDate[1] - 1)];

        let dateWithMountName = `${editedDate[0]} ${shortMountName} ${editedDate[2]}`;
        let dateWithNumbers = cry[0];
        let pastFromValue = Object.entries(cry[1]).find(
          (dt) => dt[0] === fromSelectLabel.value
        )[1];
        let pastToValue = Object.entries(cry[1]).find(
          (dt) => dt[0] === toSelectLabel.value
        )[1];

        pastArray.push({
          date: new Date(dateWithNumbers),
          dateWithMountName: dateWithMountName,
          dateWithNumbers: dateWithNumbers,
          pastFromValue: pastFromValue,
          pastToValue: pastToValue,
        });

        pastArray.sort(function (a, b) {
          return a.date - b.date;
        });
      });

      setHistory(pastArray);
    }

  }, [fromSelectLabel, toSelectLabel, allHistory]);

  const exchange = (e) => {
    setTurn(!turn);

    let base = toSelectLabel;
    setToSelectLabel(fromSelectLabel);
    setFromSelectLabel(base);

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
      setFromSelectValue(
        Object.entries(rates).find((as) => as[0] == fromSelectLabel.value)[1]
      );
    }
  }, [rates, fromSelectLabel, toSelectLabel]);

  useEffect(() => {
    setToValue(fromSelectValue / toSelectValue);
    setFromValue(toSelectValue / fromSelectValue);
  }, [fromSelectValue, toSelectValue]);

  return (
    <div
      className=" flex items-center justify-center
    flex-col p-2 overflow-x-hidden text-[0.9rem] md:text-[1rem]"
    >
      {apiError && (
        <div >
          <ErrorModal />{" "}
        </div>
      )}

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
        <h1
          className="
         text-white text-lg font-semibold pt-5"
        >
          Convert {fromSelectLabel.moneyName} to {toSelectLabel.moneyName}
        </h1>
        <h2 className=" text-white text font-title p-2">
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
                          {" " + (amount * fromValue).toLocaleString()}{" "}
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
                            toValue.toFixed(6) +
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
                            fromValue.toFixed(6) +
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
          max-w-7xl overflow-x-auto hidden md:flex rounded-md"
          >
            <div className=" w-full mx-3 ">
              <AutoCalc
                to={toSelectLabel}
                from={fromSelectLabel}
                value={fromValue}
              />
            </div>

            <div className=" w-full mx-3 ">
              <AutoCalc
                to={fromSelectLabel}
                from={toSelectLabel}
                value={1 / fromValue}
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
          value={Number(toValue).toFixed(6)}
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
