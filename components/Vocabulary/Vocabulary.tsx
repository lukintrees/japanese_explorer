import Link from "next/link";

export function UnicodeToText(str:string){
    const list = str.split("u")
    var out = ""
    for(let i = 1;i<list.length;i++){
        out += String.fromCharCode(parseInt(list[i],16))
    }
    return out
}

export default function Vocabulary(props){
    const reading = UnicodeToText(props.vocabulary.reading.split(",")[0])
    return  <div className="bg-vocab rounded text-left my-[0.5px] p-2">
        <Link href={"/vocabulary/"+props.vocabulary.jpname}>
            <a>
                <span className="text-left text-2xl inline-block my-auto">{props.vocabulary.jpname}</span>
                <ul className="float-right text-right">
                    <li>{reading}</li>
                    <li>{props.vocabulary.name}</li>
                </ul>
            </a>
        </Link>
    </div>
}