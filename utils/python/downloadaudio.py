import requests
import json
from progress.bar import IncrementalBar
import lxml.html as lx
from os.path import exists

def getReading(temp):
    final = []
    temp = json.loads(temp.attrib["data-react-props"])
    for i in temp['pronunciationAudios']:
        if i["contentType"] == 'audio/mpeg':
            final.append({"reading": i['metadata']['pronunciation'],"url":i['url'],"gender":i['metadata']['gender']})
    return final

def download(levels):
    vocabularys = []
    for i in range(int(levels.split("-")[0]),int(levels.split("-")[1])+1):
        vocabularys += lx.fromstring(requests.get(url + "/level/"+str(i)).text).xpath(f'//*[@id="level-{str(i)}-vocabulary"]/ul/li')
    bar = IncrementalBar("Audio downloaded levels " + levels, max=len(vocabularys))
    for vocabulary in vocabularys:
        vocabulary = lx.fromstring(requests.get(url + vocabulary[1].attrib["href"]).text)
        try:
            reading = getReading(vocabulary.xpath('//*[@id="reading"]/div')[0])
            for i in range(len(reading)):
                read = reading[i].get('reading')
                gender = reading[i].get('gender')
                if(not exists(f"/home/daniil/Public/wanikani/public/audio/{read}-{gender}.mp3")):
                    content = requests.get(reading[i].get("url")).content
                    open(f"/home/daniil/Public/wanikani/public/audio/{read}-{gender}.mp3","wb").write(content)
        except IndexError:
            reading = "None"
        bar.next()
    bar.finish()

url = "http://www.wanikani.com"
download(input("Levels: "))