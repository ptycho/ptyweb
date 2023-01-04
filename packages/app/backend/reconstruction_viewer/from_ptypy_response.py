from fastapi import HTTPException

import reconstruction_viewer.scan_data_manipulator as data_manipulator
from reconstruction_viewer import normalization

DOWN_SAMPLING_REMAINING_PIXELS = 150000


def get_response_from_ptypy(meta_dict, probe_dict, object_dict, is_from_file) -> dict:
    scan_names = list(probe_dict.keys())

    if len(scan_names) == 0:
        raise HTTPException(status_code=500, detail="No scans yet")

    scan_name = scan_names[0]

    probe_scan = probe_dict.get(scan_name)
    object_scan = object_dict.get(scan_name)

    if "data" not in probe_scan or "data" not in object_scan:
        raise HTTPException(status_code=500, detail="The reconstruction does not contain any data yet")

    probe_data = data_manipulator.ScanData(probe_scan.get("data")[0])
    object_data = data_manipulator.ScanData(object_scan.get("data")[0])
    graph_normalised = normalization.normalize_graph(meta_dict)

    # Down sampling data
    probe_data.down_sample(remaining_pixels=DOWN_SAMPLING_REMAINING_PIXELS)
    object_data.down_sample(remaining_pixels=DOWN_SAMPLING_REMAINING_PIXELS)

    # We are using dicts instead of models because pydamic models are slow with such large amounts of data
    return {
        "probe": {
            **probe_data.to_dict(),
            **{
                "pixel_size": probe_scan.get("_psize")[0].astype(float) / probe_data.zoom_scale_factor
            }
        },
        "object": {
            **object_data.to_dict(),
            **{
                "pixel_size": object_scan.get("_psize")[0].astype(float) / object_data.zoom_scale_factor
            }
        },
        "graph": graph_normalised
    }
