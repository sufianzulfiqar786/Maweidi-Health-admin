import React, { useState, useEffect } from "react";

import TimeChangerUpArrow from "../../assets/images/doctor/TimeChangerUpArrow.svg";
import TimeChangerDownArrow from "../../assets/images/doctor/TimeChangerDownArrow.svg";

function TimeInput({ currentDate, Time, dayId, staringTimeDrop, endTimeDrop, selector }) {

  const [time, setTime] = useState("01:00"); // Set the initial time value

  const [time1, setTime1] = useState("00:00"); // Set the initial time value

  const increment = () => {
    // Increment the time value by 1 minute
    // Convert the time to minutes and add 1, then convert back to time format
    let [hours, minutes] = time.split(":");
    minutes = parseInt(minutes);
    if (minutes < 59) {
      minutes += 1;
    } else {
      minutes = 0;
      if (hours < 23) {
        hours += 1;
      } else {
        hours = 0;
      }
    }
    setTime(
      `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`
    );
    selector ? staringTimeDrop(time, dayId) : endTimeDrop(time, dayId)

  };

  const decrement = () => {
    // Decrement the time value by 1 minute
    // Convert the time to minutes and subtract 1, then convert back to time format
    let [hours, minutes] = time.split(":");
    minutes = parseInt(minutes);
    if (minutes > 0) {
      minutes -= 1;
    } else {
      minutes = 59;
      if (hours > 0) {
        hours -= 1;
      } else {
        hours = 23;
      }
    }
    setTime(
      `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`
    );
  };
  const setTimeOnChange = (value) => {
    setTime(value.target.value)

    selector ? staringTimeDrop(value.target.value, dayId) : endTimeDrop(value.target.value, dayId)
  }

  return (
    <>
      <div className="d-inline-flex time-picker py-1 px-2 ">
        <input
          type="time"
          value={Time ?? time}
          onChange={(e) => {
            setTimeOnChange(e)
          }}
          min="00:00"
          max="23:59"
          step="60"
          className="pl-1"
        />

        <div className="pl-4 d-flex justify-content-center flex-column d-none" >
          <img
            className="d-block pl-2 pr-1 pb-1 cursor-pointer"
            onClick={increment}
            src={TimeChangerUpArrow}
            alt=""
          />
          <img
            className="d-block pl-2 pr-1 cursor-pointer"
            onClick={decrement}
            src={TimeChangerDownArrow}
            alt=""
          />
        </div>

      </div>
    </>
  );
}

export default TimeInput;
