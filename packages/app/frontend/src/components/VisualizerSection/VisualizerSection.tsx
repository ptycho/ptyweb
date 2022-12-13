import React from 'react';
import "./VisualizerSection.css"
import {ReconstructionViewerResponse} from "../../network";
import {Visualizer} from "@ptyweb/lib";
import {VisualizerGraph} from "@ptyweb/lib";


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
