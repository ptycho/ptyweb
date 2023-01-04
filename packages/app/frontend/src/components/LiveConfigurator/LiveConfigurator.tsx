import React from 'react';
import '../Configurator/Configurator.css'
import VisualizerSection from "../VisualizerSection/VisualizerSection";
import {ReconstructionViewerResponse} from "../../network";

const LiveConfigurator = () => {
  const [reconstructionData, setReconstructionData] = React.useState<ReconstructionViewerResponse | undefined>(undefined)
  const [message, setMessage] = React.useState<string | undefined>(undefined)
  const [allowSubmit, setAllowSubmit] = React.useState<boolean>(true)

  return (
    <div>
      <div className={"configurator"}>
        <label>
          IP
          <input type={"text"}/>
        </label>

        <label>
          Port
          <input type={"text"}/>
        </label>

        <button type={"submit"}>Connect</button>

        {message && <span>{message}</span>}
      </div>

      {
        reconstructionData && (
          <VisualizerSection data={reconstructionData}/>
        )
      }
    </div>
  );
};

export default LiveConfigurator;
