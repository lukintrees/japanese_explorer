import Link from "next/link";
import RadicalList from "../Radicals/RadicalList";
import VocabularyList from "../Vocabulary/VocabularyList";
import { toSpan } from "../../utils/utils";
import parse from "html-react-parser";

export default function KanjiPage(props){
    const data = props.kanji.data
    const mnemonic = parse(toSpan(data.meaning_mnemonic))
    var name
    var temp = []
    for(var i = 0;i < data.meanings.length;i++){
        if(data.meanings[i].primary == true){
            name = data.meanings[i].meaning
        }else{
            temp.push(data.meanings[i].meaning)
        }
    }
    var altname;
    if(temp.length != 0){
        altname = <span className="dark:text-white">{temp.join(",")}</span>
    }else{
        altname = []
    }
    var hints;
    if(data.meaning_hint != null){
        hints = parse(toSpan(data.meaning_hint))
    }else{
        hints = []
    }
    const readmnemonic = parse(toSpan(data.reading_mnemonic))
    var readhints;
    if(data.reading_hint != null){
       readhints = parse(toSpan(data.reading_hint)) 
    }
    var vocabulary
    if(props.vocabulary == "None"){
        vocabulary = <p className="text-xl dark:text-white">Not any vocabulary</p>
    }else{
        vocabulary = <VocabularyList vocabulary={props.vocabulary}/>
    }
    var onyomi = "None";
    var kunyomi = "None";
    var nanori = "None";
    for(var i = 0;i < data.readings.length;i++){
        if(data.readings[i].type == "onyomi"){
            onyomi = data.readings[i].reading
            continue
        }
        if(data.readings[i].type == "kunyomi"){
            kunyomi = data.readings[i].reading
        }
        if(data.readings[i].type == "nanori"){
            nanori = data.readings[i].reading
        }
    }
    return <>
            <div className="items-center flex flex-wrap text-3xl">
                <Link href={"/level/"+data.level}>
                    <a className="bg-gray-600 hover:bg-gray-700 ja-shadow-light mr-2 px-4 py-1 rounded text-white hover:text-white">{data.level}</a>
                </Link>
                <div className="bg-kanji ja-shadow-light text-white mr-4 px-2 py-1 rounded">{data.characters}</div>
                <div className="capitalize dark:text-white">{props.kanji.name}</div>
            </div>
            <p className="text-2xl mt-4 font-light font-sans dark:text-white">Radical Combination</p>
            <RadicalList radicals={props.radicals}/>
            <p className="text-2xl mt-4 font-light font-sans dark:text-white">Meaning</p>
            <p className="text-xl font-light font-sans dark:text-white">Name</p>
            <p className="dark:text-white">Primary: {name}</p>
            {altname}
            <p className="text-xl mt-2 font-light font-sans dark:text-white">Mnemonic</p>
            <p className="dark:text-white">{mnemonic}</p>
            <div className="bg-slate-300 dark:bg-gray-700 py-3 mt-2 px-1 dark:text-white">
                <p className="text-lg ">Hints</p>
                <p className="text-base">{hints}</p>
            </div>
            <p className="text-2xl mt-4 font-light font-sans dark:text-white">Reading</p>
            <div className="grid grid-cols-3">
                    <div><p className="text-xl font-sans dark:text-white">On&#39;yomi</p><p className="text-base font-sans dark:text-white">{onyomi}</p></div>
                    <div><p className="text-xl font-sans dark:text-white">Kun&#39;yomi</p><p className="text-base font-sans dark:text-white">{kunyomi}</p></div>
                    <div><p className="text-xl font-sans dark:text-white">Nanori</p><p className="text-base font-sans dark:text-white">{nanori}</p></div>
            </div>
            <p className="text-xl mt-2 font-light font-sans dark:text-white">Mnemonic</p>
            <p className="dark:text-white">{readmnemonic}</p>
            <div className="bg-slate-300 dark:bg-gray-700 py-3 mt-2 px-1 dark:text-white">
                <p className="text-lg">Hints</p>
                <p className="text-base">{readhints}</p>
            </div>
            <p className="text-2xl mt-4 font-sans dark:text-white">Found in vocabulary</p>
            <div>
                {vocabulary}
            </div>
            </>
}