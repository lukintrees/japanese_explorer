import Kanji from "./Kanji";

export default function KanjiList(props){
    const list = props.kanji.map(kanji => <Kanji key={kanji.lesson_position} kanji={kanji}/>)
    return <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-px text-center text-white">
                {list}
            </div>
}