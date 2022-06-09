import { GetStaticProps, GetStaticPaths } from 'next'
import NavBar from '../../components/Decorate/NavBar'
import { RadicalsPage } from '../../components/Radicals/RadicalsPage'
import { getKanjiById, getRadicals, getRadicalsByName } from '../../utils/database'

function radicalId(props){
  const radicals = JSON.parse(props.radicals)
  const kanji = JSON.parse(props.kanji)
  return <>
            <NavBar/>
            <div className="container mx-5 md:mx-auto pt-20 px-10 text-base">
              <RadicalsPage radicals={radicals} kanji={kanji}/>
            </div>
          </>
}

export const getStaticPaths: GetStaticPaths = async () => {
  var radicals = await getRadicals()
  var paths = []
  for(var i = 0;i < radicals.length;i++){
    paths.push({params:{name:radicals[i]["name"].toLowerCase()}})
  }
  return {paths,fallback:false}
}

export const getStaticProps: GetStaticProps = async (context) => {
  const radicals = await getRadicalsByName(context.params.name.toString())
  const kanji = []
  var temp = radicals["inkanji"].split(",")
  for(var i = 0;i < temp.length;i++){
    var temp1 = await getKanjiById(parseInt(temp[i]))
    kanji.push(temp1)
  }
  return {props:{radicals:JSON.stringify(radicals),kanji:JSON.stringify(kanji)}} 
}

export default radicalId