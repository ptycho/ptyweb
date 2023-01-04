import typing

from ptypy.utils import PlotClient, Param
from enums.status import Status, get_status_by_id

pc: typing.Optional[PlotClient] = None
pc_running = False
cached_data: typing.Optional[dict] = None


def is_pc_running():
    return pc_running


def get_status() -> Status:
    if pc is None:
        return Status.STOPPED

    return get_status_by_id(pc.status)


def start_scanner(ip: str, port: int):
    global pc_running, pc
    if pc_running:
        stop_scanner()

    pc_config = Param(
        address=f"tcp://{ip}",
        port=port
    )

    pc = PlotClient(pc_config, in_thread=False)
    pc.start()
    pc.runtime["iter_info"] = []
    pc_running = True
    return True


def stop_scanner():
    global pc_running, pc
    if not pc_running and pc is not None:
        return False

    pc.stop()
    pc_running = False
    pc = None

    return True


def update_data():
    global cached_data
    cached_data = pc.get_data()
    return cached_data
