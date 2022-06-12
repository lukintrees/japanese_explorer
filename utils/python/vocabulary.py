from concurrent.futures import ThreadPoolExecutor
import json
import lxml.html as lx
import requests
import mariadb as db
from progress.bar import IncrementalBar

connection = db.connect(user="node", password="password", host="localhost", database="wanikani")
cursor = connection.cursor()

def write(id1,level,jpname,name,altname,wordtype,mnemonic,reading,readmnemonic,context,contextsent,kanjis):
    statement = f'INSERT INTO Vocabulary (id,level,jpname,name,altname,wordtype,mnemonic,reading,readmnemonic,context,contextsent,kanjis) VALUES ({id1},{level},"{jpname}","{name}","{altname}","{wordtype}","{mnemonic}","{reading}","{readmnemonic}","{context}","{contextsent}","{kanjis}")'
    cursor.execute(statement)
    connection.commit()

def getMnemonic(temp):
    final = []
    j = 0
    for a in temp:
        for i in a.itertext():
            i = i.replace('"',"'").replace("'","&#39;")
            if i.find(" ") != -1 or i.find(".") != -1:
                final.append(i)
            else:
                try:
                    tp = temp[j].attrib["class"].split("-")[0]
                    if tp == "radical":
                        final.append(f'radic-{temp[j].text_content()}')
                    elif tp == "reading":
                        final.append(f'read-{temp[j].text_content()}')
                    elif tp == "vocabulary":
                        final.append(f'vocal-{temp[j].text_content()}')
                    else:
                        final.append(f'kanji-{temp[j].text_content()}')
                    j += 1
                except:
                    final.append(i)
        final[len(final)-1] += "\n"
    return final 

def getReadingold(temp):
    final = []
    temp = json.loads(temp.attrib["data-react-props"])
    for i in temp['pronunciationAudios']:
        if i["contentType"] == 'audio/mpeg':
            final.append({"reading": i['metadata']['pronunciation'],"url":i['url'],"gender":i['metadata']['gender']})
    return final

def getReading(temp):
    final = []
    for i in temp:
        final.append(i.text)
    return ','.join(final)
    
    

def getContext(temp):
    final = []
    tp = []
    tp1 = []
    temp = json.loads(temp.attrib["data-react-props"])
    for i in temp['collocationsData']:
        if i['patternOfUse'] not in tp:
            tp.append(i['patternOfUse'])
    while len(tp) != len(tp1):
        tp1.append([])
    for i in temp['collocationsData']:
        index = tp.index(i['patternOfUse'])
        tp1[index].append({'japanese': i['japanese'],'english': i['english']})
    if len(tp) > 1:
        for i in range(len(tp)):
            final.append({"name":tp[i],"uses":tp1[i]})
    else:
        final.append({"name":tp[0],"uses":tp1[0]})
    return final

def getContextSent(temp):
    final = []
    for i in temp:
        final.append(i[0].text.replace('"',"'").replace("'","&#39;")+"&"+i[1].text.replace('"',"'").replace("'","&#39;"))
    return final

def getVocabulary(vocabulary):
    id1 = vocabulary.attrib["class"].split(" ")[0].lstrip("vocabulary-")
    vocabulary = lx.parse(filesource + vocabulary[1].attrib["href"].split("/")[2] + ".html")
    temp = vocabulary.xpath('//body/div[1]/div[3]/div/div/header/h1')[0]
    level = temp[0].text
    jpname = temp[1].text
    temp = vocabulary.xpath('//*[@id="meaning"]/div')
    altname = "None"
    wordtype = "None"
    for i in temp:
        if i[0].text == "Primary":
            name = i[1].text
        elif i[0].text == "Alternative":
            altname = i[1].text
        elif i[0].text == "Word Type":
            wordtype = i[1].text
    try:
        mnemonic = getMnemonic(vocabulary.xpath('//*[@id="meaning"]/section/p'))
    except:
        mnemonic = "None"
    try:
        reading = getReading(vocabulary.xpath('//p[@class="pronunciation-variant"]'))
    except IndexError:
        reading = "None"
    try:
        readmnemonic = getMnemonic(vocabulary.xpath('//*[@id="reading"]/section/p'))
    except IndexError:
        readmnemonic = "None"
    temp = vocabulary.xpath('//*[@id="context"]/section/div')
    if len(temp) != 0:
        context = json.dumps(getContext(vocabulary.xpath('//*[@id="context"]/section/div')[0])).replace('"',"'")
    else:
        context = "None"
    try:
        contextsent = "`".join(getContextSent(vocabulary.xpath('//*[@id="context"]/div')))
    except:
        contextsent = "None"
    kanjis = [i.attrib["class"].split(" ")[0].lstrip("kanji-") for i in vocabulary.xpath('//*[@id="components"]/ul/li')]
    write(id1,level,jpname,name,altname,wordtype,"`".join(mnemonic),reading.replace('"',"'"),"`".join(readmnemonic).replace('"','"'),context,contextsent,",".join(kanjis))
    bar.next()

url = "http://www.wanikani.com"
filesource = "/home/daniil/Public/wanikani/utils/pages/"
levels = input("Levels: ")
vocabularys = []
bar = IncrementalBar("Download levels " + levels, max=int(levels.split("-")[1])-int(levels.split("-")[0])+1)
for i in range(int(levels.split("-")[0]),int(levels.split("-")[1])+1):
    vocabularys += lx.fromstring(requests.get(url + "/level/"+str(i)).text).xpath(f'//*[@id="level-{str(i)}-vocabulary"]/ul/li')
    bar.next()
bar.finish()
bar = IncrementalBar("Vocabulary levels " + levels, max=len(vocabularys))
for vocabulary in vocabularys:
    getVocabulary(vocabulary)
bar.finish()