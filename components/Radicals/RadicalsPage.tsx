import parse from "html-react-parser";
import Link from "next/link";
import KanjiList from "../Kanji/KanjiList";
import { toSpan } from "../../utils/utils";
import Image from "next/image";

export function RadicalsPage(props){
    const data = props.radical.data
    const mnemonic = parse(toSpan(data.meaning_mnemonic))
    var image
    if(data.characters != null){
      image = <span className="ja-shadow-light">{data.characters}</span>
    }else{
      var url
      for(var i = 0;i < data.character_images.length;i++){
        if(data.character_images[i].metadata.dimensions == "64x64" && data.character_images[i].metadata.content_type == "image/png"){
          url = data.character_images[i].url
        }
      }
      image = <Image height="40" width="40" alt={data.slug} src={url} className="ja-shadow inline-block ja-image-shadow"/>
    }
    const altname = []
    for(var i = 1;i < data.meanings.length;i++){
      altname.push(data.meanings[i].meaning)
    }
    return <>
              <div className="items-center flex flex-wrap text-3xl">
                <Link href={"/level/"+data.level}>
                    <a className="bg-gray-600 hover:bg-gray-700 ja-shadow-light mr-2 px-4 py-1 rounded text-white hover:text-white">{data.level}</a>
                </Link>
                <div className="bg-radical text-white mr-4 px-2 py-1 rounded">
                  {image}
                </div>
                <div className="capitalize font-light dark:text-white">{data.meanings[0].meaning}</div>
              </div>
              <p className="text-3xl mt-4 font-light font-sans dark:text-white">Name</p>
              <span className="dark:text-white">Primary: </span><span className="dark:text-white text-sm">{data.meanings[0].meaning}</span><br/>
              <span className="dark:text-white">Alternative: </span><span className="dark:text-white text-sm">{altname.join(", ")}</span>
              <p className="text-xl mt-2 dark:text-white">Mnemonic</p>
              <div className="dark:text-white mt-1">
                {mnemonic}
              </div>
              <p className="text-3xl mt-6 mb-3 font-sans dark:text-white">Found in Kanji</p>
              <KanjiList kanji={props.kanji}/>
          </>
}