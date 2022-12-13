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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visualizer = void 0;
const react_1 = __importStar(require("react"));
const mathUtil_1 = require("../../util/mathUtil");
const ndarray_1 = __importDefault(require("ndarray"));
const lib_1 = require("@h5web/lib");
require("@h5web/lib/styles.css");
require("./Visualizer.css");
const TitledElement_1 = require("../TitledElement");
const VisualizerDisplayMode = {
    ANGLE: {
        id: "ANGLE",
        name: "Angle"
    },
    ABS: {
        id: "ABS",
        name: "Abs"
    },
    COMBINED: {
        id: "COMBINED",
        name: "Combined"
    },
};
const scaleFactors = {
    m: {
        name: "m",
        scale: 1
    },
    mm: {
        name: "mm",
        scale: 1000
    },
    micro_m: {
        name: "μm",
        scale: 1e6
    },
    nm: {
        name: "nm",
        scale: 1e9
    }
};
const Visualizer = ({ data, title }) => {
    const [displayMode, setDisplayMode] = (0, react_1.useState)(VisualizerDisplayMode.ANGLE.id);
    const [customDomain, setCustomDomain] = (0, react_1.useState)([null, null]);
    const [colourMap, setColourMap] = (0, react_1.useState)("Viridis");
    const [isColourMapInverted, setColourMapInverted] = (0, react_1.useState)(false);
    const [scaleFactor, setScaleFactor] = (0, react_1.useState)(scaleFactors.m);
    const { absData, angleData } = (0, react_1.useMemo)(() => {
        const height = data.imaginary.length;
        const width = data.imaginary[0].length;
        const absDataRaw = new Array(height * width);
        const angleDataRaw = new Array(height * width);
        for (let flatIndex = 0; flatIndex < absDataRaw.length; flatIndex++) {
            const rowIndex = Math.floor(flatIndex / width);
            const columnIndex = flatIndex % width;
            const real = data.real[rowIndex][columnIndex];
            const imaginary = data.imaginary[rowIndex][columnIndex];
            absDataRaw[flatIndex] = (0, mathUtil_1.complexAbs)(real, imaginary);
            angleDataRaw[flatIndex] = (0, mathUtil_1.complexAngle)(real, imaginary);
        }
        return {
            absData: (0, ndarray_1.default)(absDataRaw, [height, width]),
            angleData: (0, ndarray_1.default)(angleDataRaw, [height, width])
        };
    }, [data]);
    const { displayedData, fullDomain } = (0, react_1.useMemo)(() => {
        let displayData;
        switch (displayMode) {
            case VisualizerDisplayMode.ABS.id:
                displayData = absData;
                break;
            case VisualizerDisplayMode.ANGLE.id:
                displayData = angleData;
                break;
            case VisualizerDisplayMode.COMBINED.id:
                alert("No implemented yet!");
                throw `Renderer for visualizer display mode ${displayMode} is not implemented`;
            default:
                throw `Renderer for visualizer display mode ${displayMode} is not implemented`;
        }
        let _min = null;
        let _max = null;
        for (let dataPoint of displayData.data) {
            if (_min === null || dataPoint < _min) {
                _min = dataPoint;
            }
            if (_max === null || dataPoint > _max) {
                _max = dataPoint;
            }
        }
        const newFullDomain = [0, 0];
        if (_min) {
            newFullDomain[0] = _min;
        }
        if (_max) {
            newFullDomain[1] = _max;
        }
        return {
            displayedData: displayData,
            fullDomain: newFullDomain
        };
    }, [absData, angleData, displayMode]);
    const { xAxisValues, yAxisValues } = (0, react_1.useMemo)(() => {
        const width = data.imaginary[0].length;
        const halfWidth = width / 2;
        const height = data.imaginary.length;
        const halfHeight = height / 2;
        const calculateAxisValue = (index, halfLength) => data.pixel_size * (index - halfLength) * scaleFactor.scale;
        return {
            xAxisValues: {
                label: `X (${scaleFactor.name})`,
                value: Array(width).fill(0).map((_, index) => calculateAxisValue(index, halfWidth))
            },
            yAxisValues: {
                label: `Y (${scaleFactor.name})`,
                value: Array(height).fill(0).map((_, index) => calculateAxisValue(index, halfHeight))
            }
        };
    }, [data, scaleFactor]);
    const heatmapDomain = (0, react_1.useMemo)(() => {
        const newDomain = [...fullDomain];
        if (customDomain[0] != null) {
            newDomain[0] = customDomain[0];
        }
        if (customDomain[1] != null) {
            newDomain[1] = customDomain[1];
        }
        return newDomain;
    }, [customDomain, fullDomain]);
    return (react_1.default.createElement("div", { className: "visualizer" },
        react_1.default.createElement(lib_1.Toolbar, null,
            react_1.default.createElement(lib_1.DomainSlider, { dataDomain: fullDomain, customDomain: customDomain, onCustomDomainChange: setCustomDomain, scaleType: lib_1.ScaleType.Linear }),
            react_1.default.createElement(lib_1.Separator, null),
            react_1.default.createElement(lib_1.ColorMapSelector, { value: colourMap, onValueChange: setColourMap, invert: isColourMapInverted, onInversionChange: () => {
                    setColourMapInverted(!isColourMapInverted);
                } }),
            react_1.default.createElement(lib_1.Separator, null),
            react_1.default.createElement(lib_1.Selector, { value: scaleFactor.name, onChange: value => {
                    const newScaleFactor = Object.values(scaleFactors).find(factor => factor.name === value);
                    if (newScaleFactor) {
                        setScaleFactor(newScaleFactor);
                    }
                }, options: Object.values(scaleFactors).map(factor => factor.name), optionComponent: props => (react_1.default.createElement("span", null, props.option)) }),
            react_1.default.createElement(lib_1.Separator, null),
            react_1.default.createElement(lib_1.ToggleGroup, { role: "radiogroup", value: displayMode, onChange: setDisplayMode }, Object.values(VisualizerDisplayMode).map(({ id, name }) => (react_1.default.createElement(lib_1.ToggleGroup.Btn, { label: name, value: id, key: id }))))),
        displayedData && (react_1.default.createElement(TitledElement_1.TitledElement, { title: title },
            react_1.default.createElement("div", { className: "visualizer__heatmap" },
                react_1.default.createElement(lib_1.HeatmapVis, { dataArray: displayedData, domain: heatmapDomain, colorMap: colourMap, invertColorMap: isColourMapInverted, abscissaParams: xAxisValues, ordinateParams: yAxisValues }))))));
};
exports.Visualizer = Visualizer;
//# sourceMappingURL=Visualizer.js.map