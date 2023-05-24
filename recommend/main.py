from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from transformers import AutoTokenizer, AutoModel
import random
import requests
import json

app = FastAPI()
# tokenizer = AutoTokenizer.from_pretrained("line-corporation/line-distilbert-base-japanese", trust_remote_code=True)
# model = AutoModel.from_pretrained("line-corporation/line-distilbert-base-japanese")

origins = [
    'http://localhost:3000',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

app.user_info = None
app.profile = None
app.last_hidden_state = None
app.sample_size = 3

def update_vec():
    res = requests.get("http://backend:9000/api/v1/users")
    values = json.loads(res.text)

    print(values)
    user_info = [{"id": v["id"], "name": v["name"]} for v in values]
    profiles = [v["profile"] for v in values]
    # last_hidden_state = model(**tokenizer(profiles, return_tensors="pt", padding='max_length', max_length=32)).last_hidden_state[:, 0]
    last_hidden_state=None

    return user_info, profiles, last_hidden_state

# app.user_info, app.profile, app.last_hidden_state = update_vec()

@app.get("/update")
def update():
    # try:
    app.user_info, app.profile, app.last_hidden_state = update_vec()
    return {"status": "success"}
    # except:
    #     return  {"status": "error"}
    
@app.get("/{post_id}")
def get_recommend():
    #random.sample(app.user_info, app.sample_size if len(app.user_info)>(app.sample_size) else len(app.user_info))
    if app.user_info!=None:
        return {"data": app.user_info}
    else:
        return {"data": "error"}
    
@app.get("/")
def read_root():
    return {"Hello": "World"}