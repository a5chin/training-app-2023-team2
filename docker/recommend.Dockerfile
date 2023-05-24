FROM pytorch/pytorch:2.0.1-cuda11.7-cudnn8-runtime

RUN pip install fastapi uvicorn[standard] transformers fugashi sentencepiece unidic-lite
RUN pip install requests

