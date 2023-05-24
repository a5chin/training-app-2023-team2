from fastapi import FastAPI
from transformers import AutoTokenizer, AutoModel
import requests
import json

app = FastAPI()
tokenizer = AutoTokenizer.from_pretrained("line-corporation/line-distilbert-base-japanese", trust_remote_code=True)
model = AutoModel.from_pretrained("line-corporation/line-distilbert-base-japanese")

sentence = ["LINE株式会社で[MASK]の研究・開発をしている。", "LINE株式会社で[MASK]の研究・開発をしている。"]

def pirnt_test():
    print(model(**tokenizer(sentence, return_tensors="pt")).last_hidden_state.shape)

# def update_vec():
#     res = requests.get("http://localhost:9000/api/v1/users")
#     values = json.loads(res.text)
#     profiles = [v.profile for v in values]
#     last_hidden_state = model(**tokenizer(sentence, return_tensors="pt")).last_hidden_state

#     return last_hidden_state[:,0]

# user_vec = update_vec()

@app.get("/")
def read_root():
    pirnt_test()
    return {"Hello": "World"}

# @app.get("/{post_id}")
# def get_recommend():
#     pirnt_test()
#     return {"Hello": "World"}

# @app.get("/update")
# def update_vec():
#     try:
#         user_vec = update_vec()
#         return {"status": "success"}
#     except:
#         return  {"status": "error"}

# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: str = None):
#     return {"item_id": item_id, "q": q}