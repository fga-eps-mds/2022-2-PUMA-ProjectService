/* eslint-disable no-multi-str */
const db = require('../../dbconfig/dbConfig');
const sequelize = require('../db/AppDb');
const Subarea = require('../db/model/Subarea');
const Identifies = require('../db/model/Identifies');

module.exports = {
  addSubarea: (input) => new Promise((resolve, reject) => {
    const { knowledgeAreaId, description } = input;
    Subarea.create({
      knowledgeAreaId,
      description,
    }).then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),

  addSubjectSubareaRelation: (input) => new Promise((resolve, reject) => {
    const { subareaId, subjecId } = input;
    Identifies.create({
      subareaId,
      subjectId,
    }).then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),

  getSubareas: () => new Promise((resolve, reject) => {
    Subarea.findAll().then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),

  getSubareasOfSubject: (input) => new Promise((resolve, reject) => {
    const { subjectid } = input;
    sequelize.query(
      `select sab.subareaId, sab.description from Subject sb \
      inner join Identifies id on sb.subjectId = id.subjectId \
      inner join Subarea sab on id.subareaId = sab.subareaId \
      where sb.subjectId = ${subjectid}`
    ).then((results) => {
      resolve(results);
    }).catch((e) => reject(e));
  }),

  removeSubareasOfSubject: (input) => new Promise((resolve, reject) => {
    const { subjectid } = input;
    sequelize.query(
      `delete from Identifies id \
      where id.subjectId in \
      ( \
        select sb.subjectId \
        from Subject sb \
        inner join Identifies id \
        on sb.subjectId = id.subjectId \
        where sb.subjectId = ${subjectid} \
      ) \
      `
    ).then((results) => {
      resolve(results);
    }).catch((e) => reject(e));
  }),
};
