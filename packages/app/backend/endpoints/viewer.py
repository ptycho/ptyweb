import fastapi
import fastapi.openapi.utils
import msgpack
from fastapi import UploadFile

from models import reconstruction_viewer
from reconstruction_viewer import from_file_response

viewer_router = fastapi.APIRouter(prefix="/viewer")


@viewer_router.post("/data-from-file",
                    operation_id="get_viewer_data_from_file",
                    responses={
                        200: {
                            "content": {"application/msgpack": {}},
                            "description": "Takes a ptyr file and return the scan data in msgpack format",
                        }
                    },
                    response_model=reconstruction_viewer.ReconstructionViewerResponse,
                    response_class=fastapi.Response
                    )
def get_viewer_data_from_file(file: UploadFile):
    response_data_dict = from_file_response.get_response_from_file(file)
    converted = msgpack.packb(response_data_dict)

    return fastapi.Response(converted, headers={
        "Content-Type": "application/msgpack"
    })
