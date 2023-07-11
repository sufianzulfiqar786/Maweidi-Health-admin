import React, { useState } from "react";
import "../../assets/css/datepicker.scss";

const DatePicker = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());

  const handleMonthChange = (event) => {
    const month = parseInt(event.target.value);
    setSelectedMonth(month);
    setSelectedDate(new Date(selectedYear, month, 1));
  };

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
    setSelectedDate(new Date(year, selectedMonth, 1));
  };

  const handleDateClick = (day) => {
    const date = new Date(selectedYear, selectedMonth, day);
    setSelectedDate(date);
    onDateChange(date); // Call the parent function with the selected date
  };

  const getDaysInMonth = () => {
    return new Date(selectedYear, selectedMonth + 1, 0).getDate();
  };

  const getDaysOfWeek = () => {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  };

  const renderMonthSelect = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return (
      <select value={selectedMonth} onChange={handleMonthChange}>
        {monthNames.map((monthName, index) => {
          return (
            <option key={index} value={index}>
              {monthName}
            </option>
          );
        })}
      </select>
    );
  };

  const renderYearSelect = () => {
    const years = [];
    for (let i = 1900; i <= 2100; i++) {
      years.push(i);
    }
    return (
      <select value={selectedYear} onChange={handleYearChange}>
        {years.map((year, index) => {
          return (
            <option key={index} value={year}>
              {year}
            </option>
          );
        })}
      </select>
    );
  };

  const renderDaysOfWeek = () => {
    const daysOfWeek = getDaysOfWeek();
    return (
      <div className="days-of-week">
        {daysOfWeek.map((dayOfWeek, index) => {
          return (
            <div key={index} className="day">
              {dayOfWeek}
            </div>
          );
        })}
      </div>
    );
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
    const daysBeforeMonthStart = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysBeforeMonthStart.push("");
    }
    return (
      <div className="days">
        {daysBeforeMonthStart.map((day, index) => {
          return <div key={index} className="day empty"></div>;
        })}
        {days.map((day, index) => {
          const isActive = day === selectedDate.getDate();
          return (
            <div
              key={index}
              className={`day ${isActive ? "active" : ""}`}
              onClick={() => handleDateClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="date-picker">
      <div className="header">
        {renderMonthSelect()}
        {renderYearSelect()}
      </div>
      {renderDaysOfWeek()}
      {renderDays()}
    </div>
  );
};

export default DatePicker;
