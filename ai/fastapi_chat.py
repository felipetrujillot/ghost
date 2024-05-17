from fastapi import FastAPI, Response,BackgroundTasks
import time
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import random
import time
import json
from transformers import AutoModelForCausalLM, AutoTokenizer, TextStreamer, Trainer
from huggingface_hub import hf_hub_download

# from langchain.embeddings import HuggingFaceEmbeddings
from run_localGPT import load_model
from prompt_template_utils import get_prompt_template

import torch
from langchain.chains import RetrievalQA
from langchain.embeddings import HuggingFaceInstructEmbeddings

# from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.vectorstores import Chroma
from werkzeug.utils import secure_filename
from langchain.llms import LlamaCpp

from constants import CHROMA_SETTINGS, EMBEDDING_MODEL_NAME, PERSIST_DIRECTORY, MODEL_ID, MODEL_BASENAME,MODELS_PATH ,CONTEXT_WINDOW_SIZE,MAX_NEW_TOKENS,N_BATCH,N_GPU_LAYERS

if torch.backends.mps.is_available():
    DEVICE_TYPE = "mps"
elif torch.cuda.is_available():
    DEVICE_TYPE = "cuda"
else:
    DEVICE_TYPE = "cpu"

SHOW_SOURCES = True

app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:8080",
    "https://yourdomain.com",
    "https://subdomain.yourdomain.com",
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


def llm():
    if torch.backends.mps.is_available():
        DEVICE_TYPE = "mps"
    elif torch.cuda.is_available():
        DEVICE_TYPE = "cuda"
    else:
        DEVICE_TYPE = "cpu"


    model_path = hf_hub_download(
                repo_id=MODEL_ID,
                filename=MODEL_BASENAME,
                resume_download=True,
                cache_dir=MODELS_PATH,
            )
    kwargs = {
        "model_path": model_path,
        "n_ctx": CONTEXT_WINDOW_SIZE,
        "max_tokens": MAX_NEW_TOKENS,
       #xs "streaming" : True,
        
        "n_batch": N_BATCH,  # set this based on your GPU & CPU RAM
    }
    if DEVICE_TYPE.lower() == "mps":
        kwargs["n_gpu_layers"] = 1
    if DEVICE_TYPE.lower() == "cuda":
        kwargs["n_gpu_layers"] = N_GPU_LAYERS  # set this based on your GPU


    llm = LlamaCpp(**kwargs)

    stream = llm(
        "Q: Name the planets in the solar system? A: ",
        max_tokens=48,
        stop=["Q:", "\n"],
        #stream=True
    )

    for output in stream:
        yield json.dumps({"index": output}) + "\n"
        
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)



@app.get("/stream")
def stream_response():
    # Replace 'your_llama_cpp_method' with the actual method from langchain.llms.LlamaCpp
    data_generator = llm()
    return StreamingResponse(data_generator, media_type="application/json")


""" 

def llmqa():

    EMBEDDINGS = HuggingFaceInstructEmbeddings(model_name=EMBEDDING_MODEL_NAME, model_kwargs={"device": DEVICE_TYPE})

    DB = Chroma(
        persist_directory=PERSIST_DIRECTORY,
        embedding_function=EMBEDDINGS,
        client_settings=CHROMA_SETTINGS,
    )

    RETRIEVER = DB.as_retriever()

    LLM = load_model(device_type=DEVICE_TYPE, model_id=MODEL_ID, model_basename=MODEL_BASENAME)
    #LLM.streaming = True
    
    stream = LLM(
        "Q: Name the planets in the solar system? A: ",
        max_tokens=48,
        stop=["Q:", "\n"],
        stream=True
    )

    for output in stream:
        print(json.dumps(output, indent=2))


    return
    prompt, memory = get_prompt_template(promptTemplate_type="llama", history=False)

    QA = RetrievalQA.from_chain_type(
        llm=LLM,
        chain_type="stuff",
        retriever=RETRIEVER,
        return_source_documents=SHOW_SOURCES,
        chain_type_kwargs={
            "prompt": prompt,
        },
    )
        

    for text in QA.stream({"query": "hola"}):
        print(text)

 """
