from typing import Dict, Optional
from rest_framework.response import Response as RestFrameworkResponse
from typing import Dict
from rest_framework import status

class Response(RestFrameworkResponse):

    def __init__(self, status, errors: list=[], data: Optional[Dict]=None) -> None:
        success = status in [status.HTTP_200_OK, status.HTTP_201_CREATED]
        response_data = dict(success=success, errors=errors, data=data)
        super().__init__(response_data, status)