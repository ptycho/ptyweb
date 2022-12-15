import React from 'react';
import './Configurator.css'
import VisualizerSection from "../VisualizerSection/VisualizerSection";
import {DefaultService, ReconstructionViewerResponse} from "../../network";

const Configurator = () => {
  const ptyrFile = React.useRef<File | undefined>(undefined)
  const [reconstructionData, setReconstructionData] = React.useState<ReconstructionViewerResponse | undefined>(undefined)
  const [message, setMessage] = React.useState<string | undefined>(undefined)
  const [allowSubmit, setAllowSubmit] = React.useState<boolean>(false)

  const onPtyrFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      ptyrFile.current = e.target.files[0]
      setAllowSubmit(true)
    } else {
      ptyrFile.current = undefined
      setAllowSubmit(false)
    }
  }

  const fetchReconstructionData = () => {
    if (ptyrFile.current) {
      // Getting file blob
      setMessage("Submitting file...")
      setAllowSubmit(false)
      DefaultService.getViewerData({file: ptyrFile.current}).then((res) => {
        setReconstructionData(res)
        setMessage(undefined)
      }).finally(() => {
        setAllowSubmit(true)
      })
    } else {
      setMessage("Please select a file")
      setAllowSubmit(false)
    }
  }

  return (
    <div>
      <div className={"configurator"}>
        <label>
          Select ptyr file
          <input type="file" accept=".ptyr" onChange={onPtyrFileChange}/>
        </label>

        <button onClick={fetchReconstructionData} disabled={!allowSubmit}>Submit</button>

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
