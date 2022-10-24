import requests
from typing import Dict, Optional, Tuple


class RestAPIMixin:
    def rest_post(self, url: str, data: Optional[Dict], headers: Optional[Dict], params: Optional[Dict]) -> Tuple[bool, Dict]:
        try:
            response = requests.post(url, data, headers, params=params)
            response_data = response.json()
            return True, response_data
        except:
            return False, None

    def rest_get(self, url: str, headers: Optional[Dict], params: Optional[Dict]) -> Tuple[bool, Dict]:
        try:
            response = requests.get(url, headers, params=params)
            response_data = response.json()
            return True, response_data
        except:
            return False, None
