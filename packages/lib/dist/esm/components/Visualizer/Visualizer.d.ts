/// <reference types="react" />
import '@h5web/lib/styles.css';
import { ScanData } from "../../types/models/ScanData";
import "./Visualizer.css";
export interface VisualizerProps {
    data: ScanData;
    title: string;
}
export declare const Visualizer: ({ data, title }: VisualizerProps) => JSX.Element;
