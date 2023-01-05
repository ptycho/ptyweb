import React from 'react';
import '../Configurator/Configurator.css'
import VisualizerSection from "../VisualizerSection/VisualizerSection";
import {DefaultService, ReconstructionViewerResponse, StartScannerRequest} from "../../network";

const LiveConfigurator = () => {
  const [ip, setIp] = React.useState("");
  const [port, setPort] = React.useState("");
  const [reconstructionData, setReconstructionData] = React.useState<ReconstructionViewerResponse | undefined>(undefined)
  const [message, setMessage] = React.useState<string | undefined>(undefined)
  const [allowSubmit, setAllowSubmit] = React.useState<boolean>(true)

  const startScanner = () => {
    if (!allowSubmit) {
      return
    }

    setAllowSubmit(false)

    if (ip === "" || port === "") {
      setMessage("Please fill in all fields")
      setAllowSubmit(true)
      return
    }

    if (isNaN(Number(port))) {
      setMessage("Port must be a number")
      setAllowSubmit(true)
      return
    }

    setMessage("Starting scanner...")

    const startScannerRequest: StartScannerRequest = {
      ip: ip,
      port: Number(port)
    }


    DefaultService
      .startScanner(startScannerRequest)
      .then((response) => {
        setMessage(undefined)
      })
      .catch((error) => {
        setMessage(error.message)
      })
      .finally(() => {
        setAllowSubmit(true)
      })
  }

  return (
    <div>
      <div className={"configurator"}>
        <label>
          IP
          <input
            type={"text"}
            onInput={(e) => {
              setIp(e.currentTarget.value)
            }}/>
        </label>

        <label>
          Port
          <input
            type={"number"}
            onInput={(e) => {
              setPort(e.currentTarget.value)
            }}/>
        </label>

        <button type={"submit"} onClick={startScanner} disabled={!allowSubmit}>Connect</button>

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
