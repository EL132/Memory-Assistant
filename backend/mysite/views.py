# mysite/views.py
from django.http import JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt
# not currently handing CSRF best practices 
# from django.views.decorators.csrf import ensure_csrf_cookie
import json


# LLM imports 
import os
import openai
from llama_index import SimpleDirectoryReader, GPTVectorStoreIndex

os.environ['OPENAI_API_KEY'] = "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"
openai.api_key = "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"

documents = SimpleDirectoryReader('./mysite/training_data').load_data()
index = GPTVectorStoreIndex(documents)
query_engine = index.as_query_engine()

# access the LLM, passing in the user input
def process_input(input):
    # do some processing here
    ret = (query_engine.query(input))
    return ret 




# @ensure_csrf_cookie
@csrf_exempt
def post(request: HttpRequest):

    body_unicode = request.body.decode('utf-8')
    body_data = json.loads(body_unicode)
    chat_prompt = body_data.get('chat_prompt')

    # logic to handle LLM processing goes here in a function call like this:
    processed_data = process_input(chat_prompt)
    # processed_data = decode_output(str(processed_data))

    data = {
        "processed_data": str(processed_data),
    }

    return JsonResponse(data)








# decode LLM output
def decode_output(output_str):
    # Encode the output string to interpret escape sequences
    encoded_str = output_str.encode().decode('unicode_escape')
    return encoded_str