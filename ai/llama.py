
from constants import CHROMA_SETTINGS,PERSIST_DIRECTORY,EMBEDDING_MODEL_NAME,MODEL_BASENAME,MODEL_ID,MODELS_PATH,CONTEXT_WINDOW_SIZE,MAX_NEW_TOKENS,N_BATCH
from huggingface_hub import hf_hub_download
from langchain.llms import LlamaCpp
import torch
import json
from prompt_template_utils import get_prompt_template
from langchain.chains import RetrievalQA
from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceInstructEmbeddings

"""
"""
def device_type():
    if torch.backends.mps.is_available():
        DEVICE_TYPE = "mps"
    elif torch.cuda.is_available():
        DEVICE_TYPE = "cuda"
    else:
        DEVICE_TYPE = "cpu"
    return DEVICE_TYPE

"""
"""
def llm():

    SHOW_SOURCES = True
    DEVICE_TYPE = device_type()
    EMBEDDINGS = HuggingFaceInstructEmbeddings(model_name=EMBEDDING_MODEL_NAME, model_kwargs={"device": DEVICE_TYPE})
    
    DB = Chroma(
        persist_directory=PERSIST_DIRECTORY,
        embedding_function=EMBEDDINGS,
        client_settings=CHROMA_SETTINGS,
    )

    RETRIEVER = DB.as_retriever()

    model_path = hf_hub_download(
        repo_id=MODEL_ID,
        filename=MODEL_BASENAME,
        resume_download=True,
        cache_dir=MODELS_PATH
    )
    
    kwargs = {
        "model_path": model_path,
        "n_ctx": CONTEXT_WINDOW_SIZE,
        "max_tokens": MAX_NEW_TOKENS,
        "n_batch": N_BATCH, 
        "n_gpu_layers":1,
        "stream": True, 
    }
    
    llm = LlamaCpp(**kwargs)

    
    stream = llm(
            "¿Cómo te llamas?",
            #max_tokens=48,
            #stop=["Q:", "\n"],
            #stream=True
        )
    #print(output)
    for output in stream:
            #print(output)
            yield json.dumps({"index": output}, indent=2) 
   
    
    """ prompt, memory = get_prompt_template(promptTemplate_type="llama", history=False)

    QA = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=RETRIEVER,
        return_source_documents=SHOW_SOURCES,
        chain_type_kwargs={
            "prompt": prompt,
        },
    )

    stream = QA("¿Cómo te llamas?")
    result = stream["result"]

    for output in result:
        text = json.dumps({"index": output}, indent=2)
        yield text """
    

"""
"""
nnnn = ""
for output in llm():

    val = json.loads(output)
    nnnn += val["index"]

    #nnnn += output["index"]
    #print(output["index"] )

print(nnnn)