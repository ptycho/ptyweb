import React from 'react';
import '../Configurator/Configurator.css'
import VisualizerSection from "../VisualizerSection/VisualizerSection";
import {ApiError, DefaultService, ReconstructionViewerResponse, StartScannerRequest} from "../../network";

const LiveConfigurator = () => {
  const [ip, setIp] = React.useState("127.0.0.1");
  const [port, setPort] = React.useState("5560");
  const [reconstructionData, setReconstructionData] = React.useState<ReconstructionViewerResponse | undefined>(undefined)
  const [message, setMessage] = React.useState<string | undefined>(undefined)
  const [allowSubmit, setAllowSubmit] = React.useState<boolean>(true)
  const isScanning = React.useRef<boolean>(false)
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
    setReconstructionData(undefined)

    const startScannerRequest: StartScannerRequest = {
      ip: ip,
      port: Number(port)
    }


    DefaultService
      .startScanner(startScannerRequest)
      .then((response) => {
        setMessage(undefined)
        isScanning.current = true
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
        setMessage(undefined)
        setReconstructionData(response)

        if (response.is_finished) {
          setMessage("Reconstruction finished")
          isScanning.current = false
        }
      })
      .catch((err) => {
        if (err instanceof ApiError) {
          if (err.body.detail) {
            setMessage(err.body.detail)
            return
          }

          setMessage(err.body + "")
        } else {
          setReconstructionData(undefined)
          setMessage(err.message)
        }
      })
      .finally(() => {
        if (isScanning.current) {
          fetchIntervalId.current = window.setTimeout(updateReconstructionData, 5000)
        }
      })
  }

  // Cancel the fetch timeout when the component unmounts
  React.useEffect(() => {
    return () => {
      if (fetchIntervalId.current) {
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
            value={ip}
            onInput={(e) => {
              setIp(e.currentTarget.value)
            }}/>
        </label>

        <label>
          Port
          <input
            type={"number"}
            value={port}
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
