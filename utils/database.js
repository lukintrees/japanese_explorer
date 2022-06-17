const { Sequelize, DataTypes, Model, QueryTypes } = require("sequelize");
const {createClient} = require("redis")
const cliProgress = require('cli-progress');
const sequelize = new Sequelize("wanikani", "node", "password", {
  host: "localhost",
  dialect: "mariadb",
});
const redis = createClient()
class Subject extends Model {}
Subject.init(
  {
    id: {
      type: DataTypes.SMALLINT(6),
      defaultValue: 1,
      primaryKey: true,
    },
    level: {
      type: DataTypes.SMALLINT(6),
    },
    object: {
      type: DataTypes.STRING(128),
    },
    url: {
      type: DataTypes.STRING(1024),
    },
    data_updated_at: {
      type: DataTypes.STRING(128),
    },
    data: {
      type: DataTypes.TEXT("long"),
    },
  },
  { sequelize, timestamps: false, tableName: "Subject" }
);

async function getRadicalsByLevel(level) {
  await redis.connect()
  const keys = await redis.keys("radical:"+level+":*")
  const data = []
  for (let i = 0; i < keys.length; i++) {
    data.push(JSON.parse(await redis.json.get(keys[i])))
  }
  await redis.disconnect()
  return data
}
async function getKanjiByLevel(level) {
  await redis.connect()
  const keys = await redis.keys("kanji:"+level+":*")
  const data = []
  for (let i = 0; i < keys.length; i++) {
    data.push(JSON.parse(await redis.json.get(keys[i])))
  }
  await redis.disconnect()
  return data
}
async function getVocabularyByLevel(level) {
  await redis.connect()
  const keys = await redis.keys("vocabulary:"+level+":*")
  const data = []
  for (let i = 0; i < keys.length; i++) {
    data.push(JSON.parse(await redis.json.get(keys[i])))
  }
  await redis.disconnect()
  return data
}
async function getSubjectById(id) {
  await redis.connect()
  const keys = await redis.keys("*:*:"+id+":*")
  const data = []
  for (let i = 0; i < keys.length; i++) {
    data.push(JSON.parse(await redis.json.get(keys[i])))
  }
  await redis.disconnect()
  return data
}
async function getRadicals() {
  await redis.connect()
  const keys = await redis.keys("radical:*")
  const data = []
  for (let i = 0; i < keys.length; i++) {
    data.push(JSON.parse(await redis.json.get(keys[i])))
  }
  await redis.disconnect()
  return data
}
async function getRadicalBySlug(slug) {
  await redis.connect()
  const keys = await redis.keys("radical:*:*:"+slug)
  const data = []
  for (let i = 0; i < keys.length; i++) {
    data.push(JSON.parse(await redis.json.get(keys[i])))
  }
  await redis.disconnect()
  return data
}
async function getKanji() {
  await redis.connect()
  const keys = await redis.keys("kanji:*")
  const data = []
  for (let i = 0; i < keys.length; i++) {
    data.push(JSON.parse(await redis.json.get(keys[i])))
  }
  await redis.disconnect()
  return data
}
async function getKanjiBySlug(slug) {
  await redis.connect()
  const keys = await redis.keys("kanji:*:*:"+slug)
  const data = []
  for (let i = 0; i < keys.length; i++) {
    data.push(JSON.parse(await redis.json.get(keys[i])))
  }
  await redis.disconnect()
  return data
}
async function getVocabulary() {
  await redis.connect()
  const keys = await redis.keys("vocabulary:*")
  const data = []
  for (let i = 0; i < keys.length; i++) {
    data.push(JSON.parse(await redis.json.get(keys[i])))
  }
  await redis.disconnect()
  return data
}
async function getVocabularyBySlug(slug) {
  await redis.connect()
  const keys = await redis.keys("vocabulary:*:*:"+slug)
  const data = []
  for (let i = 0; i < keys.length; i++) {
    data.push(JSON.parse(await redis.json.get(keys[i])))
  }
  await redis.disconnect()
  return data
}

async function parseLevel(){
  const data = await sequelize.query(
    'SELECT * FROM Subject',
    { type: QueryTypes.SELECT }
  );
  const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar1.start(data.length,0)
  const redis = createClient()
  await redis.connect()
  for(var i = 0;i<data.length;i++){
    const subject = data[i]
    await redis.json.set(subject.object+":"+subject.data.level+":"+subject.id+":"+subject.data.slug,".",JSON.stringify(subject))
    bar1.update(i+1)
  }
  bar1.stop()
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
