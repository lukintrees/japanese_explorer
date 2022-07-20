const { Sequelize, QueryTypes, DataTypes, Model, Op } = require('sequelize');

const sequelize = new Sequelize('wanikani', 'node', 'password', {
    host: "localhost",
    dialect: "postgres"
})
const mariadb = new Sequelize('wanikani', 'node', 'password', {
    host: 'localhost',
    dialect: 'mariadb'
})
class Subject extends Model{}
Subject.init({
    id: {
        type: DataTypes.SMALLINT,
        primaryKey: true
    },
    object: DataTypes.STRING(128),
    url: DataTypes.STRING(512),
    data_updated_at: DataTypes.STRING(128),
    data: DataTypes.JSONB
},{timestamps:false,sequelize:sequelize,tableName:"subject"})

async function getRadicalsByLevel(level) {
  return sequelize.query("select * from wanikani.subject where object = 'radical' and data -> 'level' = '"+level+"';", {type:QueryTypes.SELECT})
}

async function getKanjiByLevel(level) {
  return sequelize.query("select * from wanikani.subject where object = 'kanji' and data -> 'level' = '"+level+"';", {type:QueryTypes.SELECT})
}

async function getVocabularyByLevel(level) {
  return sequelize.query("select * from wanikani.subject where object = 'vocabulary' and data -> 'level' = '"+level+"';", {type:QueryTypes.SELECT})
}

async function getSubjectById(id) {
  return sequelize.query("select * from wanikani.subject where id = "+ id + ";", {type:QueryTypes.SELECT})
}

async function getRadicals() {
  return sequelize.query("select data -> 'slug' as slug from wanikani.subject where object = 'radical';", {type:QueryTypes.SELECT})
}

async function getKanji() {
  return sequelize.query("select data -> 'slug' as slug from wanikani.subject where object = 'kanji';", {type:QueryTypes.SELECT})
}

async function getVocabulary() {
  return sequelize.query("select data -> 'slug' as slug from wanikani.subject where object = 'vocabulary';", {type:QueryTypes.SELECT})
}

async function getRadicalBySlug(slug) {
  return sequelize.query("select * from wanikani.subject where object = 'radical' and data -> 'slug' ? '"+slug+"';", {type:QueryTypes.SELECT})
}

async function getKanjiBySlug(slug) {
  return sequelize.query("select * from wanikani.subject where object = 'kanji' and data -> 'slug' ? '"+slug+"';", {type:QueryTypes.SELECT})
}

async function getVocabularyBySlug(slug) {
  return sequelize.query("select * from wanikani.subject where object = 'vocabulary' and data -> 'slug' ? '"+slug+"';", {type:QueryTypes.SELECT})
}

export {
  getRadicalsByLevel,
  getKanjiByLevel,
  getVocabularyByLevel,
  getSubjectById,
  getRadicals,
  getRadicalBySlug,
  getKanji,
  getKanjiBySlug,
  getVocabulary,
  getVocabularyBySlug,
};
  


