import lxml.html as lx
import requests
import mariadb as db
from progress.bar import IncrementalBar

connection = db.connect(user="node", password="password", host="localhost", database="wanikani")
cursor = connection.cursor()


def write(id1, level, name, jpname, mnemonic, inkanji):
    statement = "INSERT INTO Radicals (id,level,jpname,name,mnemonic,inkanji) VALUES (%s, %s, %s, %s, %s, %s)"
    data = (id1, level, jpname, name, mnemonic, inkanji)
    cursor.execute(statement, data)
    connection.commit()


def write_icon(id1, level, name, jpicon, mnemonic, inkanji):
    statement = "INSERT INTO Radicals (id,level,jpicon,name,mnemonic,inkanji) VALUES (%s, %s, %s, %s, %s, %s)"
    data = (id1, level, jpicon, name, mnemonic, inkanji)
    cursor.execute(statement, data)
    connection.commit()

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

def getRadicals(urlRadical, levels):
    radicals = lx.fromstring(requests.get(url + urlRadical).text).xpath("//section/ul/li")
    bar = IncrementalBar("Radicals levels "+levels, max=len(radicals))
    for radical in radicals:
        id1 = radical.attrib["class"].split(" ")[0].lstrip("radical-")
        radical = lx.fromstring(requests.get(url+radical[1].attrib["href"]).text)
        level = radical.xpath('//body/div[1]/div[3]/div/div/header/h1/a')[0].text
        name = radical.xpath('//*[@id="information"]/div/p')[0].text
        mnemonic = getMnemonic(radical.xpath('//*[@id="information"]/section/p')[0])
        inkanji = []
        for kanji in radical.xpath('//*[@id="amalgamations"]/ul/li'):
            inkanji.append(kanji.attrib["class"].split(" ")[0].lstrip("kanji-"))
        temp = radical.xpath('//body/div[1]/div[3]/div/div/header/h1/span')[0]
        if len(temp)==0:
            jpname = temp.text
            write(id1, level, name, jpname, "`".join(mnemonic), ",".join(inkanji))
        else:
            jpicon = temp[0].attrib["src"]
            write_icon(id1, level, name, jpicon, "`".join(mnemonic), ",".join(inkanji))
        bar.next()
    bar.finish()


url = "http://www.wanikani.com"
getRadicals("/radicals?difficulty=pleasant","1-10")
getRadicals("/radicals?difficulty=painful","11-20")
getRadicals("/radicals?difficulty=death","21-30")
getRadicals("/radicals?difficulty=hell","31-40")
getRadicals("/radicals?difficulty=paradise","41-50")
getRadicals("/radicals?difficulty=reality","51-60")
