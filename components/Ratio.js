import { useEffect, useState } from "react";
import RatioItem from "./RatioItem";
import { Carousel } from "react-responsive-carousel";

const Ratio = (props) => {
  const mostUsed = [
    //add code here to render
    "USD",
    "EUR",
    "GBP",
    // "CHF",
    "CAD",
    "CNY",
    // "NZD",
    "JPY",
    // "QAR",
  ];
  const [show, setShow] = useState([props.to]);
  const [now, setNow] = useState([]);

  useEffect(() => {
    setShow(mostUsed.filter((fl) => fl != props.from.value && fl != props.to.value));

    setNow(
      Object.entries(props.now).map((nw) => ({
        currency: nw[0],
        value: nw[1],
      }))
    );
  }, [props.from, props.now, props.to]);

  return (
    <div className="rounded-lg ">
      <div className="hidden md:block shadow-card rounded-lg">
        <div className="h-6 rounded-t-lg bg-gray-100"></div>

        <table className="w-full rounded-lg  " border="1">
          <thead className=" bg-gray-100">
            <tr className=" sm:text-lg font-bold rounded-lg">
              <td></td>
              <td className=" pb-5 text-center ">1 Day</td>
              <td className=" pb-5 text-center ">1 Week</td>
              <td className=" pb-5 text-center ">1 Mount</td>
              <td className=" pb-5 text-center ">6 Mounts</td>
              <td className=" pb-5 text-center ">1 Years</td>
            </tr>
          </thead>
          <tbody className="">
            <RatioItem
              i={"a"}
              from={props.from}
              to={props.to.value}
              history={Object.entries(props.history)}
              now={now}
              otherValues={false}
            />
            <RatioItem
              i={"b"}
              from={props.from}
              to={props.to.value}
              history={Object.entries(props.history)}
              now={now}
              otherValues={true}
            />

            {show.map((listItem, i) => (
              <RatioItem
                i={i}
                key={i}
                from={props.from}
                to={listItem}
                history={Object.entries(props.history)}
                now={now}
                otherValues={true}
              />
            ))}
          </tbody>
        </table>
      </div>

      <Carousel
        // centerSlidePercentage={90}
        // centerMode={true}

        showArrows={false}
        showStatus={false}
        autoPlay={false}
        showThumbs={false}
        swipeable={true}
        emulateTouch={true}
        preventMovementUntilSwipeScrollTolerance={true}
        swipeScrollTolerance={35}
        className="md:hidden shadow-card rounded-lg"
      >
        <div className="rounded-lg pb-10">
          <div className=" md:hidden  rounded-lg">
            <div className="h-6 rounded-t-lg bg-gray-100"></div>
            <table className="w-full rounded-lg " border="1">
              <thead className=" bg-gray-100">
                <tr className=" sm:text-lg font-bold rounded-lg ">
                  <td></td>
                  <td className=" pb-5 text-center ">1 Day</td>
                  <td className="  pb-5 text-center ">1 Week</td>
                </tr>
              </thead>
              <tbody>
                <RatioItem
                  i={"c"}
                  from={props.from}
                  to={props.to.value}
                  history={Object.entries(props.history)}
                  now={now}
                  otherValues={false}
                  carousel={1}
                />
                <RatioItem
                  i={"d"}
                  from={props.from}
                  to={props.to.value}
                  history={Object.entries(props.history)}
                  now={now}
                  otherValues={true}
                  carousel={1}
                />

                {show.map((listItem, i) => (
                  <RatioItem
                    i={i + 25}
                    key={i}
                    from={props.from}
                    to={listItem}
                    history={Object.entries(props.history)}
                    now={now}
                    otherValues={true}
                    carousel={1}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg">
          <div className="rounded-lg pb-10">
            <div className=" md:hidden  rounded-lg">
              <div className="h-6 rounded-t-lg bg-gray-100"></div>
              <table className="w-full rounded-lg " border="1">
                <thead className=" bg-gray-100">
                  <tr className=" sm:text-lg font-bold ">
                    <td className=" pb-5 text-center ">1 Mount</td>
                    <td className=" pb-5 text-center ">6 Mounts</td>
                    <td className=" pb-5 text-center ">1 Years</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  <RatioItem
                    i={"e"}
                    from={props.from}
                    to={props.to.value}
                    history={Object.entries(props.history)}
                    now={now}
                    otherValues={false}
                    carousel={2}
                  />
                  <RatioItem
                    i={"f"}
                    from={props.from}
                    to={props.to.value}
                    history={Object.entries(props.history)}
                    now={now}
                    otherValues={true}
                    carousel={2}
                  />

                  {show.map((listItem, i) => (
                    <RatioItem
                      i={i + 50}
                      key={i}
                      from={props.from}
                      to={listItem}
                      history={Object.entries(props.history)}
                      now={now}
                      otherValues={true}
                      carousel={2}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Ratio;
