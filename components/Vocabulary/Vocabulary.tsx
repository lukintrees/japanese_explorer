import Link from "next/link";

export default function Vocabulary(props){
    const data = props.vocabulary.data
    return <div className="bg-vocab rounded text-left my-[0.5px] p-2">
        <Link href={"/vocabulary/"+data.slug}>
            <a>
                <span className="text-left text-2xl inline-block my-auto">{data.characters}</span>
                <ul className="float-right text-right">
                    <li>{data.readings[0].reading}</li>
                    <li>{data.meanings[0].meaning}</li>
                </ul>
            </a>
        </Link>
    </div>
}