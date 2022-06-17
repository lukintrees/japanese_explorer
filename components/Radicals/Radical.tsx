import Image from "next/image";
import Link from "next/link";


export default function Radical(props){
    const data = props.radical.data
    if(data.characters != null){
        return <div className="bg-radical rounded">
            <Link href={"/radical/"+data.slug}>
                <a className="block text-6xl leading-none py-2 text-white hover:text-gray-300">
                    <span className="ja-shadow">{data.characters}</span>
                </a>
            </Link>
            <div className="ja-shadow-light capitalize pb-2 ">{data.meanings[0].meaning}</div>
        </div>
    }else{
        var image
        for(var i = 0;i < data.character_images.length;i++){
            if(data.character_images[i].metadata.dimensions == "64x64" && data.character_images[i].content_type == "image/png"){
                image = data.character_images[i].url
            }
        }
        return <div className="bg-radical rounded">
        <Link href={"/radical/"+data.slug}>
            <a className="block text-6xl leading-none py-2 text-white hover:text-grey-200">
                <Image height="56" width="56" alt={data.slug} src={image} className="inline-block ja-image-shadow"/>
            </a>
        </Link>
        <div className="ja-shadow-light capitalize pb-2 ">{data.meanings[0].meaning}</div>
    </div>
    }
}