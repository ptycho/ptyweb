import React from 'react';
import './Configurator.css'
import VisualizerSection from "../VisualizerSection/VisualizerSection";
import {DefaultService, ReconstructionViewerResponse} from "../../network";

const Configurator = () => {
  const [reconstructionData, setReconstructionData] = React.useState<ReconstructionViewerResponse | undefined>(undefined)
  const [message, setMessage] = React.useState<string | undefined>(undefined)
  const [allowSubmit, setAllowSubmit] = React.useState<boolean>(true)

  const onPtyrFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMessage("Loading file...")
      setAllowSubmit(false)
      setReconstructionData(undefined)
      DefaultService.getViewerDataFromFile({file: e.target.files[0]}).then((res) => {
        setReconstructionData(res)
        setMessage(undefined)
      }).catch(e => {
        setMessage("Error: " + e.message)
      }).finally(() => {
        setAllowSubmit(true)
      })
    }
  }

  return (
    <div>
      <div className={"configurator"}>
        {
          allowSubmit && (
            <label>
              Select ptyr file
              <input type="file" accept=".ptyr" onChange={onPtyrFileChange}/>
            </label>
          )
        }

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

export default Configurator;
