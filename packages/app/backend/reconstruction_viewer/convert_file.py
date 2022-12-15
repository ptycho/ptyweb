import os

from fastapi import UploadFile
import tempfile

import ptypy


def convert_file(file: UploadFile):
    """
    Convert a file to a zip file containing the data needed to run the frontend
    """
    # Temporarily save the file so that we can load it into ptypy
    file_contents = file.file.read()

    temp_file = tempfile.NamedTemporaryFile(delete=False)
    try:
        temp_file.write(file_contents)
        temp_file.close()

        # Load the file into ptypy
        try:
            data = ptypy.io.h5read(temp_file.name, "content")["content"]
        except OSError:
            # Invalid file format
            return None
    finally:
        # Deleting our temporary file
        if not temp_file.closed:
            temp_file.close()
        os.remove(temp_file.name)

    return data
