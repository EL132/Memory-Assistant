# mysite/views.py
from django.http import JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt
# not currently handing CSRF best practices 
# from django.views.decorators.csrf import ensure_csrf_cookie
import json


# LLM imports 
from langchain.indexes import VectorstoreIndexCreator
from langchain.document_loaders import UnstructuredFileLoader
import os
os.environ['OPENAI_API_KEY'] = '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'


loader = UnstructuredFileLoader('training_data/MA - Meeting Notes.pdf') #CHANGE THIS TO MATCH FILE NAME
index = VectorstoreIndexCreator().from_loaders([loader])
docs = loader.load()

# decode LLM output
def decode_output(output_str):
    # Encode the output string to interpret escape sequences
    encoded_str = output_str.encode().decode('unicode_escape')
    return encoded_str

# access the LLM, passing in the user input
def process_input(input):
    # do some processing here
    ret = decode_output(index.query(input))
    return ret 

# @ensure_csrf_cookie
@csrf_exempt
def post(request: HttpRequest):

    body_unicode = request.body.decode('utf-8')
    body_data = json.loads(body_unicode)
    chat_prompt = body_data.get('chat_prompt')

    # logic to handle LLM processing goes here in a function call like this:
    processed_data = (chat_prompt)

    data = {
        "processed_data": processed_data,
    }

    return JsonResponse(data)