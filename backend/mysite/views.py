# mysite/views.py
from django.http import JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt
# not currently handing CSRF best practices 
# from django.views.decorators.csrf import ensure_csrf_cookie
import json
from pymongo import MongoClient
from imageStorage import Utils


# LLM imports 
import os
import openai
from llama_index import SimpleDirectoryReader, GPTVectorStoreIndex


documents = SimpleDirectoryReader('./mysite/training_data').load_data()
index = GPTVectorStoreIndex(documents)
query_engine = index.as_query_engine()

# access the LLM, passing in the user input
def process_input(input):
    # do some processing here
    ret = (query_engine.query(input))
    # ret = input + " testing without LLM query engine"
    return ret 



# get function for the images for the React frontend
@csrf_exempt
def get(request: HttpRequest):
    if request.method == 'POST':
        # Get the 'name' parameter from the request body
        body_data = json.loads(request.body.decode('utf-8'))
        name = body_data.get('name', None)

        # Initialize the utility class
        utility = Utils()

        return JsonResponse(utility.get_s3_and_tags(name), safe=False)

    return JsonResponse({"error": "Invalid request method. Use POST."})

@csrf_exempt
def getTags(request: HttpRequest):
    if request.method == 'POST':
        # Get the 'tag' parameter from the request body
        body_data = json.loads(request.body.decode('utf-8'))
        tag = body_data.get('tag', None)

        # Initialize the utility class
        utility = Utils()

        if tag:
            # Fetch images with the specified tag from the MongoDB collection using 'get_matching_tags' method
            images_data = utility.get_matching_tags([tag])

        return JsonResponse(images_data, safe=False)

    return JsonResponse({"error": "Invalid request method. Use POST."})


# @ensure_csrf_cookie
@csrf_exempt
def post(request: HttpRequest):
    # high level changes:
    # first query needs to answer the user's question
    # second query needs to answer our own question that will involve using the user's question as a parameter
    # the response object will then have two parts to it: the user response and the associated tags response

    body_unicode = request.body.decode('utf-8')
    body_data = json.loads(body_unicode)
    chat_prompt = body_data.get('chat_prompt')

    # logic to handle LLM processing goes here in a function call like this:
    processed_data = process_input(chat_prompt)
    # processed_data = decode_output(str(processed_data))

    data = {
        "processed_data": str(processed_data),
    }

    print(processed_data)
    return JsonResponse(data)








# decode LLM output
def decode_output(output_str):
    # Encode the output string to interpret escape sequences
    encoded_str = output_str.encode().decode('unicode_escape')
    return encoded_str