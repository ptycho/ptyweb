"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualizerGraph = void 0;
const react_1 = __importStar(require("react"));
const chart_js_1 = require("chart.js");
const react_chartjs_2_1 = require("react-chartjs-2");
const TitledElement_1 = require("../TitledElement");
chart_js_1.Chart.register(chart_js_1.CategoryScale, chart_js_1.LinearScale, chart_js_1.PointElement, chart_js_1.LineElement, chart_js_1.Tooltip, chart_js_1.Legend, chart_js_1.Title);
const VisualizerGraph = ({ data: graphData }) => {
    const graphFormattedData = (0, react_1.useMemo)(() => {
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
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(TitledElement_1.TitledElement, { title: "Error graph" },
            react_1.default.createElement(react_chartjs_2_1.Line, { data: graphFormattedData, options: graphOptions, width: 700, height: 500 }))));
};
exports.VisualizerGraph = VisualizerGraph;
//# sourceMappingURL=VisualizerGraph.js.map