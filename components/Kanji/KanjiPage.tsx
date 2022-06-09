import Link from "next/link";
import RadicalList from "../Radicals/RadicalList";
import VocabularyList from "../Vocabulary/VocabularyList";

export default function KanjiPage(props){
    var temp = props.kanji.mnemonic.split("`");
    const mnemonic = temp.map(text => {
        if(text.search("radic-") != -1){return <span className="radical-highlight text-white">{text.split("-")[1]}</span>}
        if(text.search("kanji-") != -1){return <span className="kanji-highlight text-white">{text.split("-")[1]}</span>}
        return text    
    })
    const name = [<><span className="dark:text-white">Primary: </span><span className="dark:text-white text-sm">{props.kanji.name}</span><br/></>]
    if(props.kanji.altname != "None"){
        name.push(<><span className="dark:text-white">Alternatives: </span><span className="dark:text-white text-sm">{props.kanji.altname}</span></>)
    }
    temp = props.kanji.hints.split("`")
    const hints = temp.map(value => {
        if(value.search(" ") == -1 && value.search(".") == 0 && value.search('"') == -1){
            return <span className="reading-highlight text-white">{value}</span>
        }
        return value
    })
    temp = props.kanji.readmnemonic.split("`")
    const readmnemonic = temp.map(value => {
        if(value.search(" ") == -1 && value.search(".") == 0 && value.search('"') == -1){
            if(value.search("radic-") != -1){
                return <span className="radical-highlight text-white">{value.split("-")[1]}</span>
            }
            if(value.search("kanji-") != -1){
                return <span className="kanji-highlight text-white">{value.split("-")[1]}</span>
            }
            if(value.search("read-") != -1){
                return <span className="reading-highlight text-white">{value.split("-")[1]}</span>
            }
            return <span className="reading-highlight text-white">{value}</span>
        }
        return value
    })
    temp = props.kanji.readhints.split("`")
    const readhints = temp.map(value => {
        if(value.search(" ") == -1 && value.search(".") == 0 && value.search('"') == -1){
            if(value.search("radic-") != -1){
                return <span className="radical-highlight text-white">{value.split("-")[1]}</span>
            }
            if(value.search("kanji-") != -1){
                return <span className="kanji-highlight text-white">{value.split("-")[1]}</span>
            }
            if(value.search("read-") != -1){
                return <span className="reading-highlight text-white">{value.split("-")[1]}</span>
            }
            return <span className="reading-highlight text-white">{value}</span>
        }
        return value
    })
    var vocabulary
    if(props.vocabulary[0] == "None"){
        vocabulary = <p className="text-xl dark:text-white">Not any vocabulary</p>
    }else{
        vocabulary = <VocabularyList vocabulary={props.vocabulary}/>
    }
    return <>
            <div className="items-center flex flex-wrap text-3xl">
                <Link href={"/level/"+props.kanji.level}>
                    <a className="bg-gray-600 hover:bg-gray-700 ja-shadow-light mr-2 px-4 py-1 rounded text-white hover:text-white">{props.kanji.level}</a>
                </Link>
                <div className="bg-kanji ja-shadow-light text-white mr-4 px-2 py-1 rounded">{props.kanji.jpname}</div>
                <div className="capitalize dark:text-white">{props.kanji.name}</div>
            </div>
            <p className="text-2xl mt-4 font-light font-sans dark:text-white">Radical Combination</p>
            <RadicalList radicals={props.radicals}/>
            <p className="text-2xl mt-4 font-light font-sans dark:text-white">Meaning</p>
            <p className="text-xl font-light font-sans dark:text-white">Name</p>
            {name}
            <p className="text-xl mt-2 font-light font-sans dark:text-white">Mnemonic</p>
            <p className="dark:text-white">{mnemonic}</p>
            <div className="bg-slate-300 dark:bg-gray-700 py-3 mt-2 px-1 dark:text-white">
                <p className="text-lg ">Hints</p>
                <p className="text-base">{hints}</p>
            </div>
            <p className="text-2xl mt-4 font-light font-sans dark:text-white">Reading</p>
            <div className="grid grid-cols-3">
                    <div><p className="text-xl font-sans dark:text-white">On&#39;yomi</p><p className="text-base font-sans dark:text-white">{props.kanji.onyomi}</p></div>
                    <div><p className="text-xl font-sans dark:text-white">Kun&#39;yomi</p><p className="text-base font-sans dark:text-white">{props.kanji.kunyomi}</p></div>
                    <div><p className="text-xl font-sans dark:text-white">Nanori</p><p className="text-base font-sans dark:text-white">{props.kanji.nanori}</p></div>
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