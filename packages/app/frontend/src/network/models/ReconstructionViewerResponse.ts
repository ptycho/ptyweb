/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type {GraphData} from "@ptyweb/lib/src/types/models/GraphData";
import type {ScanData} from "@ptyweb/lib/src/types/models/ScanData";

export type ReconstructionViewerResponse = {
  probe: ScanData;
  object: ScanData;
  graph: GraphData;
};
