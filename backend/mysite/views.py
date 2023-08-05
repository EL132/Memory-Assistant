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

openai.api_key = ""
#openai.api_key = os.getenv("OPENAI_API_KEY") # THIS DOES NOT WORK
documents = SimpleDirectoryReader('./mysite/training_data').load_data()
index = GPTVectorStoreIndex(documents)
query_engine = index.as_query_engine()
topics = "Hashmaps, Trees, Linked Lists, Arrays, Strings, Stacks, Queues, Heaps"


# access the LLM, passing in the user input
def process_input(input):
    # do some processing here
    ret = (query_engine.query(input + f"In addition, please also print out which of the following topics this question falls under:\{topics}." + 
            "You should print out more than one topic if the question falls under more than one of the mentioned topics." + 
            "You must also print out the name or names of the files that you used to come up with your response. If no source files can be\
                identified, then say 'No Source File Identified'. You should print out more than one file name if the answer you came up with\
                     pulled information from more than one file." + 
            "For the topic of the question, please start that response with 'Topic(s):' and return the topic or topics separated by commas.\
                  For example, 'heaps, trees, stacks' or 'Queues' would both be valid responses to have after 'Topic(s):'." +
            "For the name or names of relevant files, please start that response with 'File(s)' and follow the same comma separated approach as for 'Topic(s):'." +
            "Put the response to the question first, then the 'File(s)', and finally the 'Topic(s)'."))
    # prompt currently isn't returning all used file names. It only returned the Hashmap_notes.pdf when asked a question about trees and hashmaps combined.
    # ret = input + " testing without LLM query engine"
    return ret

def identify_topics(response: str) -> list[str]:
    topics_index = response.index("Topic(s):")
    topics_string = response[topics_index + 10:] 
    topics_list = topics_string.split(', ')
    return topics_list # example output: ["Hashmaps", "Trees"]

def identify_files(response: str) -> list[str]:
    files_index = response.index("File(s):")
    files_string = response[files_index + 9: response.index("Topic(s):") - 1] 
    files_list = files_string.split(', ')
    return files_list # example output: ['Hashmap_notes.pdf']

# Use the following to test the above two methods if needed
# print(identify_files("\nAnswer: The main difference between trees and hashmaps is that trees have a time complexity of O(logn) for searching,\
#                      inserting, and deleting elements, while hashmaps have a time complexity of O(1) for the same operations. Hashmaps are better\
#                      to use for accessing things in constant O(n) time.\n\nFile(s): Hashmap_notes.pdf\nTopic(s): Hashmaps, Trees"))

# decode LLM output
def decode_output(output_str):
    # Encode the output string to interpret escape sequences
    encoded_str = output_str.encode().decode('unicode_escape')
    return encoded_str

#-----------------------------------------------------------API Requests----------------------------------------------------------------------

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
