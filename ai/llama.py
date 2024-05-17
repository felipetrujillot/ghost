
from constants import CHROMA_SETTINGS,PERSIST_DIRECTORY,EMBEDDING_MODEL_NAME,MODEL_BASENAME,MODEL_ID,MODELS_PATH,CONTEXT_WINDOW_SIZE,MAX_NEW_TOKENS,N_BATCH
from huggingface_hub import hf_hub_download
from langchain.llms import LlamaCpp
import torch
import json
from prompt_template_utils import get_prompt_template
from langchain.chains import RetrievalQA
from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceInstructEmbeddings
from transformers import (
    GenerationConfig,
    pipeline,
)
import logging

from langchain.llms import HuggingFacePipeline
from run_localGPT import load_model
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

    
    llm = load_model(device_type=DEVICE_TYPE, model_id=MODEL_ID, model_basename=MODEL_BASENAME, LOGGING=logging)

    """  model = LlamaCpp(**kwargs)
    generation_config = GenerationConfig.from_pretrained(MODEL_ID)

    pipe = pipeline(
        "text-generation",
        model=model,
        #tokenizer=tokenizer,
        max_length=MAX_NEW_TOKENS,
        temperature=0.2,
        # top_p=0.95,
        repetition_penalty=1.15,
        generation_config=generation_config,
        num_return_sequences=1,
    )

    llm = HuggingFacePipeline(pipeline=pipe) """
    
    """ stream = llm(
            "¿De qué se trata el documento?",
            #max_tokens=48,
            #stop=["Q:", "\n"],
            #stream=True
        )
    for output in stream:
            #print(output)
            yield json.dumps({"index": output}, indent=2)  """
   
    
    prompt, memory = get_prompt_template(promptTemplate_type="mistral", history=False)

    QA = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=RETRIEVER,
        return_source_documents=SHOW_SOURCES,
        chain_type_kwargs={
            "prompt": prompt,
        },
    )

    stream = QA("""
                Escríbeme una lista de tareas para poder realizar un proyecto, este proyecto requiere completarse a través del tiempo y se trata de lo que se encuentra en el documento. Cada ítem de la lista deberá tener un titular breve, y una descripción prolongada detallando qué se trata cada punto, la lista debe ser enumerada y el titular debe separarse del contenido con un ":"
                """)
    result = stream["result"]

    for output in result:
        text = json.dumps({"index": output}, indent=2)
        yield text
    

"""
"""
nnnn = ""
for output in llm():

    val = json.loads(output)
    nnnn += val["index"]

print(nnnn)