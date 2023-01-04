/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_get_viewer_data_from_file } from '../models/Body_get_viewer_data_from_file';
import type { ReconstructionViewerResponse } from '../models/ReconstructionViewerResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

  /**
   * Get Viewer Data From File
   * @param formData 
   * @returns ReconstructionViewerResponse Takes a ptyr file and return the scan data in msgpack format
   * @throws ApiError
   */
  public static getViewerDataFromFile(
formData: Body_get_viewer_data_from_file,
): CancelablePromise<ReconstructionViewerResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/viewer/data-from-file',
      formData: formData,
      mediaType: 'multipart/form-data',
      errors: {
        422: `Validation Error`,
      },
    });
  }

}
