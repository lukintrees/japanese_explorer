import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import NavBar from '../../components/Decorate/NavBar'
import KanjiList from '../../components/Kanji/KanjiList'
import RadicalList from '../../components/Radicals/RadicalList'
import VocabularyList from '../../components/Vocabulary/VocabularyList'
import { getKanjiByLevel, getRadicalsByLevel, getVocabularyByLevel } from '../../utils/database'

function Level(props){
    const router = useRouter()
    const radicals = JSON.parse(props.radicals)
    const kanji = JSON.parse(props.kanji)
    const vocabulary = JSON.parse(props.vocabulary)
    return <><NavBar/><div className="container mx-5 md:mx-auto bg-white dark:bg-black pt-20 px-10 dark:text-white">
                <h1 className="text-3xl font-sans my-1">{"Level " + router.query['id']}</h1>
                <h2 className="text-2xl font-sans my-2"><span>Radicals</span></h2>
                <RadicalList radicals={radicals}/>
                <h2 className="text-2xl font-sans my-2"><span>Kanji</span></h2>
                <KanjiList kanji={kanji}/>
                <h2 className="text-2xl font-sans my-2"><span>Vocabulary</span></h2>
                <VocabularyList vocabulary={vocabulary}/>
            </div>
            </>
}

export const getStaticPaths: GetStaticPaths = async () => {
    var paths = []
    for(var i = 1;i<61;i++){
        paths.push({params:{id:i.toString()}})
    }
    return {paths,fallback:false}
}

export const getStaticProps: GetStaticProps = async (context) => {
    const radicals = await getRadicalsByLevel(parseInt(context.params.id.toString()))
    const kanji = await getKanjiByLevel(parseInt(context.params.id.toString()))
    const vocabulary = await getVocabularyByLevel(parseInt(context.params.id.toString()))
    return {props:{radicals:JSON.stringify(radicals), kanji:JSON.stringify(kanji), vocabulary:JSON.stringify(vocabulary)}} 
}

export default Level