from typing import Dict, Optional
from rest_framework.response import Response as RestFrameworkResponse
from typing import Dict
from rest_framework import status as http_status


class Response(RestFrameworkResponse):

    def __init__(self, status, errors: Optional[Dict] = None, data: Optional[Dict] = None) -> None:
        success = status in [http_status.HTTP_200_OK,
                             http_status.HTTP_201_CREATED]
        response_data = dict(success=success, errors=errors, data=data)
        super().__init__(response_data, status)
