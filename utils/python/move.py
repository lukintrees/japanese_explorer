import json
import mariadb as db
from progress.bar import IncrementalBar
connection = db.connect(user="node", password="password", host="localhost", database="wanikani")
cursor = connection.cursor()
data = json.loads(open("response.json","r").read())

def write(id1,object1,url,data_updated_at,data):
    statement = f"INSERT INTO Subject (id,object,url,data_updated_at,data) VALUES ({id1},'{object1}','{url}','{data_updated_at}','{data}'"
    print(statement)
    cursor.execute(statement)
    connection.commit()

bar = IncrementalBar("Completed",max=len(data))
for i in data:
    write(i["id"],i["object"],i["url"],i["data_updated_at"],json.dumps(data).replace("'","&#39;"))
    bar.next()
bar.finish()
