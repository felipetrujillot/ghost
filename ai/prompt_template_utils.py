"""
This file implements prompt template for llama based models. 
Modify the prompt template based on the model you select. 
This seems to have significant impact on the output of the LLM.
"""

from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate

# this is specific to Llama-2.

system_prompt="""Eres una asistente útil llamada dayana, utilizarás el contexto proporcionado para responder las preguntas del usuario.
 todas las respuestas seran en español, Lee el contexto proporcionado antes de responder preguntas y piensa paso a paso. Si no puedes responder una pregunta del usuario
 basándote en el contexto proporcionado, informa al usuario.
 No utilices ninguna otra información para responder al usuario. Proporciona una respuesta detallada a la pregunta. Responde siempre en español."""


system_prompt="""Eres una asistente útil llamada Diana, tu función es ser un planificador experto de proyectos en la categoría designada. Tu función será ser extremadamente riguroso y ser capaz de adelantarse a posibles problemas. Proporciona una respuesta detallada a la pregunta. Tus respuestas deben ser siempre directamente a la pregunta realizada. Responde siempre en el idioma español."""
# system_prompt = """Eres una asistente útil mujer llamado Dayana, utilizarás el contexto proporcionado para responder preguntas de los usuarios. 
# Lee el contexto dado antes de responder preguntas y piensa paso a paso.
# Todas tus respuestas seran en español, 
# Si no puedes responder una pregunta del usuario basándote en el contexto proporcionado, 
# informa al usuario. No utilices ninguna otra información para responder al usuario. Proporciona una respuesta detallada a la pregunta. Responde siempre en español."""


def get_prompt_template(system_prompt=system_prompt, promptTemplate_type=None, history=False):
    if promptTemplate_type == "llama":
        B_INST, E_INST = "[INST]", "[/INST]"
        B_SYS, E_SYS = "<<SYS>>\n", "\n<</SYS>>\n\n"
        SYSTEM_PROMPT = B_SYS + system_prompt + E_SYS
        if history:
            instruction = """
            Context: {history} \n {context}
            User: {question}"""

            prompt_template = B_INST + SYSTEM_PROMPT + instruction + E_INST
            prompt = PromptTemplate(input_variables=["history", "context", "question"], template=prompt_template)
        else:
            instruction = """
            Context: {context}
            User: {question}"""

            prompt_template = B_INST + SYSTEM_PROMPT + instruction + E_INST
            prompt = PromptTemplate(input_variables=["context", "question"], template=prompt_template)
    elif promptTemplate_type == "mistral":
        B_INST, E_INST = "<s>[INST] ", " [/INST]"
        if history:
            prompt_template = (
                B_INST
                + system_prompt
                + """
    
            Context: {history} \n {context}
            User: {question}"""
                + E_INST
            )
            prompt = PromptTemplate(input_variables=["history", "context", "question"], template=prompt_template)
        else:
            prompt_template = (
                B_INST
                + system_prompt
                + """
            
            Context: {context}
            User: {question}"""
                + E_INST
            )
            prompt = PromptTemplate(input_variables=["context", "question"], template=prompt_template)
    else:
        # change this based on the model you have selected.
        if history:
            prompt_template = (
                system_prompt
                + """
    
            Context: {history} \n {context}
            User: {question}
            Answer:"""
            )
            prompt = PromptTemplate(input_variables=["history", "context", "question"], template=prompt_template)
        else:
            prompt_template = (
                system_prompt
                + """
            
            Context: {context}
            User: {question}
            Answer:"""
            )
            prompt = PromptTemplate(input_variables=["context", "question"], template=prompt_template)

    memory = ConversationBufferMemory(input_key="question", memory_key="history")

    return (
        prompt,
        memory,
    )
