import React, { useMemo } from 'react';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TitledElement } from "../TitledElement";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title);
export const VisualizerGraph = ({ data: graphData }) => {
    const graphFormattedData = useMemo(() => {
        return {
            labels: graphData.iteration_numbers,
            datasets: [
                {
                    label: 'err_fmag',
                    data: graphData.fmag,
                    borderColor: '#9b59b6'
                },
                {
                    label: 'err_phot',
                    data: graphData.phot,
                    borderColor: '#2ecc71'
                },
                {
                    label: 'err_exit',
                    data: graphData.ex,
                    borderColor: '#e67e22'
                }
            ]
        };
    }, [graphData]);
    const graphOptions = {
        hover: {
            mode: "nearest",
            intersect: true
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Iteration'
                }
            },
            y: {
                max: 1,
                min: 0,
                title: {
                    display: true,
                    text: 'Error Metric'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: "right"
            },
            // title: {
            //   display: true,
            //   text: "Error graph",
            //   font: {
            //     family: '"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
            //     weight: "normal",
            //     size: 18
            //   },
            //   color: "#00000"
            // }
        },
        responsive: false,
        maintainAspectRatio: false
    };
    return (React.createElement("div", null,
        React.createElement(TitledElement, { title: "Error graph" },
            React.createElement(Line, { data: graphFormattedData, options: graphOptions, width: 700, height: 500 }))));
};
//# sourceMappingURL=VisualizerGraph.js.map