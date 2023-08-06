import json

def testing():
    result = {"message": "This is a test"}
    return json.dumps(result)

if __name__ == "__main__":
    print(testing())