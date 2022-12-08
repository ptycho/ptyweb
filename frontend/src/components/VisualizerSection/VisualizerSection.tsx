import React from 'react';
import Visualizer from "../Visualizer/Visualizer";
import "./VisualizerSection.css"
import VisualizerGraph from "../VisualizerGraph/VisualizerGraph";
import {ReconstructionViewerResponse} from "../../network";

interface Props {
  data: ReconstructionViewerResponse
}

const VisualizerSection = ({data}: Props) => {
  return (
    <div className={"visualizerSection"}>
        <Visualizer data={data.object} title={"Object"}/>
        <Visualizer data={data.probe} title={"Probe"}/>
        <VisualizerGraph data={data.graph}/>
    </div>
  );
};

export default VisualizerSection;
