from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from transformers import AutoTokenizer, AutoModel
import torch
import torch.nn.functional as F
import requests
import json

app = FastAPI()
tokenizer = AutoTokenizer.from_pretrained("line-corporation/line-distilbert-base-japanese", trust_remote_code=True)
model = AutoModel.from_pretrained("line-corporation/line-distilbert-base-japanese")

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

app.user_info = {}
app.vec = {}
app.sample_size = 3
app.dummy = [{"id":"01H0F7PC287Q3C2XH9C575F9ZW", "name":"taro"}, {"id":"01H0F7PC2AXHE7DRHPKV8Y4SZC", "name":"hanako"}]

def emb(sentences):
    return model(**tokenizer(sentences, return_tensors="pt", padding='max_length', max_length=16)).last_hidden_state[:, 0]

@app.get("/register/{post_id}")
def register(post_id):
    res = requests.get(f"http://backend:9000/api/v1/users/{post_id}")
    value = json.loads(res.text)

    app.user_info[value["id"]] = {"id": value["id"], "name": value["name"]}
    app.vec[value["id"]] = emb(value["profile"])
    return {"status": "success"}
    
@app.get("/{post_id}")
def get_recommend(post_id):
    if post_id in app.vec.keys():
        target_vec = app.vec[post_id]
        score = F.cosine_similarity(torch.tile(target_vec, (len(app.user_info), 1)), torch.stack([v[0] for v in app.vec.values()]))

        keys = list(app.vec.keys())
        if app.user_info!=None:
            print(torch.argsort(score)[-(app.sample_size+1):-1])
            return [app.user_info[keys[i]] for i in torch.argsort(score)[-(app.sample_size+1):-1]]
        else:
            return app.dummy
    else:
        return app.dummy
    
@app.get("/")
def read_root():
    return {"Hello": "World"}