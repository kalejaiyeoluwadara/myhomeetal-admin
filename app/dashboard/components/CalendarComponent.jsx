import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarCustom.css"; // Import your custom CSS file

const CalendarComponent = ({ cal, setCal, date, setDate }) => {
  const close = () => {
    setCal(false);
  };
  return (
    <>
      {cal && (
        <div className="absolute right-8 top-20 z-40 bg-white text-black p-4 rounded-lg shadow-lg">
          <Calendar onChange={setDate} value={date} />
          <div className="flex justify-between mt-4">
            <button
              onClick={close}
              className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={close}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarComponent;
