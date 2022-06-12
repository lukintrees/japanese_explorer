import shutil
import os


fileSource = "/home/daniil/Public/wanikani/utils/pages/"
for i in os.walk(fileSource):
    if(i[0] == fileSource):
        continue
    for j in i[2]:
        shutil.move(i[0]+"/"+j,fileSource)
