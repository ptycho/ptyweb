from pydantic import BaseModel


class StartScannerRequest(BaseModel):
    ip: str
    port: int
