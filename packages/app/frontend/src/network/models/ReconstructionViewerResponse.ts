/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type {GraphData} from "@ptyweb/lib";
import type {ScanData} from "@ptyweb/lib";

export type ReconstructionViewerResponse = {
  probe: ScanData;
  object: ScanData;
  graph: GraphData;
};
