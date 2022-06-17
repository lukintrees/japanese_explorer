import Link from "next/link";
import KanjiList from "../Kanji/KanjiList";
import parse from "html-react-parser";
import { toSpan } from "../../utils/utils";

export default function VocabularyPage(props){
    const data = props.vocabulary.data
    var name
    var temp = []
    for(var i = 1;i < data.meanings.length;i++){
        if(data.meanings[i].primary == true){
            name = <p className="dark:text-white">Primary: {data.meanings[i].meaning}</p>
        }else{
            temp.push(data.meanings[i].meaning)
        }
    }
    var altname;
    if(temp.length != 0){
        altname = <p className="dark:text-white">Alternative: {temp.join(", ")}</p>
    }else{
        altname = []
    }
    const mnemonic = parse(toSpan(data.meaning_mnemonic))
    var reading = []
    for(var i = 0;i < data.readings.length;i++){
        reading.push(<span className="dark:text-white text-lg ml-4">{data.readings[i].reading}</span>)
        reading.push(<span>
            <button className="btn leading-none bg-blue-200 hover:bg-blue-300" onClick={() => {new Audio("/audio/"+data.readings[i].reading+"-male.mp3").play()}}>
              <svg className="svg-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M11.536 14.01A8.473 8.473 0 0014.026 8a8.473 8.473 0 00-2.49-6.01l-.708.707A7.476 7.476 0 0113.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"></path><path d="M10.121 12.596A6.48 6.48 0 0012.025 8a6.48 6.48 0 00-1.904-4.596l-.707.707A5.483 5.483 0 0111.025 8a5.483 5.483 0 01-1.61 3.89l.706.706z"></path><path d="M8.707 11.182A4.486 4.486 0 0010.025 8a4.486 4.486 0 00-1.318-3.182L8 5.525A3.489 3.489 0 019.025 8 3.49 3.49 0 018 10.475l.707.707z"></path><path fillRule="evenodd" d="M6.717 3.55A.5.5 0 017 4v8a.5.5 0 01-.812.39L3.825 10.5H1.5A.5.5 0 011 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06z" clipRule="evenodd"></path></svg>
            </button>
          </span>)
        reading.push(<span>
            <button className="btn leading-none bg-red-200 hover:bg-red-300" onClick={() => {new Audio("/audio/"+data.readings[i].reading+"-female.mp3").play()}}>
                <svg className="svg-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M11.536 14.01A8.473 8.473 0 0014.026 8a8.473 8.473 0 00-2.49-6.01l-.708.707A7.476 7.476 0 0113.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"></path><path d="M10.121 12.596A6.48 6.48 0 0012.025 8a6.48 6.48 0 00-1.904-4.596l-.707.707A5.483 5.483 0 0111.025 8a5.483 5.483 0 01-1.61 3.89l.706.706z"></path><path d="M8.707 11.182A4.486 4.486 0 0010.025 8a4.486 4.486 0 00-1.318-3.182L8 5.525A3.489 3.489 0 019.025 8 3.49 3.49 0 018 10.475l.707.707z"></path><path fillRule="evenodd" d="M6.717 3.55A.5.5 0 017 4v8a.5.5 0 01-.812.39L3.825 10.5H1.5A.5.5 0 011 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06z" clipRule="evenodd"></path></svg>
            </button>
          </span>)
    }
    const readmnemonic = parse(toSpan(data.reading_mnemonic))
    var contextsent = []
    if(data.context_sentences != null){
        for(var i = 0;i < data.context_sentences;i++){
            contextsent.push(<><p>{data.context_sentences[i].ja}</p><p>{data.context_sentences[i].en}</p></>)
        }
    }
    return <>
            <div className="items-center flex flex-wrap text-3xl">
                <Link href={"/level/"+data.level}>
                    <a className="bg-gray-600 hover:bg-gray-700 ja-shadow-light mr-2 px-4 py-1 rounded text-white hover:text-white">{data.level}</a>
                </Link>
                <div className="bg-vocab ja-shadow-light text-white mr-4 px-2 py-1 rounded">{data.characters}</div>
                <div className="capitalize dark:text-white">{data.meanings[0].meaning}</div>
            </div>
            <p className="text-2xl mt-4 font-light font-sans dark:text-white">Meaning</p>
            <p className="text-xl font-light font-sans dark:text-white">Name</p>
            {name}
            {altname}
            <span className="dark:text-white">Word type: </span><span className="dark:text-white text-sm">{data.parts_of_speech.join(', ')}</span>
            <p className="text-xl mt-2 font-light font-sans dark:text-white">Explanation</p>
            <p className="dark:text-white">{mnemonic}</p>
            <p className="text-2xl mt-4 font-light font-sans dark:text-white">Reading</p>
            {reading}
            <p className="text-xl mt-2 font-light font-sans dark:text-white">Explanation</p>
            <p className="dark:text-white">{readmnemonic}</p>
            <p className="text-xl mt-2 font-sans dark:text-white">Context Sentences</p>
            <div className="dark:text-white">
                {contextsent}
            </div>
            <p className="text-2xl mt-4 font-light font-sans dark:text-white">Kanji Composition</p>
            <KanjiList kanji={props.kanji} />
            </>
}