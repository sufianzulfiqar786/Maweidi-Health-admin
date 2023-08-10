import React, { useState } from "react";
import { Switch, TimePicker, Button } from "antd";
import moment from "moment";

const PharmacyTimings = ({ addTimePostReq, setaddTimePostReq }) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [toggleStates, setToggleStates] = useState(
    daysOfWeek.map((day) => ({
      day,
      toggle: false,
      openingTime: null,
      closingTime: null,
    }))
  );

  const handleToggle = (day) => {
    const updatedStates = toggleStates.map((item) =>
      item.day === day ? { ...item, toggle: !item.toggle } : item
    );
    setToggleStates(updatedStates);

    const updatedSchedules = updatedStates.map((item) => {
      console.log("itemmm", item.toggle);
      return {
        day: daysOfWeek.indexOf(item.day) + 1,
        time_slots: item.toggle
          ? [
              {
                start_time: item.openingTime || "",
                end_time: item.closingTime || "",
              },
            ]
          : [],
      };
    });

    setaddTimePostReq((prev) => ({ ...prev, schedules: updatedSchedules }));
  };

  const handleOpeningTimeChange = (day, time) => {
    const updatedStates = toggleStates.map((item) =>
      item.day === day
        ? { ...item, openingTime: time ? time.format("HH:mm") : null }
        : item
    );
    console.log("asDSAD", time);
    setToggleStates(updatedStates);
  };

  const handleClosingTimeChange = (day, time) => {
    const updatedStates = toggleStates.map((item) =>
      item.day === day
        ? { ...item, closingTime: time ? time.format("HH:mm") : null }
        : item
    );
    setToggleStates(updatedStates);
  };

  return (
    <div>
      {toggleStates.map(({ day, toggle, openingTime, closingTime }) => (
        <div
          key={day}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span
            style={{
              width: "100px",
              display: "inline-block",
              marginRight: "10px",
            }}
          >
            {day}
          </span>
          <Switch
            checked={toggle}
            onChange={() => handleToggle(day)}
            style={{ marginLeft: "20px", marginTop: "10px" }}
          />
          {toggle && (
            <div style={{ marginLeft: "38px", marginTop: "10px" }}>
              <TimePicker
                value={openingTime ? moment(openingTime, "HH:mm") : null}
                onChange={(time) => handleOpeningTimeChange(day, time)}
                format="HH:mm"
                placeholder="Opening Time"
                style={{ marginRight: "10px" }}
              />
              <TimePicker
                value={closingTime ? moment(closingTime, "HH:mm") : null}
                onChange={(time) => handleClosingTimeChange(day, time)}
                format="HH:mm"
                placeholder="Closing Time"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PharmacyTimings;
