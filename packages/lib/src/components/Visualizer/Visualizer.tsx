import React, {useMemo, useState} from 'react';
import {complexAbs, complexAngle} from "../../util/mathUtil";
import ndarray from "ndarray"
import {
  AxisParams,
  ColorMap,
  ColorMapSelector,
  CustomDomain,
  Domain,
  DomainSlider,
  HeatmapVis,
  ScaleType, Selector,
  Separator,
  ToggleGroup,
  Toolbar
} from "@h5web/lib";
import '@h5web/lib/styles.css';
import {ScanData} from "../../types/models/ScanData"
// import "./Visualizer.css"
import {TitledElement} from "../TitledElement";


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
}

export interface VisualizerProps {
  data: ScanData
  title: string
}

type scaleFactor = {
  name: string
  scale: number
}

type scaleFactorsType = {
  m: scaleFactor
  mm: scaleFactor
  micro_m: scaleFactor
  nm: scaleFactor
}

const scaleFactors: scaleFactorsType = {
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
}

export const Visualizer = ({data, title}: VisualizerProps) => {
  const [displayMode, setDisplayMode] = useState<string>(VisualizerDisplayMode.ANGLE.id)
  const [customDomain, setCustomDomain] = useState<CustomDomain>([null, null]);
  const [colourMap, setColourMap] = useState<ColorMap>("Viridis")
  const [isColourMapInverted, setColourMapInverted] = useState<boolean>(false)
  const [scaleFactor, setScaleFactor] = useState<scaleFactor>(scaleFactors.m)

  interface dataChangeInterface {
    absData: ndarray.NdArray<number[]>,
    angleData: ndarray.NdArray<number[]>
  }

  interface displayedDataInterface {
    displayedData: ndarray.NdArray<number[]>,
    fullDomain: Domain
  }

  interface multipleAxisValues {
    xAxisValues: AxisParams
    yAxisValues: AxisParams
  }

  const {absData, angleData} = useMemo<dataChangeInterface>(() => {
    const height = data.imaginary.length
    const width = data.imaginary[0].length
    const absDataRaw = new Array(height * width)
    const angleDataRaw = new Array(height * width)

    for (let flatIndex = 0; flatIndex < absDataRaw.length; flatIndex++) {
      const rowIndex = Math.floor(flatIndex / width)
      const columnIndex = flatIndex % width
      const real = data.real[rowIndex][columnIndex]
      const imaginary = data.imaginary[rowIndex][columnIndex]
      
      let abs = complexAbs(real, imaginary)
      let angle = complexAngle(real, imaginary)
      
      // Filter out NaN values
      if (isNaN(abs)) {
        abs = 0
      }
      
      if (isNaN(angle)) {
        angle = 0
      }

      absDataRaw[flatIndex] = abs
      angleDataRaw[flatIndex] = angle
    }

    return {
      absData: ndarray(absDataRaw, [height, width]),
      angleData: ndarray(angleDataRaw, [height, width])
    }
  }, [data])

  const {displayedData, fullDomain} = useMemo<displayedDataInterface>(() => {
    let displayData: ndarray.NdArray<number[]>
    switch (displayMode) {
      case VisualizerDisplayMode.ABS.id:
        displayData = absData
        break
      case VisualizerDisplayMode.ANGLE.id:
        displayData = angleData
        break
      case VisualizerDisplayMode.COMBINED.id:
        // TODO implement combined display mode
        throw `Renderer for visualizer display mode ${displayMode} is not implemented`
      default:
        throw `Renderer for visualizer display mode ${displayMode} is not implemented`
    }

    let _min: number | null = null
    let _max: number | null = null

    for (let dataPoint of displayData.data) {
      if (_min === null || dataPoint < _min) {
        _min = dataPoint
      }

      if (_max === null || dataPoint > _max) {
        _max = dataPoint
      }
    }

    const newFullDomain: Domain = [0, 0]
    if (_min) {
      newFullDomain[0] = _min
    }

    if (_max) {
      newFullDomain[1] = _max
    }

    return {
      displayedData: displayData,
      fullDomain: newFullDomain
    }
  }, [absData, angleData, displayMode]);

  const {xAxisValues, yAxisValues} = useMemo<multipleAxisValues>(() => {
    const width = data.imaginary[0].length
    const halfWidth = width / 2
    const height = data.imaginary.length
    const halfHeight = height / 2

    const calculateAxisValue = (index: number, halfLength: number) => data.pixel_size * (index - halfLength) * scaleFactor.scale

    return {
      xAxisValues: {
        label: `X (${scaleFactor.name})`,
        value: Array(width).fill(0).map((_, index) => calculateAxisValue(index, halfWidth))
      },
      yAxisValues: {
        label: `Y (${scaleFactor.name})`,
        value: Array(height).fill(0).map((_, index) => calculateAxisValue(index, halfHeight))
      }
    }
  }, [data, scaleFactor])

  const heatmapDomain: Domain = useMemo(() => {
    const newDomain: Domain = [...fullDomain]

    if (customDomain[0] != null) {
      newDomain[0] = customDomain[0]
    }

    if (customDomain[1] != null) {
      newDomain[1] = customDomain[1]
    }

    return newDomain
  }, [customDomain, fullDomain])


  return (
    <div className={"visualizer"}>
      <Toolbar>
        <DomainSlider
          dataDomain={fullDomain}
          customDomain={customDomain}
          onCustomDomainChange={setCustomDomain}
          scaleType={ScaleType.Linear}
        />

        <Separator/>

        <ToggleGroup
          role="radiogroup"
          value={displayMode}
          onChange={(newDisplayMode) => {
            if (newDisplayMode === VisualizerDisplayMode.COMBINED.id) {
              alert("Combined mode is not implemented yet");
              return;
            }

            setDisplayMode(newDisplayMode);
          }}
        >
          {
            Object.values(VisualizerDisplayMode).map(({id, name}) => (
              <ToggleGroup.Btn label={name} value={id} key={id}/>
            ))
          }
        </ToggleGroup>

        <Separator/>

        <ColorMapSelector
          value={colourMap}
          onValueChange={setColourMap}
          invert={isColourMapInverted}
          onInversionChange={() => {
            setColourMapInverted(!isColourMapInverted)
          }}
        />

        <Separator/>

        <Selector
          value={scaleFactor.name}
          onChange={value => {
            const newScaleFactor = Object.values(scaleFactors).find(factor => factor.name === value)
            if (newScaleFactor) {
              setScaleFactor(newScaleFactor)
            }
          }}
          options={Object.values(scaleFactors).map(factor => factor.name)}
          optionComponent={props => (<span>{props.option}</span>)}
        />
      </Toolbar>

      {
        displayedData && (
          <TitledElement title={title}>
            <div className={"visualizer__heatmap"}>
              <HeatmapVis
                dataArray={displayedData}
                domain={heatmapDomain}
                colorMap={colourMap}
                invertColorMap={isColourMapInverted}
                abscissaParams={xAxisValues}
                ordinateParams={yAxisValues}
              />
            </div>
          </TitledElement>
        )
      }
    </div>
  );
};
