import React, { useEffect } from "react";
import Slider from "@mui/material/Slider";
import { format, parseISO } from "date-fns";
import "../styles/DateSlider.css";
import { commitsByDate } from "../types";
import {
  useDateIntervallUpdate,
  useDateIntevall,
} from "../contexts/DateFilterContext";

const minDistance = 1;

function numberToDate(currentNum: number, startDateStr: string): string {
  let startDate = new Date(startDateStr);
  startDate.setDate(startDate.getDate() + currentNum);
  return format(parseISO(startDate.toISOString().slice(0, 10)), "MMM, d");
}

export default function DateSlider(props: { data: commitsByDate[] }) {
  const numDays = props.data.length;
  const setIntervall = useDateIntervallUpdate();
  const intervall = useDateIntevall();

  // Initialize the slider with correct values.
  // Updates when props.data is complete
  useEffect(() => {
    setIntervall(0, numDays - 1);
  }, [numDays]);

  const marks = [
    {
      value: 0,
      label: format(parseISO(props.data[0].date), "MMM, d"),
    },
    {
      value: numDays - 1,
      label: format(parseISO(props.data.slice(-1)[0].date), "MMM, d"),
    },
  ];

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setIntervall(
        Math.min(newValue[0], intervall[1] - minDistance),
        intervall[1]
      );
    } else {
      setIntervall(
        intervall[0],
        Math.max(newValue[1], intervall[0] + minDistance)
      );
    }
  };

  return (
    <div className="date-slider-wrapper">
      <Slider
        max={numDays - 1}
        value={intervall}
        marks={marks}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        valueLabelFormat={(num) => numberToDate(num, props.data[0].date)}
        disableSwap
        sx={{
          fontFamily: 'Montserrat',
          color: "#8884d8",
        }}
      />
    </div>
  );
}
