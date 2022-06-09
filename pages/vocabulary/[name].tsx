import { GetStaticProps, GetStaticPaths } from 'next'
import NavBar from '../../components/Decorate/NavBar'
import VocabularyPage from '../../components/Vocabulary/VocabularyPage'
import { getKanjiById, getRadicals, getRadicalsByName, getVocabulary, getVocabularyByJPName } from '../../utils/database'

function vocabularyId(props){
  const kanji = JSON.parse(props.kanji)
  const vocabulary = JSON.parse(props.vocabulary)
  return <>
            <NavBar/>
            <div className="container mx-5 md:mx-auto pt-20 px-10 text-base">
                <VocabularyPage vocabulary={vocabulary} kanji={kanji}/>
            </div>
          </>
}

export const getStaticPaths: GetStaticPaths = async () => {
  var vocabulary = await getVocabulary()
  var paths = []
  for(var i = 0;i < vocabulary.length;i++){
    paths.push({params:{name:vocabulary[i]["jpname"]}})
  }
  return {paths,fallback:false}
}

export const getStaticProps: GetStaticProps = async (context) => {
  const vocabulary = await getVocabularyByJPName(context.params.name.toString())
  const kanji = []
  var temp = vocabulary["kanjis"].split(",")
  for(var i = 0;i < temp.length;i++){
    var temp1 = await getKanjiById(parseInt(temp[i]))
    kanji.push(temp1)
  }
  return {props:{vocabulary:JSON.stringify(vocabulary),kanji:JSON.stringify(kanji)}} 
}

export default vocabularyId