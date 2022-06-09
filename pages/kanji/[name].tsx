import { GetStaticProps, GetStaticPaths } from 'next'
import NavBar from '../../components/Decorate/NavBar'
import KanjiPage from '../../components/Kanji/KanjiPage'
import { getKanji, getKanjiByJPName, getRadicalsById, getVocabularyById} from '../../utils/database'

function kanjiId(props){
  const radicals = JSON.parse(props.radicals)
  const kanji = JSON.parse(props.kanji)
  const vocabulary = JSON.parse(props.vocabulary)
  return <>
            <NavBar/>
            <div className="container mx-5 md:mx-auto pt-20 px-10 text-base">
              <KanjiPage radicals={radicals} kanji={kanji} vocabulary={vocabulary}/>
            </div>
          </>
}

export const getStaticPaths: GetStaticPaths = async () => {
  var kanji = await getKanji()
  var paths = []
  for(var i = 0;i < kanji.length;i++){
    paths.push({params:{name:kanji[i]["jpname"]}})
  }
  return {paths,fallback:false}
}

export const getStaticProps: GetStaticProps = async (context) => {
  const kanji = await getKanjiByJPName(context.params.name.toString())
  const radicals = []
  const vocabulary = []
  var temp = kanji["radicals"].split(",")
  for(var i = 0;i < temp.length;i++){
    var temp1 = await getRadicalsById(parseInt(temp[i]))
    radicals.push(temp1)
  }
  if(kanji["invocabulary"] != ""){
    temp = kanji["invocabulary"].split(",")
    for(var i = 0;i < temp.length;i++){
      var temp1 = await getVocabularyById(parseInt(temp[i]))
      vocabulary.push(temp1)
    }
  }else{
    vocabulary.push("None")
  }
  return {props:{radicals:JSON.stringify(radicals),kanji:JSON.stringify(kanji),vocabulary:JSON.stringify(vocabulary)}} 
}

export default kanjiId