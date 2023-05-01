/* eslint-disable no-multi-str */
const db = require('../../dbconfig/dbConfig');
const sequelize = require('sequelize');
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
      `select sab.subareaid, sab.description from subject sb \
      inner join identifies id on sb.subjectid = id.subjectid \
      inner join subarea sab on id.subareaid = sab.subareaid \
      where sb.subjectid = ${subjectid}`
    ).then((results) => {
      resolve(results);
    }).catch((e) => reject(e));
  }),

  removeSubareasOfSubject: (input) => new Promise((resolve, reject) => {
    const { subjectid } = input;
    sequelize.query(
      `delete from identifies id \
      where id.subjectid in \
      ( \
        select sb.subjectid \
        from subject sb \
        inner join identifies id \
        on sb.subjectid = id.subjectid \
        where sb.subjectid = ${subjectid} \
      ) \
      `
    ).then((results) => {
      resolve(results);
    }).catch((e) => reject(e));
  }),
};
