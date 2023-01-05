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
  const [isScanning, setIsScanning] = React.useState<boolean>(false)
  const fetchIntervalId = React.useRef<number | undefined>(undefined)

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
        setIsScanning(true)
        updateReconstructionData();
      })
      .catch((error) => {
        setMessage(error.message)
      })
      .finally(() => {
        setAllowSubmit(true)
      })
  }

  const updateReconstructionData = () => {
    DefaultService
      .getViewerDataFromLive()
      .then((response) => {
        setReconstructionData(response)
      })
      .catch((error) => {
        setMessage(error.message)
      })
      .finally(() => {
        fetchIntervalId.current = window.setTimeout(updateReconstructionData, 5000)
        console.log(fetchIntervalId.current)
      })
  }

  // Cancel the fetch timeout when the component unmounts
  React.useEffect(() => {
    return () => {
      if (fetchIntervalId.current) {
        console.log("Clearing interval")
        window.clearTimeout(fetchIntervalId.current)
      }
    }
  }, [])

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
