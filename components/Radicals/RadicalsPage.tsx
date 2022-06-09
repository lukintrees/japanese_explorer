import Link from "next/link";
import KanjiList from "../Kanji/KanjiList";

export function RadicalsPage(props){
    var temp = props.radicals.mnemonic.split("`");
    const mnemonic = temp.map(text => {if(text.search("radic-") == -1){return text}else{return <span className="radical-highlight text-white">{text.split("-")[1]}</span>}})
    return <>
              <div className="items-center flex flex-wrap text-3xl">
                <Link href={"/level/"+props.radicals.level}>
                    <a className="bg-gray-600 hover:bg-gray-700 ja-shadow-light mr-2 px-4 py-1 rounded text-white hover:text-white">{props.radicals.level}</a>
                </Link>
                <div className="bg-radical text-white mr-4 px-2 py-1 rounded">
                  <span className="ja-shadow-light">{props.radicals.jpname}</span>
                </div>
                <div className="capitalize font-light dark:text-white">{props.radicals.name}</div>
              </div>
              <p className="text-3xl mt-4 font-light font-sans dark:text-white">Name</p>
              <span className="dark:text-white">Primary: </span><span className="dark:text-white text-sm">{props.radicals.name}</span>
              <p className="text-xl mt-2 dark:text-white">Mnemonic</p>
              <div className="dark:text-white mt-1">
                {mnemonic}
              </div>
              <p className="text-3xl mt-6 mb-3 font-sans dark:text-white">Found in Kanji</p>
              <KanjiList kanji={props.kanji}/>
          </>
}