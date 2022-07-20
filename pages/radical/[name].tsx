import { GetStaticProps, GetStaticPaths } from 'next'
import NavBar from '../../components/Decorate/NavBar'
import { RadicalsPage } from '../../components/Radicals/RadicalsPage'
import { getSubjectById, getRadicals, getRadicalBySlug } from '../../utils/database'

function radicalId(props){
  const radical = JSON.parse(props.radical)
  const kanji = JSON.parse(props.kanji)
  return <>
            <NavBar/>
            <div className="container mx-5 md:mx-auto pt-20 px-10 text-base">
              <RadicalsPage radical={radical} kanji={kanji}/>
            </div>
          </>
}

export const getStaticPaths: GetStaticPaths = async () => {
  var radicals = await getRadicals()
  var paths = []
  for(var i = 0;i < radicals.length;i++){
    paths.push({params:{name:radicals[i]["slug"]}})
  }
  return {paths,fallback:false}
}

export const getStaticProps: GetStaticProps = async (context) => {
  const radicals = (await getRadicalBySlug(context.params.name.toString()))[0]
  const kanji = []
  var temp = radicals["data"]["amalgamation_subject_ids"]
  for(var i = 0;i < temp.length;i++){
    var temp1 = (await getSubjectById(temp[i]))[0]
    kanji.push(temp1)
  }
  return {props:{radical:JSON.stringify(radicals),kanji:JSON.stringify(kanji)}} 
}

export default radicalId