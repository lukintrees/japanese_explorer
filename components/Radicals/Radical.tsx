import Link from "next/link";


export default function Radical(props){
    if(props.radical.jpicon == null){
        return <div className="bg-radical rounded">
            <Link href={"/radical/"+props.radical.name.toLowerCase()}>
                <a className="block text-6xl leading-none py-2 text-white hover:text-gray-300">
                    <span className="ja-shadow">{props.radical.jpname}</span>
                </a>
            </Link>
            <div className="ja-shadow-light capitalize pb-2 ">{props.radical.name}</div>
        </div>
    }else{
        return <div className="bg-radical rounded">
        <Link href={"/radical/"+props.radical.name.toLowerCase()}>
            <a className="block text-6xl leading-none py-2 text-white hover:text-grey-200">
                <img src={props.radical.jpicon} className="ja-shadow h-14 w-14 inline-block ja-image-shadow"/>
            </a>
        </Link>
        <div className="ja-shadow-light capitalize pb-2 ">{props.radical.name}</div>
    </div>
    }
}