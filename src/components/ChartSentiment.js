import React from "react";
import { Line } from "react-chartjs-2";

const ChartSentiment = ({
  dataprog,
  crypto,
  color,
  legend = true,
  stepped = false,
  fill = false,
}) => {
  const dataSentiment = {
    labels: dataprog?.publishedAt,
    datasets: [
      {
        label: "Sentiment Score",
        data: dataprog?.Polarity,
        fill: fill,
        stepped: stepped,
        backgroundColor: color === "red" ? "#4361ee" : "rgb(0,128,0,0.2)",
        borderColor: color === "red" ? "#4361ee" : "rgb(0,128,0)",
        radius: 0,
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
      <Line
        data={dataSentiment}
        options={dataSentiment.options}
        height="75"
        width="150"
      />
    </div>
  );
};

export default ChartSentiment;
