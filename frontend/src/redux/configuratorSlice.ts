import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ConfiguratorState {
  configFilePath: string
  scanId: string
  beamline?: string
  cluster?: string
  gpuHardware?: string
  numberOfProcessors?: number
  useGpu?: boolean
  outputFolderPath: string
}

const initialState: ConfiguratorState = {
  configFilePath: "",
  scanId: "",
  outputFolderPath: ""
}

export const configuratorSlice = createSlice({
  name: 'configurator',
  initialState,
  reducers: {
    setConfigFilePath: (state, action: PayloadAction<string>) => {
      state.configFilePath = action.payload
    },
    setScanId: (state, action: PayloadAction<string>) => {
      state.scanId = action.payload
    },
    setBeamline: (state, action: PayloadAction<string>) => {
      state.beamline = action.payload
    },
    setCluster: (state, action: PayloadAction<string>) => {
      state.cluster = action.payload
    },
    setGpuHardware: (state, action: PayloadAction<string>) => {
      state.gpuHardware = action.payload
    },
    setNumberOfProcessors: (state, action: PayloadAction<number>) => {
      state.numberOfProcessors = action.payload
    },
    setUseGpu: (state, action: PayloadAction<boolean>) => {
      state.useGpu = action.payload
    },
    setOutputFolderPath: (state, action: PayloadAction<string>) => {
      state.outputFolderPath = action.payload
    }
  }
})

export const {
  setConfigFilePath,
  setScanId,
  setBeamline,
  setCluster,
  setGpuHardware,
  setNumberOfProcessors,
  setUseGpu,
  setOutputFolderPath
} = configuratorSlice.actions
