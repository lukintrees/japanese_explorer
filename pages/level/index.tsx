import NavBar from "../../components/Decorate/NavBar"
import Link from "next/link"

 export default function Levels(){
     const list = []
     for(var i = 0;i < 60;i++){
         list.push(<Link key={i} href={"/level/"+(i+1)}><a className="block leading-none bg-gray-300 p-4 text-3xl font-sans rounded">{i+1}</a></Link>)
     }
     return <><NavBar/><div className="mx-5 md:mx-20 dark:bg-black pt-20 grid grid-cols-5 md:grid-cols-10 gap-px text-center text-white">
            {list}
            </div></>
 }