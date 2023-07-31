# Install these dependencies
# pip install boto3
# pip install python-dotenv
# pip install pymongo

# mostly image hosting related imports
from botocore.exceptions import ClientError
from botocore.config import Config
import os
import sys
import boto3

# database related imports

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import json
from bson import json_util

class Utils:
    def __init__(self):
        self.client = MongoClient(os.getenv('MONGO_STRING'))
        self.db = self.client.get_database('MemoryAssist_db')
        self.records = self.db.notes_images
        self.PUBLIC_BUCKET_NAME = 'MemoryAssist'  # Bucket with Sample Data **PUBLIC**
        self.ENDPOINT_URL = 'https://s3.us-east-005.backblazeb2.com'
        self.b2 = self.get_b2_resource(self.ENDPOINT_URL, os.getenv('AWS_ACCESS_KEY_ID'), os.getenv('AWS_SECRET_ACCESS_KEY'))

    #----------------------------------------------------Database---------------------------------------------------------
    # given a param "name" for the image name, this method return a json object with the s3 url and associated tags
    def get_s3_and_tags(self, name: str):
        documents = self.records.find({'name' : name})
        json_data = json.loads(json_util.dumps(documents))
        return json_data

    # returns json objects of images that contain the tags specified in the parameters
    def get_matching_tags(self, tags: list[str]):
        query = self.records.find({"tags": {"$in": tags}})
        rtn = []
        for item in query:
            rtn.append(item)
        return rtn

    #----------------------------------------------------Image Storage------------------------------------------------------
    def get_b2_client(self, endpoint, keyID, applicationKey):
            b2_client = boto3.client(service_name='s3',
                                    endpoint_url=endpoint,                # Backblaze endpoint
                                    aws_access_key_id=keyID,              # Backblaze keyID
                                    aws_secret_access_key=applicationKey) # Backblaze applicationKey
            return b2_client

    # List the keys of the objects in the specified bucket
    def list_object_keys(self, bucket, b2):
        try:
            response = b2.Bucket(bucket).objects.all()

            return_list = []               # create empty list
            for object in response:        # iterate over response
                return_list.append(object.key) # for each item in response append object.key to list
            return return_list             # return list of keys from response

        except ClientError as ce:
            print('error', ce)

    # List browsable URLs of the objects in the specified bucket - Useful for *PUBLIC* buckets
    def list_objects_browsable_url(self, bucket, endpoint, b2):
        try:
            bucket_object_keys = self.list_object_keys(bucket, b2)

            return_list = []                # create empty list
            for key in bucket_object_keys:  # iterate bucket_objects
                url = "%s/%s/%s" % (endpoint, bucket, key) # format and concatenate strings as valid url
                return_list.append(url)     # for each item in bucket_objects append value of 'url' to list
            return return_list              # return list of keys from response

        except ClientError as ce:
            print('error', ce)

    # Return a boto3 resource object for B2 service
    def get_b2_resource(self, endpoint, key_id, application_key):
        b2 = boto3.resource(service_name='s3',
                            endpoint_url=endpoint,                # Backblaze endpoint
                            aws_access_key_id=key_id,              # Backblaze keyID
                            aws_secret_access_key=application_key, # Backblaze applicationKey
                            config = Config(
                                signature_version='s3v4',
                        ))
        return b2

    # Upload specified file into the bucket and also into the database with associated tags and s3 url
    def upload_file(self, file, tags: list[str], b2path=None):
        bucket = self.PUBLIC_BUCKET_NAME
        file_path = os.getcwd() + '/' + file
        remote_path = b2path
        if remote_path is None:
            remote_path = file
        try:
            response = self.b2.Bucket(bucket).upload_file(file_path, remote_path)
        except ClientError as ce:
            print('error', ce)
        
        new_file = {
            "name" : file,
            "s3_url" : "%s/%s/%s" % (self.ENDPOINT_URL, bucket, file),
            "tags" : tags
        }

        self.records.insert_one(new_file)