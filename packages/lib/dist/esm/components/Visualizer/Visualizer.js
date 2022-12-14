import React, { useMemo, useState } from 'react';
import { complexAbs, complexAngle } from "../../util/mathUtil";
import ndarray from "ndarray";
import { ColorMapSelector, DomainSlider, HeatmapVis, ScaleType, Selector, Separator, ToggleGroup, Toolbar } from "@h5web/lib";
import '@h5web/lib/styles.css';
// import "./Visualizer.css"
import { TitledElement } from "../TitledElement";
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
export const Visualizer = ({ data, title }) => {
    const [displayMode, setDisplayMode] = useState(VisualizerDisplayMode.ANGLE.id);
    const [customDomain, setCustomDomain] = useState([null, null]);
    const [colourMap, setColourMap] = useState("Viridis");
    const [isColourMapInverted, setColourMapInverted] = useState(false);
    const [scaleFactor, setScaleFactor] = useState(scaleFactors.m);
    const { absData, angleData } = useMemo(() => {
        const height = data.imaginary.length;
        const width = data.imaginary[0].length;
        const absDataRaw = new Array(height * width);
        const angleDataRaw = new Array(height * width);
        for (let flatIndex = 0; flatIndex < absDataRaw.length; flatIndex++) {
            const rowIndex = Math.floor(flatIndex / width);
            const columnIndex = flatIndex % width;
            const real = data.real[rowIndex][columnIndex];
            const imaginary = data.imaginary[rowIndex][columnIndex];
            absDataRaw[flatIndex] = complexAbs(real, imaginary);
            angleDataRaw[flatIndex] = complexAngle(real, imaginary);
        }
        return {
            absData: ndarray(absDataRaw, [height, width]),
            angleData: ndarray(angleDataRaw, [height, width])
        };
    }, [data]);
    const { displayedData, fullDomain } = useMemo(() => {
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
    const { xAxisValues, yAxisValues } = useMemo(() => {
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
    const heatmapDomain = useMemo(() => {
        const newDomain = [...fullDomain];
        if (customDomain[0] != null) {
            newDomain[0] = customDomain[0];
        }
        if (customDomain[1] != null) {
            newDomain[1] = customDomain[1];
        }
        return newDomain;
    }, [customDomain, fullDomain]);
    return (React.createElement("div", { className: "visualizer" },
        React.createElement(Toolbar, null,
            React.createElement(DomainSlider, { dataDomain: fullDomain, customDomain: customDomain, onCustomDomainChange: setCustomDomain, scaleType: ScaleType.Linear }),
            React.createElement(Separator, null),
            React.createElement(ColorMapSelector, { value: colourMap, onValueChange: setColourMap, invert: isColourMapInverted, onInversionChange: () => {
                    setColourMapInverted(!isColourMapInverted);
                } }),
            React.createElement(Separator, null),
            React.createElement(Selector, { value: scaleFactor.name, onChange: value => {
                    const newScaleFactor = Object.values(scaleFactors).find(factor => factor.name === value);
                    if (newScaleFactor) {
                        setScaleFactor(newScaleFactor);
                    }
                }, options: Object.values(scaleFactors).map(factor => factor.name), optionComponent: props => (React.createElement("span", null, props.option)) }),
            React.createElement(Separator, null),
            React.createElement(ToggleGroup, { role: "radiogroup", value: displayMode, onChange: setDisplayMode }, Object.values(VisualizerDisplayMode).map(({ id, name }) => (React.createElement(ToggleGroup.Btn, { label: name, value: id, key: id }))))),
        displayedData && (React.createElement(TitledElement, { title: title },
            React.createElement("div", { className: "visualizer__heatmap" },
                React.createElement(HeatmapVis, { dataArray: displayedData, domain: heatmapDomain, colorMap: colourMap, invertColorMap: isColourMapInverted, abscissaParams: xAxisValues, ordinateParams: yAxisValues }))))));
};
//# sourceMappingURL=Visualizer.js.map