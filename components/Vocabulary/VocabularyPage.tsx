import Link from "next/link";
import KanjiList from "../Kanji/KanjiList";
import { UnicodeToText } from "./Vocabulary";

export default function VocabularyPage(props){
    function playaudio(url){
        var audio = new Audio(url)
        audio.play()
    }
    const name = [<><span className="dark:text-white">Primary: </span><span className="dark:text-white text-sm">{props.vocabulary.name}</span><br/></>]
    if(props.vocabulary.altname != "None"){
        name.push(<><span className="dark:text-white">Alternatives: </span><span className="dark:text-white text-sm">{props.vocabulary.altname}</span><br/></>)
    }
    var temp = props.vocabulary.mnemonic.split("`")
    const mnemonic = temp.map(text => {
        if(text.search("radic-") != -1){return <span className="radical-highlight text-white">{text.split("-")[1]}</span>}
        if(text.search("vocal-") != -1){return <span className="vocabulary-highlight text-white">{text.split("-")[1]}</span>}
        if(text.search("kanji-") != -1){return <span className="kanji-highlight text-white">{text.split("-")[1]}</span>}
        return text    
    })
    temp = props.vocabulary.reading.split(",")
    var reading = []
    for(var i = 0;i < temp.length;i++){
        var read = UnicodeToText(temp[i])
        reading.push(<span className="dark:text-white text-lg ml-4">{read}</span>)
        reading.push(<span>
            <button className="btn leading-none bg-blue-200 hover:bg-blue-300" onClick={() => {playaudio("/audio/"+read+"-male.mp3")}}>
              <svg className="svg-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M11.536 14.01A8.473 8.473 0 0014.026 8a8.473 8.473 0 00-2.49-6.01l-.708.707A7.476 7.476 0 0113.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"></path><path d="M10.121 12.596A6.48 6.48 0 0012.025 8a6.48 6.48 0 00-1.904-4.596l-.707.707A5.483 5.483 0 0111.025 8a5.483 5.483 0 01-1.61 3.89l.706.706z"></path><path d="M8.707 11.182A4.486 4.486 0 0010.025 8a4.486 4.486 0 00-1.318-3.182L8 5.525A3.489 3.489 0 019.025 8 3.49 3.49 0 018 10.475l.707.707z"></path><path fillRule="evenodd" d="M6.717 3.55A.5.5 0 017 4v8a.5.5 0 01-.812.39L3.825 10.5H1.5A.5.5 0 011 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06z" clipRule="evenodd"></path></svg>
            </button>
          </span>)
        reading.push(<span>
            <button className="btn leading-none bg-red-200 hover:bg-red-300" onClick={() => {playaudio("/audio/"+read+"-female.mp3")}}>
                <svg className="svg-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M11.536 14.01A8.473 8.473 0 0014.026 8a8.473 8.473 0 00-2.49-6.01l-.708.707A7.476 7.476 0 0113.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"></path><path d="M10.121 12.596A6.48 6.48 0 0012.025 8a6.48 6.48 0 00-1.904-4.596l-.707.707A5.483 5.483 0 0111.025 8a5.483 5.483 0 01-1.61 3.89l.706.706z"></path><path d="M8.707 11.182A4.486 4.486 0 0010.025 8a4.486 4.486 0 00-1.318-3.182L8 5.525A3.489 3.489 0 019.025 8 3.49 3.49 0 018 10.475l.707.707z"></path><path fillRule="evenodd" d="M6.717 3.55A.5.5 0 017 4v8a.5.5 0 01-.812.39L3.825 10.5H1.5A.5.5 0 011 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06z" clipRule="evenodd"></path></svg>
            </button>
          </span>)
    }
    temp = props.vocabulary.readmnemonic.split("`")
    const readmnemonic = temp.map(value => {
        if(value.search(" ") == -1 && value.search(".") == 0 && value.search('"') == -1){
            if(value.search("kanji-") != -1){
                return <span className="kanji-highlight text-white">{value.split("-")[1]}</span>
            }
            if(value.search("read-") != -1){
                return <span className="reading-highlight text-white">{value.split("-")[1]}</span>
            }
            if(value.search("vocal-") != -1){
                return <span className="vocabulary-highlight text-white">{value.split("-")[1]}</span>
            }
            return <span className="reading-highlight text-white">{value}</span>
        }
        return value
    })
    var context
    if(props.vocabulary.context != "None"){ 
        context = JSON.parse(props.vocabulary.context.replaceAll("'",'"')).map(value => {
            var final = [];
            if(value.name.search("unit") != -1){
                var tmp = value.name.split(" + ")[0]
                final.push(<span key={value.name} className="mr-4">{UnicodeToText(tmp)+" + unit"}</span>)
            }else{
                final.push(<span key={value.name} className="mr-4">{UnicodeToText(value.name)}</span>)
            }
            var te = []
            for(var i = 0;i < value.uses.length;i++){
                te.push(<span key={value.uses[i].english}>
                    <p className="">{UnicodeToText(value.uses[i].japanese)}</p>
                    <p className="">{value.uses[i].english}</p>
                </span>)
            }
            final.push(<div className="flex flex-col">{te}</div>)
            return <div className="flex" key={value.name}>{final}</div>
        })
    }
    var contextsent
    if(props.vocabulary.contextsent != "None"){
        console.log(props.vocabulary.contextsent)
        contextsent = props.vocabulary.contextsent.split("`").map(value => {
            var temp3 = value.split("&")
            return <div key={temp3[1]} className="dark:text-white mt-1">
                <p>{temp3[0]}</p>
                <p>{temp3[1]}</p>
            </div>
        })
    }
    return <>
            <div className="items-center flex flex-wrap text-3xl">
                <Link href={"/level/"+props.vocabulary.level}>
                    <a className="bg-gray-600 hover:bg-gray-700 ja-shadow-light mr-2 px-4 py-1 rounded text-white hover:text-white">{props.vocabulary.level}</a>
                </Link>
                <div className="bg-vocab ja-shadow-light text-white mr-4 px-2 py-1 rounded">{props.vocabulary.jpname}</div>
                <div className="capitalize dark:text-white">{props.vocabulary.name}</div>
            </div>
            <p className="text-2xl mt-4 font-light font-sans dark:text-white">Meaning</p>
            <p className="text-xl font-light font-sans dark:text-white">Name</p>
            {name}
            <span className="dark:text-white">Word type: </span><span className="dark:text-white text-sm">{props.vocabulary.wordtype}</span>
            <p className="text-xl mt-2 font-light font-sans dark:text-white">Explanation</p>
            <p className="dark:text-white">{mnemonic}</p>
            <p className="text-2xl mt-4 font-light font-sans dark:text-white">Reading</p>
            {reading}
            <p className="text-xl mt-2 font-light font-sans dark:text-white">Explanation</p>
            <p className="dark:text-white">{readmnemonic}</p>
            <p className="text-2xl mt-4 font-light font-sans dark:text-white">Context</p>
            <div className="dark:text-white">{context}</div>
            <p className="text-xl mt-2 font-sans dark:text-white">Context Sentences</p>
            {contextsent}
            <p className="text-2xl mt-4 font-light font-sans dark:text-white">Kanji Composition</p>
            <KanjiList kanji={props.kanji} />
            </>
}