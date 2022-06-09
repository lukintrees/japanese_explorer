const { Sequelize, DataTypes, Model} = require('sequelize');


const sequelize = new Sequelize("wanikani","node","password",{host:"localhost",dialect:"mariadb"})

class Radicals extends Model{}
Radicals.init({
    id:{
        type: DataTypes.SMALLINT(100),
        defaultValue: 1,
        primaryKey: true
    },
    level:{
        type: DataTypes.SMALLINT(100),
        defaultValue: 1
    },
    jpname: DataTypes.STRING(32),
    jpicon: DataTypes.STRING(64),
    name: DataTypes.STRING(20),
    mnemonic: DataTypes.TEXT,
    inkanji: DataTypes.STRING(1024)
}, {sequelize,timestamps:false})

class Kanji extends Model{}
Kanji.init({
    id:{
        type: DataTypes.SMALLINT(100),
        defaultValue: 1,
        primaryKey: true
    },
    level:{
        type: DataTypes.SMALLINT(100),
        defaultValue: 1
    },
    jpname: DataTypes.STRING(32),
    name: DataTypes.STRING(64),
    altname: DataTypes.STRING(100),
    onyomi: DataTypes.STRING(100),
    kunyomi: DataTypes.STRING(100),
    nanori: DataTypes.STRING(32),
    mnemonic: DataTypes.TEXT,
    readmnemonic: DataTypes.TEXT,
    hints: DataTypes.TEXT,
    invocabulary: DataTypes.STRING(1024),
    radicals: DataTypes.STRING(512),
    readhints: DataTypes.TEXT
}, {sequelize,tableName:"Kanji",timestamps:false,modelName:"Kanji"})

class Vocabulary extends Model{}
Vocabulary.init({
    id:{
        type: DataTypes.SMALLINT(6),
        defaultValue: 1,
        primaryKey: true
    },
    level:{
        type: DataTypes.SMALLINT(6),
        defaultValue: 1
    },
    jpname: DataTypes.STRING(128),
    name: DataTypes.STRING(64),
    altname: DataTypes.STRING(128),
    wordtype: DataTypes.STRING(64),
    mnemonic: DataTypes.TEXT,
    reading: DataTypes.STRING(1024),
    readmnemonic: DataTypes.TEXT,
    context: DataTypes.STRING(4096),
    contextsent: DataTypes.STRING(1024),
    kanjis: DataTypes.STRING(64)
}, {sequelize,tableName:"Vocabulary",timestamps:false,modelName:"Vocabulary"})

async function getRadicalsByLevel(level){
    const radicals = await Radicals.findAll({where:{level:level}})
    return radicals
}

async function getRadicalsById(id){
    const radicals = await Radicals.findByPk(id)
    return radicals
}

async function getKanjiByLevel(level){
    const kanji = await Kanji.findAll({where:{level:level}})
    return kanji
}

async function getKanjiByJPName(jpname){
    const kanji = await Kanji.findOne({where:{jpname:jpname}})
    return kanji
}

async function getKanjiById(id){
    const kanji = await Kanji.findOne({where:{id:id}})
    return kanji
}

async function getVocabularyByLevel(level){
    const vocabulary = await Vocabulary.findAll({where:{level:level}})
    return vocabulary
}

async function getVocabularyById(id){
    const vocabulary = await Vocabulary.findByPk(id)
    return vocabulary
}

async function getRadicalsByName(name){
    const radicals = await Radicals.findOne({where:{name:name.toLowerCase()}})
    return radicals
}

async function getRadicals(){
    const radicals = await Radicals.findAll()
    return radicals
}

async function getKanji(){
    const kanji = await Kanji.findAll()
    return kanji
}

async function getVocabulary(){
    const vocabulary = await Vocabulary.findAll()
    return vocabulary
}

async function getVocabularyByJPName(jpname){
    const vocabulary = await Vocabulary.findOne({where:{jpname:jpname}})
    return vocabulary
}


export {getVocabularyByJPName,getVocabulary,getKanji,getKanjiByJPName,getRadicalsByLevel, getRadicalsById, getKanjiByLevel, getKanjiById, getVocabularyByLevel, getVocabularyById, getRadicalsByName, getRadicals}