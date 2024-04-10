import json
# LLM imports 
import os, sys
import openai
from llama_index import VectorStoreIndex, SimpleDirectoryReader, ServiceContext
from llama_index.llms import OpenAI

#openai.api_key = ""
openai.api_key = os.getenv("OPENAI_API_KEY") # THIS DOES NOT WORK
# Instantiate the OpenAI model and customize it
llm = OpenAI(temperature=0.1, model="gpt-3.5-turbo")

# Create a ServiceContext with the customized LLM
service_context = ServiceContext.from_defaults(llm=llm)

documents = SimpleDirectoryReader('../backend/mysite/training_data').load_data()

# Create an index using the ServiceContext with the customized LLM
index = VectorStoreIndex.from_documents(documents, service_context=service_context)

query_engine = index.as_query_engine()
topics = "Hashmaps, Trees, Linked Lists, Arrays, Strings, Stacks, Queues, Heaps, Matrices, Two Pointers,\
      Sliding Windows, Prefix Sums, Graphs, Tries, Recursion, Searching and Sorting, Intervals"
input = str(sys.argv[1])

ret = (query_engine.query(input + f"In addition, please also print out which of the following topics this question falls under:\{topics}." + 
            "You should print out more than one topic if the question falls under more than one of the mentioned topics." + 
            "You must also print out the name or names of the files that you used to come up with your response. If no source files can be\
                identified, then say 'No Source File Identified'. You should print out more than one file name if the answer you came up with\
                    pulled information from more than one file." + 
            "For the topic of the question, please start that response with 'Topic(s):' and return the topic or topics separated by commas.\
                For example, 'heaps, trees, stacks' or 'Queues' would both be valid responses to have after 'Topic(s):'." +
            "For the name or names of relevant files, please start that response with 'File(s)' and follow the same comma separated approach as for 'Topic(s):'." +
            "Put the response to the question first, then the 'File(s)', and finally the 'Topic(s)'. + 'if you don't know the answer, just say you don't know."))
# prompt currently isn't returning all used file names. It only returned the Hashmap_notes.pdf when asked a question about trees and hashmaps combined.

result = {"llm_response": str(ret)}
rtn = json.dumps(result)

if __name__ == "__main__":
    print(rtn)