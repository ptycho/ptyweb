from enum import Enum


class Status(str, Enum):
    FINISHED = "FINISHED"
    ACTIVE = "ACTIVE"
    DATA = "DATA"
    STOPPED = "STOPPED"


def get_status_by_id(status_id):
    status_map = {
        0: "FINISHED",
        1: "ACTIVE",
        2: "DATA",
        3: "STOPPED"
    }

    status_name = status_map[status_id]
    return Status(status_name)
