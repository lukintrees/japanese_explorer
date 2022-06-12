import requests
from urllib.parse import unquote
from progress.bar import IncrementalBar
import time
import lxml.html as lx

def downloadPage(url):
    page = requests.get(url).text
    if(page.find("Rate limit exceeded") != -1):
        time.sleep(5)
        print("Rate limit!!!!!!")
        page = requests.get(baseurl + url.get("url")).text
    return page

def download(levels):
    urls = []
    for i in range(int(levels.split("-")[0]),int(levels.split("-")[1])+1):
        for j in lx.fromstring(requests.get(baseurl + "/level/"+str(i)).text).xpath(f'//*[@id="level-{str(i)}-vocabulary"]/ul/li/a'):
            urls.append({"url":j.attrib["href"],"level":str(i)})
    bar = IncrementalBar("Page downloaded levels " + levels, max=len(urls))
    for url in urls:
        page = downloadPage(baseurl + url.get("url"))
        open("/home/daniil/Public/wanikani/utils/pages/"+unquote(url.get("url").split("vocabulary")[1])+".html","w").write(page)
        bar.next()
    bar.finish()



baseurl = "http://www.wanikani.com"
download(input("Levels: "))