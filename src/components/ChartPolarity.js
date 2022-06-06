import React from "react";
import { Bar, Doughnut, Pie } from "react-chartjs-2";

const ChartPolarity = ({ dataprog, legend = false }) => {
  const countOccurrences = (arr, val) =>
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  const dataPolarity = {
    labels: ["Positive", "Neutral", "Negative"],

    datasets: [
      {
        data: [
          countOccurrences(dataprog, "Positive"),
          countOccurrences(dataprog, "Neutral"),
          countOccurrences(dataprog, "Negative"),
        ],
        backgroundColor: [
          "rgba(59, 255, 72, 0.2)",
          "rgba(55, 62, 255, 0.2)",
          "rgba(255, 55, 66, 0.2)",
        ],
        borderColor: [
          "rgba(59, 255, 72, 0.2)",
          "rgba(55, 62, 255, 0.2)",
          "rgba(255, 55, 66, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
    options: {
      interaction: {
        intersect: false,
      },
      plugins: {
        legend: legend,
      },
      radius: "50%",
      scales: {
        x: {
          display: false,
        },

        y: {
          display: legend,
        },
      },
    },
  };

  return (
    <div className="chart">
      <Pie data={dataPolarity} options={dataPolarity.options} />
    </div>
  );
};

export default ChartPolarity;
