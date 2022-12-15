import fastapi
import fastapi.openapi.utils
import msgpack
from fastapi import UploadFile

from models import reconstruction_viewer
from reconstruction_viewer import viewer_generate_response

viewer_router = fastapi.APIRouter(prefix="/viewer")


@viewer_router.post("/data",
                    operation_id="get_viewer_data",
                    responses={
                        200: {
                            "content": {"application/msgpack": {}},
                            "description": "Return the scan data in msgpack format",
                        }
                    },
                    response_model=reconstruction_viewer.ReconstructionViewerResponse,
                    response_class=fastapi.Response
                    )
def get_viewer_data(file: UploadFile):
    response_data_dict = viewer_generate_response.get_viewer_endpoint_response_dict(file)
    converted = msgpack.packb(response_data_dict)

    return fastapi.Response(converted, headers={
        "Content-Type": "application/msgpack"
    })
