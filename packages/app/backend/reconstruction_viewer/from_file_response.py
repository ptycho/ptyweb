from fastapi import HTTPException, UploadFile

from reconstruction_viewer import convert_file, from_ptypy_response


def get_response_from_file(file: UploadFile) -> dict:
    ptypy_data = convert_file.convert_file(file)

    if ptypy_data is None:
        raise HTTPException(status_code=400, detail="Invalid file format")

    meta_dict = ptypy_data.runtime
    probe_dict = ptypy_data.probe
    object_dict = ptypy_data.obj

    return from_ptypy_response.get_response_from_ptypy(meta_dict, probe_dict, object_dict, True)
