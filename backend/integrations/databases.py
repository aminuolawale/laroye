from django.conf  import settings
from google.cloud import bigquery




class Bigquery:
    def __init__(self):
        self.client = bigquery.Client()
        self.dataset = settings.LAROYE_DATASET
        
    def import_data(self, data, destination_table):
        job_config = bigquery.QueryJobConfig()
        job_config.destination = f"{self.dataset}.{destination_table}"
        table = self.client.get_table(f"{self.dataset}.{destination_table}")
        errors = self.client.insert_rows_json(table, data)
        return errors

class DataWarehouse:

    def __init__(self) -> None:
        self.warehouse_service = Bigquery()
    

    def import_data(self, data, destination_table):
        return self.warehouse_service.import_data(data, destination_table)