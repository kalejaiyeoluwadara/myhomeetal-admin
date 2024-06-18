"use client";

import React from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend
);

const Charts = () => {
  const options = {
    plugins: {
      legend: {
        align: "end", // Align labels to the extreme right
        position: "top",
        // Position labels at the top
        labels: {
          usePointStyle: true, // Use point style
          pointStyle: "circle", // Make the legend points circular
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
      },
      y: {
        grid: {
          borderDash: [5, 5], // Make horizontal grid lines dashed
          drawBorder: false, // Do not draw border
        },
      },
    },
  };
  const pieOptions = {
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };
  const lineData = {
    labels: Array.from({ length: 12 }, (_, i) => i + 1),
    datasets: [
      {
        label: "Last month",
        data: [300, 500, 400, 600, 700, 500, 800, 700, 600, 500, 400, 300],
        borderColor: "rgb(255, 101, 103)",
        backgroundColor: "rgb(255, 101, 103)",
      },
      {
        label: "Current month",

        data: [200, 400, 300, 500, 600, 400, 700, 600, 500, 400, 300, 200],
        borderColor: "rgb(22, 113, 217)",
        backgroundColor: "rgb(22, 113, 217)",
      },
    ],
  };

  const pieData = {
    labels: [
      "Category 1",
      "Category 2",
      "Category 3",
      "Category 4",
      "Category 5",
    ],
    datasets: [
      {
        label: "Categories",
        data: [10, 20, 30, 20, 20],
        backgroundColor: [
          "rgb(237, 34, 36 )",
          "rgb(255, 101, 103 )",
          "rgb(255, 147, 158 )",
          "rgb(255, 197, 198 )",
          "rgb(255, 241, 241 )",
        ],
        borderColor: null,
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="border col-span-2 h-[400px] p-4 rounded-xl">
        <h2 className="text-lg font-semibold mb-2">Monthly Revenue</h2>
        <hr className="my-4" />
        <Line data={lineData} options={options} />
      </div>
      <div className="border relative h-[400px] rounded-xl p-4">
        <h2 className="text-lg mb-[47px] font-semibold ">Categories</h2>
        <hr className="absolute w-full top-[55px] left-0  " />
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  );
};

export default Charts;
