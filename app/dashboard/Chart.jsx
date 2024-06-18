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
        labels: {
          usePointStyle: true, // Use point style
          pointStyle: "circle", // Make the legend points circular
        },
      },
    },
  };

  const lineData = {
    labels: Array.from({ length: 12 }, (_, i) => i + 1),
    datasets: [
      {
        label: "Last month",
        data: [300, 500, 400, 600, 700, 500, 800, 700, 600, 500, 400, 300],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Current month",
        data: [200, 400, 300, 500, 600, 400, 700, 600, 500, 400, 300, 200],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
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
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-3  gap-4 p-4">
      <div className="border col-span-2 h-[329px] p-4 rounded-xl">
        <h2 className="text-lg font-semibold mb-2">Monthly Revenue</h2>
        <hr className="my-4" />
        <Line data={lineData} options={options} />
      </div>
      <div className="border p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Categories</h2>
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default Charts;
