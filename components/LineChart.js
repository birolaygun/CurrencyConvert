import React, { useRef, useLayoutEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useEffect } from "react";
import { monthNames } from "../data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

am4core.useTheme(am4themes_animated);

const LineChart = (props) => {
  const chart = useRef(null);
  const [amChartData, setAmChartData] = useState([]);

  const [year, setYear] = useState();
  const [day, setDay] = useState();
  const [mounth, setMounth] = useState();
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  const [second, setSecond] = useState();
  const [loading, setLoading] = useState(false);

  var m = new Date(props.time);

  useEffect(() => {
    setYear(m.getFullYear());
    setDay(m.getDate());
    setMounth(m.getMonth());
    if (m.getHours() < 10) {
      setHour(0 + String(m.getHours()));
    } else {
      setHour(m.getHours());
    }
    if (m.getMinutes() < 10) {
      setMinute(0 + String(m.getMinutes()));
    } else {
      setMinute(m.getMinutes());
    }
    if (m.getSeconds() < 10) {
      setSecond(0 + String(m.getSeconds()));
    } else {
      setSecond(m.getSeconds());
    }
  }, [props.time]);

  const setLineData = () => {
    setLoading(true);

    if (props.history.map((hr) => hr)[props.history.length - 1]) {
      let dataForChart = [];
      Object.entries(props.history).map((hr) => {
        dataForChart.push({
          date: new Date(hr[1].dateWithNumbers),
          value: Number(hr[1].pastFromValue / hr[1].pastToValue),
        });
      });
      setAmChartData(dataForChart);
    }
  };

  useEffect(() => {
    setLineData();
  }, [props.history]);

  useEffect(() => {
    if (amChartData[amChartData.length - 1]) {
      setLoading(false);
    }
  }, [amChartData]);

  useLayoutEffect(() => {
    let x = am4core.create("chartdiv", am4charts.XYChart);

    x.paddingRight = 20;

    x.data = amChartData;

    let dateAxis = x.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 10;
    dateAxis.dateFormats.setKey("day", "d MMM  yyyy");
    dateAxis.gridIntervals;

    let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    var fillModifier = new am4core.LinearGradientModifier();
    fillModifier.opacities = [0.7, 0.2];
    fillModifier.offsets = [0, 1];
    fillModifier.gradient.rotation = 90;

    let series = x.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.tooltipText = `[bold] {valueY}  ${props.from.value}`;
    series.tensionX = 0.8;
    series.tensionY = 0.8;
    series.dateX;
    series.fillOpacity = 1;
    series.segments.template.fillModifier = fillModifier;
    series.strokeWidth = 0.5;

    x.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    x.scrollbarX = scrollbarX;

    x.scrollbarX.scrollbarChart.plotContainer.filters.clear();

    x.scrollbarX.showSystemTooltip = true;
    x.scrollbarX.startGrip.showSystemTooltip = true;
    x.scrollbarX.endGrip.showSystemTooltip = true;

    x.scrollbarX.thumb.background.fill = am4core.color("#BDBDBD");
    x.scrollbarX.thumb.background.fillOpacity = 0.03;
    x.scrollbarX.thumb.showSystemTooltip = true;
    x.scrollbarX.thumb.background.states.getKey("hover").properties.fill =
      am4core.color("#9E9E9E");
    x.scrollbarX.thumb.background.states.getKey("down").properties.fill =
      am4core.color("#757575");

    x.zoomOutButton.background.states.getKey("hover").properties.fill =
      am4core.color("#002cff");
    x.zoomOutButton.background.states.getKey("down").properties.fill =
      am4core.color("#0a146e");

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, [amChartData]);

  return (
    <div>
      <header className="  rounded-t-lg bg-gray-100 p-6">
        <h1 className=" text-lg font-semibold text-center ">
          1 {props.to.moneyName}'s Value{" "}
        </h1>
        <h2 className=" text font-title text-center">Last 1 Year</h2>

        <div className="leading-3">
          <span className="pr-3 relative top-[14px]">
            <div className="w-2 h-2 bg-green-dark rounded-full mr-2 absolute"></div>
            <div className="w-2 h-2 bg-green-dark rounded-full animate-ping mr-2"></div>
          </span>
          <span className="text-sm font-bold font-narrow">
            1 {props.to.value} = {props.value} {props.from.value}
          </span>{" "}
          <br />
          <span className="text-xs font-narrow">
            {monthNames[mounth]} {day},{year} / {hour}:{minute}:
            <span className="opacity-50">{String(second) }</span>
          </span>
        </div>
      </header>

      <div
        className={
          !loading
            ? "hidden"
            : " w-[calc(100%-1rem)] absolute rounded-b-lg  bg-black opacity-70 flex items-center justify-center max-w-7xl z-50"
        }
        style={{ width: "100%", height: "500px" }}
      >
        <div className=" w-auto h-1/3 p-16 animate-spin">
          <FontAwesomeIcon
            className=" w-full h-full animate-ping text-white "
            icon={faSpinner}
          />
        </div>
      </div>

      <div
        className="  rounded-b-lg bg-white"
        id="chartdiv"
        style={{ width: "100%", height: "500px" }}
      ></div>
    </div>
  );
};

export default LineChart;
