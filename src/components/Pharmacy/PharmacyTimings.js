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

    setaddTimePostReq((prev) => ({
      ...prev,
      schedules: updatedSchedules,
    }));
  };

  const handleOpeningTimeChange = (day, time) => {
    const updatedStates = toggleStates.map((item) =>
      item.day === day
        ? { ...item, openingTime: time ? time.format("HH:mm") : null }
        : item
    );
    setToggleStates(updatedStates);

    setaddTimePostReq((prev) => ({
      ...prev,
      schedules: prev.schedules.map((schedule) =>
        schedule.day === daysOfWeek.indexOf(day) + 1
          ? {
              ...schedule,
              time_slots: [
                {
                  start_time: time ? time.format("HH:mm") : "",
                  end_time: schedule.time_slots[0]?.end_time || "",
                },
              ],
            }
          : schedule
      ),
    }));
  };

  const handleClosingTimeChange = (day, time) => {
    const updatedStates = toggleStates.map((item) =>
      item.day === day
        ? { ...item, closingTime: time ? time.format("HH:mm") : null }
        : item
    );
    setToggleStates(updatedStates);

    setaddTimePostReq((prev) => ({
      ...prev,
      schedules: prev.schedules.map((schedule) =>
        schedule.day === daysOfWeek.indexOf(day) + 1
          ? {
              ...schedule,
              time_slots: [
                {
                  start_time: schedule.time_slots[0]?.start_time || "",
                  end_time: time ? time.format("HH:mm") : "",
                },
              ],
            }
          : schedule
      ),
    }));
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
            <div className="pharmacy-schedule d-flex" style={{ marginLeft: "38px", marginTop: "10px" }}>
              <div className="border  w-100 " style={{borderRadius:'5px'}}>
              <TimePicker
                value={openingTime ? moment(openingTime, "HH:mm") : null}
                onChange={(time) => handleOpeningTimeChange(day, time)}
                format="HH:mm"
                placeholder="Opening Time"
                style={{ border:'none' }}
              />
              </div>
              <div className="border w-100 ml-2" style={{borderRadius:'5px'}}>
              <TimePicker
              style={{ border:'none'}}
                value={closingTime ? moment(closingTime, "HH:mm") : null}
                onChange={(time) => handleClosingTimeChange(day, time)}
                format="HH:mm"
                placeholder="Closing Time"
              />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PharmacyTimings;
