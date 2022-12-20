
import fasttext
import os
from django.conf import settings
from typing import List


ACTION_MODEL_MAP = {
    "VALIDATION": "FASTTEXT_VALIDATION_MODEL",
    "TOPIC": "FASTTEXT_TOPIC_MODEL",
    
    "SENTIMENT": 'FASTTEXT_SENTIMENT_MODEL'
}

VALIDATION_MAP = {
    "__label__yes": 'YES',
    "__label__no": 'NO'
}

SENTIMENT_MAP = {
    "__label__positive": 'POSITIVE',
    "__label__neutral": 'NEUTRAL',
    "__label__negative": 'NEGATIVE'}



class ActionsService:
    def __init__(self, model:str, action:str, payload:List[dict]) -> None:
        self.action = action
        self.payload = payload
        fasttext_model_path = os.path.join(settings.AI_MODELS_DIR, getattr(settings, ACTION_MODEL_MAP.get(self.action)))
        self.model = fasttext.load_model(fasttext_model_path)

    def evaluate(self):
        texts = [item.get("value") for item in self.payload]
        temp_results = self.get_handler(self.action)(texts)
        result = [dict(id=item.get("id"), text=item.get("value"), result=result) for (item, result) in zip(self.payload, temp_results)]

        return result

    def get_handler(self, action):
        handler_name = f"do_{action.lower()}"
        handler = getattr(self, handler_name)
        return handler

    def do_validation(self, items):
        return [dict(VALIDATION=VALIDATION_MAP.get(self.model.predict(text)[0][0]), SENTIMENT=None, TOPIC=None) for text in items]

    def do_sentiment(self, items):
        return [dict(VALIDATION=None, SENTIMENT=SENTIMENT_MAP.get(self.model.predict(text)[0][0]), TOPIC=None) for text in items]
        

    def do_topic(self, items):
        return[dict(VALIDATION=None, SENTIMENT=None, TOPIC=self.model.predict(text)[0][0].split("__")[-1].upper()) for text in items]
    
    def clean_texts(self, texts):
        return [text.replace("\n","") for text in texts]