
export function toSpan(string){
    return (string.replaceAll("<radical>",'<span className="radical-highlight text-white">').replaceAll("</radical>","</span>")
    .replaceAll("<ja>",'<span lang="ja">').replaceAll("</ja>",'</span>')
    .replaceAll("<kanji>",'<span className="kanji-highlight text-white">').replaceAll("</kanji>","</span>")
    .replaceAll("<vocabulary>",'<span className="vocabulary-highlight text-white">').replaceAll("</vocabulary>","</span>")
    .replaceAll("<reading>",'<span className="reading-highlight text-white">').replaceAll("</reading>","</span>")
    .replaceAll("<meaning>",'<span className="reading-highlight text-white">').replaceAll("</meaning>","</span>")
    )
}