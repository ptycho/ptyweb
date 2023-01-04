from fastapi import HTTPException

from reconstruction_viewer import scanner, from_ptypy_response


def get_response_from_live() -> dict:
    if scanner.is_pc_running():
        pr_dict, ob_dict, meta_dict = scanner.update_data()

        status = scanner.get_status()
        return from_ptypy_response.get_response_from_ptypy(meta_dict, pr_dict, ob_dict, False)
    else:
        # Return empty data if scanner is not running
        raise HTTPException(status_code=400, detail="Scanner is not running")
