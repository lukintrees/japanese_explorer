import Vocabulary from "./Vocabulary"

export default function VocabularyList(props){
    const list = props.vocabulary.map(vocabulary => <Vocabulary key={vocabulary.id} vocabulary={vocabulary}/>)
    return <div className="flex flex-col text-center text-white">
                {list}
            </div>
}