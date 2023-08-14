from mysite.imageStorage import Utils
import json
import sys

utility = Utils()
input = str(sys.argv[1])
rtn = utility.get_s3_and_tags(input)

rtn = json.dumps(rtn)

if __name__ == "__main__":
    print(rtn)