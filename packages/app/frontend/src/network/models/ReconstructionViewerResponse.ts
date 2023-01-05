/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GraphData } from './GraphData';
import type { ScanData } from './ScanData';

export type ReconstructionViewerResponse = {
  is_finished: boolean;
  probe: ScanData;
  object: ScanData;
  graph: GraphData;
};
