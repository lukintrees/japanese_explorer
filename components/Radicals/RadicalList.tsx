import Radical from "./Radical"

export default function RadicalList(props){
    const list = props.radicals.map(radical => <Radical key={radical.data.lesson_position} radical={radical}/>)
    return <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-px text-center text-white">
                {list}
            </div>
}