import { GetStaticProps, GetStaticPaths } from 'next'
import NavBar from '../../components/Decorate/NavBar'
import KanjiPage from '../../components/Kanji/KanjiPage'
import { getKanji, getKanjiBySlug, getSubjectById} from '../../utils/database'

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
    paths.push({params:{name:kanji[i]["data"]["slug"]}})
  }
  return {paths,fallback:false}
}

export const getStaticProps: GetStaticProps = async (context) => {
  const kanji = (await getKanjiBySlug(context.params.name.toString()))[0]
  const radicals = []
  var vocabulary;
  var temp = kanji["data"]["component_subject_ids"]
  for(var i = 0;i < temp.length;i++){
    var temp1 = (await getSubjectById(temp[i]))[0]
    radicals.push(temp1)
  }
  if(kanji["data"]["amalgamation_subject_ids"] != []){
    vocabulary = []
    temp = kanji["data"]["amalgamation_subject_ids"]
    for(var i = 0;i < temp.length;i++){
      var temp1 = (await getSubjectById(temp[i]))[0]
      vocabulary.push(temp1)
    }
  }else{
    vocabulary = "None"
  }
  return {props:{radicals:JSON.stringify(radicals),kanji:JSON.stringify(kanji),vocabulary:JSON.stringify(vocabulary)}} 
}

export default kanjiId