import os

import fastapi.openapi.utils
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware

from endpoints import viewer
from util import openapi_patcher

app = fastapi.FastAPI()

if os.getenv("PRODUCTION") != "true":
    import socket

    # Fetching local IP address to allow CORS
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)

    origins = [
        f"http://{local_ip}:3000",
        "http://localhost:3000"
    ]

    # Allowing access to API from external sources while in development
    # This is to allow the development frontend which is running on a different port to access the API
    # Do not use this in production
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Adding GZip compression to responses
app.add_middleware(GZipMiddleware, minimum_size=1000, compresslevel=5)

# Setting up our endpoints
router = fastapi.APIRouter(prefix="/api")
router.include_router(viewer.viewer_router)

app.include_router(router)

openapi_patcher.patch_openapi(app, title="Ptyweb API", version="0.1.0")
