from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from transformers import AutoTokenizer, AutoModel
import torch
import torch.nn.functional as F
import requests
import json
import random
from pydantic import BaseModel

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


def emb(sentences):
    return model(**tokenizer(sentences, return_tensors="pt", padding='max_length', max_length=16)).last_hidden_state[:, 0]

app.user_info = {
    "01H0F7PC287Q3C2XH9C575F9ZW": {"id":"01H0F7PC287Q3C2XH9C575F9ZW","name":"taro",},
    "01H0F7PC2AXHE7DRHPKV8Y4SZC": {"id":"01H0F7PC2AXHE7DRHPKV8Y4SZC","name":"hanako",}
    }
app.vec = {
    "01H0F7PC287Q3C2XH9C575F9ZW": emb("I am taro"), 
    "01H0F7PC2AXHE7DRHPKV8Y4SZC": emb("I am hanako"),
    }
app.sample_size = 3
app.dummy = [{"id":"01H0F7PC287Q3C2XH9C575F9ZW", "name":"taro"}, {"id":"01H0F7PC2AXHE7DRHPKV8Y4SZC", "name":"hanako"}]


class User(BaseModel):
  email: str
  id: str
  name: str
  profile: str

@app.put("/{post_id}", response_model=User)
def register(post_id: str, user: User):
    app.user_info[user.id] = {"id": user.id, "name": user.name}
    app.vec[user.id] = emb(user.profile)
    return user
    
@app.get("/{post_id}")
def get_recommend(post_id: str):
    if post_id in app.vec.keys():
        target_vec = app.vec[post_id]
        score = F.cosine_similarity(torch.tile(target_vec, (len(app.user_info), 1)), torch.stack([v[0] for v in app.vec.values()]))

        keys = list(app.vec.keys())
        if app.user_info!=None:
            print("成功")
            return [app.user_info[keys[i]] for i in torch.argsort(score)[-(app.sample_size+1):-1]]
        else:
            user_list = [ v for k, v in app.user_info.items() if k!=post_id]
            return random.sample(user_list, len(user_list))[:3]
    else:
        user_list = [ v for k, v in app.user_info.items() if k!=post_id]
        return random.sample(user_list, len(user_list))[:3]
    
@app.get("/")
def read_root():
    return {"Hello": "World"}