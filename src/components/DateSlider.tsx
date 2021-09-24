import * as React from "react";
import Slider from "@mui/material/Slider";
import { format, parseISO } from "date-fns";
import "../styles/DateSlider.css";
import { commitsByDate } from "../types";

const minDistance = 1;

function numberToDate(currentNum: number, startDateStr: string): string {
  let startDate = new Date(startDateStr);
  startDate.setDate(startDate.getDate() + currentNum);
  return format(parseISO(startDate.toISOString().slice(0, 10)), "MMM, d");
}

export default function DateSlider(props: { data: commitsByDate[] }) {
  const numDays = props.data.length;
  const [value1, setValue1] = React.useState<number[]>([0, numDays]);

  const marks = [
    {
      value: 0,
      label: format(parseISO(props.data[0].date), "MMM, d"),
    },
    {
      value: numDays,
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
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  return (
    <div className="date-slider-wrapper">
      <Slider
        max={numDays}
        value={value1}
        marks={marks}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        valueLabelFormat={(num) => numberToDate(num, props.data[0].date)}
        disableSwap
        sx={{
          color: "#8884d8",
        }}
      />
    </div>
  );
}
