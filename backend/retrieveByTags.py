from mysite.imageStorage import Utils
import json
import sys

utility = Utils()
input_json = sys.argv[1]
input_array = json.loads(input_json)
rtn = utility.get_matching_tags(input_array)

rtn = json.dumps(rtn)

if __name__ == "__main__":
    print(rtn)