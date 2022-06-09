import Link from "next/link"

export default function Kanji(props){
    var reading = "null"
    if(props.kanji.onyomi != "None"){
        if(props.kanji.onyomi.search([","]) == -1){
            reading = props.kanji.onyomi
        }else{
            reading = props.kanji.onyomi.split(",")[0]
        }
    }else{
        if(props.kanji.kunyomi.search([","]) == -1){
            reading = props.kanji.kunyomi
        }else{
            reading = props.kanji.kunyomi.split(",")[0]
        }
    }
    return <div className="rounded bg-kanji">
                <Link href={"/kanji/"+props.kanji.jpname}>
                    <a className="block text-6xl leading-none ja-shadow py-2 text-white">
                        <span className="ja-shadow hover:text-gray-300">{props.kanji.jpname}</span>
                    </a>
                </Link>
                    <div>
                        <div className="ja-shadow-light">{reading}</div>
                    <div className="ja-shadow-light capitalize pb-2">{props.kanji.name}</div>
                </div>
            </div>
}