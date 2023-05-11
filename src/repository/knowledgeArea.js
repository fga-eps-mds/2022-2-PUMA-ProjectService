const db = require('../../dbconfig/dbConfig');
const knowledge_Area = require('../db/model/Knowledge_Area');

module.exports = {
  addKnowledgeArea: (input) => new Promise((resolve, reject) => {
    const { knowledgeArea } = input;
    knowledge_Area.create({
      knowledgeArea,
    }).then((response) => {
      resolve(response.knowledgeAreaId);
    }).catch((e) => reject(e));
  }),
  getKnowledgeAreas: () => new Promise((resolve, reject) => {
    knowledge_Area.findAll().then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),
};
