import React, {useEffect, useRef, useState} from 'react';
import {ApiError, DefaultService, ReconstructionViewerResponse} from "../../network";
import Visualizer from "../Visualizer/Visualizer";
import "./VisualizerSection.css"
import VisualizerGraph from "../VisualizerGraph/VisualizerGraph";
import {debug} from "util";

const VisualizerSection = () => {
  const [status, setStatus] = useState<string | undefined>(undefined)
  const [data, setData] = useState<ReconstructionViewerResponse | undefined>(undefined)
  const dataRef = useRef(data)
  const updateDataTimeout = useRef<number | undefined>(undefined)

  const updateData = () => {
    DefaultService.getViewerData({file: new Blob()}).then((res) => {
      setStatus(undefined)
      setData(res)
      dataRef.current = res
    }).catch((err) => {
      // Check if an API error
      if (err instanceof ApiError) {
        if (err.status === 404 && err.body.detail === "The cluster job has already finished") {
          // The job has finished, just keep the data from last successful request if it exists
          debugger
          if (dataRef.current !== undefined) {
            return;
          }
        }

        setData(undefined)
        dataRef.current = undefined

        if (err.status === 403) {
          setStatus(undefined) // Hiding 403 status (form not submitted yet, so we don't have a bearer)
          return
        }

        if (err.body.detail) {
          setStatus(err.body.detail)
          return
        }

        setStatus(err.body + "")
      } else {
        setData(undefined)
        dataRef.current = undefined
        setStatus(err.message)
      }
    }).finally(() => {
      updateDataTimeout.current = window.setTimeout(updateData, 5000)
    })
  }

  useEffect(() => {
    updateData()

    return () => {
      // Cleanup
      if (updateDataTimeout.current) {
        window.clearTimeout(updateDataTimeout.current)
      }
    }
  }, [])
  return (
    <div>
      {
        status && (
          <span>{status}</span>
        )
      }

      {
        data && (
          <div className={"visualizerSection"}>
            <Visualizer data={data.object} title={"Object"}/>
            <Visualizer data={data.probe} title={"Probe"}/>
            <VisualizerGraph data={data.graph}/>
          </div>
        )
      }
    </div>
  );
};

export default VisualizerSection;
