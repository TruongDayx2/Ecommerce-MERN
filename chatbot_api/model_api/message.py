from typing import Union
from pydantic import BaseModel

class Message(BaseModel):
    msg: Union[str, None] = None