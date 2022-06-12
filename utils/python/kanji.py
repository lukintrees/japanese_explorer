import lxml.html as lx
import requests
import mariadb as db
from progress.bar import IncrementalBar
import json

connection = db.connect(user="node", password="password", host="localhost", database="wanikani")
cursor = connection.cursor()

def getMnemonic(temp):
    final = []
    j = 0
    for i in temp.itertext():
        i = i.replace('"',"'")
        if i.find(" ") != -1 or i.find(".") != -1:
            final.append(i)
        else:
            try:
                tp = temp[j].attrib["class"].split("-")[0]
                if tp == "radical":
                    final.append(f'radic-{temp[j].text}')
                elif tp == "reading":
                    final.append(f'read-{temp[j].text}')
                elif tp == "vocabulary":
                    final.append(f'vocal-{temp[j].text}')
                else:
                    final.append(f'kanji-{temp[j].text}')
                j += 1
            except:
                final.append(i)
    return final

def getHints(temp):
    final = []
    for p in temp:
        j = 0
        for i in p.itertext():
            i = i.replace('"',"'")
            if i.find(" ") != -1 or i.find(".") != -1:
                final.append(i)
            else:
                try:
                    tp = temp[j].attrib["class"].split("-")[0]
                    if tp == "radical":
                        final.append(f'radic-{temp[j].text}')
                    elif tp == "reading":
                        final.append(f'read-{temp[j].text}')
                    elif tp == "vocabulary":
                        final.append(f'vocal-{temp[j].text}')
                    else:
                        final.append(f'kanji-{temp[j].text}')
                    j += 1
                except:
                    final.append(i)
        if p.getnext() != None:
            final.append("\n\n")
    return final
    
        


def write(id1, level, jpname, name, altname, radical, mnemonic, readmnemonic, onyomi, kunyomi, nanori, hints, readhints,
          invocabulary):
    statement = f'INSERT INTO Kanji (id,level,jpname,name,altname,onyomi,kunyomi,nanori,mnemonic,readmnemonic,hints,invocabulary,radicals,readhints) VALUES ({id1},{level},"{jpname}","{name}","{altname}","{onyomi}","{kunyomi}","{nanori}","{mnemonic}","{readmnemonic}","{hints}","{invocabulary}","{radical}","{readhints}")'
    cursor.execute(statement)
    connection.commit()


def getKanji(urlKanji, levels):
    kanjis = lx.fromstring(requests.get(url + urlKanji).text).xpath("//section/ul/li")
    bar = IncrementalBar("Kanji levels " + levels, max=len(kanjis))
    for kanji in kanjis:
        id1 = kanji.attrib["class"].split(" ")[0].lstrip("kanji-")
        kanji = lx.fromstring(requests.get(url + kanji[1].attrib["href"]).text)
        temp = kanji.xpath('//body/div[1]/div[3]/div/div/header/h1')[0]
        level = temp[0].text
        jpname = temp[1].text
        radical = [i.attrib["class"].split(" ")[0].lstrip("radical-") for i in
                   kanji.xpath('//*[@id="components"]/ul/li')]
        name = kanji.xpath('//*[@id="meaning"]/div[1]/p')[0].text
        temp = kanji.xpath('//*[@id="meaning"]/div[2]/p')
        if temp != []:
            altname = temp[0].text
        else:
            altname = "None"
        mnemonic = getMnemonic(kanji.xpath('//*[@id="meaning"]/section/p')[0])
        readmnemonic = getMnemonic(kanji.xpath('//*[@id="reading"]/section/p')[0])
        temp = kanji.xpath('//*[@id="reading"]/div/div/p')
        if temp[0] != "None":
            onyomi = ",".join(temp[0].text.strip().split(", "))
        else:
            onyomi = temp[0]
        if temp[1] != "None":
            kunyomi = ",".join(temp[1].text.strip().split(", "))
        else:
            kunyomi = temp[1]
        if temp[2] == "None":
            nanori = temp[2]
        else:
            nanori = "None"
        hints = getHints(kanji.xpath('//*[@id="meaning"]/section/aside/p'))
        readhints = getHints(kanji.xpath('//*[@id="reading"]/section/aside/p'))
        invocabulary = [i.attrib["class"].split(" ")[0].lstrip("vocabulary-") for i in
                        kanji.xpath('//*[@id="amalgamations"]/ul/li')]
        write(id1, level, jpname, name, altname, ",".join(radical), "`".join(mnemonic), "`".join(readmnemonic), onyomi, kunyomi, nanori, "`".join(hints),
              "`".join(readhints), ",".join(invocabulary))
        bar.next()
    bar.finish()


url = "http://www.wanikani.com"
getKanji("/kanji?difficulty=pleasant", "1-10")
getKanji("/kanji?difficulty=painful", "11-20")
getKanji("/kanji?difficulty=death", "21-30")
getKanji("/kanji?difficulty=hell", "31-40")
getKanji("/kanji?difficulty=paradise", "41-50")
getKanji("/kanji?difficulty=reality", "51-60")
