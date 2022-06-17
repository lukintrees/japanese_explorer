from concurrent.futures import ThreadPoolExecutor
import requests
from urllib.parse import unquote
from progress.bar import IncrementalBar
import time
import lxml.html as lx

def download(url):
    page = requests.get(url.get("url")).text
    if(page.find("Rate limit exceeded") != -1):
        time.sleep(5)
        print("Rate limit!!!!!!")
        page = requests.get(baseurl + url.get("url")).text
    open("/home/daniil/Public/wanikani/utils/pages/"+unquote(url.get("url").split("www.wanikani.com")[1])+".html","w").write(page)
    bar.next()
    return "None"



baseurl = "http://www.wanikani.com"
objectType = int(input("1.vocab 2.kanji 3.radical "))
if(objectType == 1):
    objectType = "vocabulary"
elif(objectType == 2):
    objectType = "kanji"
else:
    objectType = "radicals"
levels = input("Levels: ")
urls = []
for i in range(int(levels.split("-")[0]),int(levels.split("-")[1])+1):
    for j in lx.fromstring(requests.get(baseurl + "/level/"+str(i)).text).xpath(f'//*[@id="level-{str(i)}-{objectType}"]/ul/li/a'):
        urls.append({"url":baseurl + j.attrib["href"],"level":str(i)})
bar = IncrementalBar("Page downloaded levels " + levels, max=len(urls))
with ThreadPoolExecutor(4) as executor:
    result = executor.map(download, urls)
bar.finish()