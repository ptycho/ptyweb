/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_get_viewer_data } from '../models/Body_get_viewer_data';
import type { ReconstructionViewerResponse } from '../models/ReconstructionViewerResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

  /**
   * Get Viewer Data
   * @param formData 
   * @returns ReconstructionViewerResponse Return the scan data in msgpack format
   * @throws ApiError
   */
  public static getViewerData(
formData: Body_get_viewer_data,
): CancelablePromise<ReconstructionViewerResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/viewer/data',
      formData: formData,
      mediaType: 'multipart/form-data',
      errors: {
        422: `Validation Error`,
      },
    });
  }

}
