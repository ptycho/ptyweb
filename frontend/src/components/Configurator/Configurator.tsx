import React from 'react';
import './Configurator.css'
import VisualizerSection from "../VisualizerSection/VisualizerSection";
import {DefaultService, ReconstructionViewerResponse} from "../../network";

const Configurator = () => {
  const ptyrFile = React.useRef<File | undefined>(undefined)
  const [reconstructionData, setReconstructionData] = React.useState<ReconstructionViewerResponse | undefined>(undefined)
  const [message, setMessage] = React.useState<string | undefined>(undefined)

  const onPtyrFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      ptyrFile.current = e.target.files[0]
    } else {
      ptyrFile.current = undefined
    }
  }

  const fetchReconstructionData = () => {
    if (ptyrFile.current) {
      // Getting file blob
      DefaultService.getViewerData({file: ptyrFile.current}).then((res) => {
        setReconstructionData(res)
      })
    } else {
      setMessage("Please select a file")
    }
  }

  return (
    <div>
      <div>
        <label>
          Select ptyr file
          <input type="file" accept=".ptyr" onChange={onPtyrFileChange}/>
        </label>

        <button onClick={fetchReconstructionData}>Submit</button>

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
