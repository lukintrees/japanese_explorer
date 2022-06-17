import Link from "next/link"

export default function Kanji(props){
    const data = props.kanji.data
    var reading
    for(var i = 0;i < data.readings.length;i++){
        if(data.readings[i].primary == true){
            reading = data.readings[i].primary
        }
    }
    return <div className="rounded bg-kanji">
                <Link href={"/kanji/"+data.slug}>
                    <a className="block text-6xl leading-none ja-shadow py-2 text-white">
                        <span className="ja-shadow hover:text-gray-300">{data.characters}</span>
                    </a>
                </Link>
                    <div>
                        <div className="ja-shadow-light">{reading}</div>
                    <div className="ja-shadow-light capitalize pb-2">{data.meanings[0].meaning}</div>
                </div>
            </div>
}