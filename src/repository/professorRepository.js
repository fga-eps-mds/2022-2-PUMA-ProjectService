/* eslint-disable no-multi-str */
const db = require('../../dbconfig/dbConfig');
const Lectures = require('../db/model/Lectures');
const sequelize = require('sequelize');

module.exports = {
  addProfessorSubjectRelation: (input) => new Promise((resolve, reject) => {
    const { regNumber, subjectId } = input;
    Lectures.create({
      regNumber,
      subjectId,
    }).then((response) => {
      resolve(response);
    })
      .catch((e) => reject(e));
  }),

  getProfessors: () => new Promise((resolve, reject) => {
    sequelize.query(
      'Select pf.regnumber, pf.userid, us.fullname, us.email from professor pf left join common_user us on pf.userid = us.userid;',
    ).then((results) => {
      resolve(results);
    }).catch((e) => reject(e));
  }),

  getProfessorsofSubject: (input) => new Promise((resolve, reject) => {
    const { subjectid } = input;
    sequelize.query(
      `select pf.regnumber, pf.userid, us.fullname, us.email from subject sb \
      inner join lectures lt on sb.subjectid = lt.subjectid \
      inner join professor pf on lt.regnumber = pf.regnumber \
      left join common_user us on pf.userid = us.userid \
      where sb.subjectid = ${subjectid}`
    ).then((results) => {
      resolve(results);
    }).catch((e) => reject(e));
  }),

  removeProfessorsofSubject: (input) => new Promise((resolve, reject) => {
    const { subjectid } = input;
    sequelize.query(
      `delete from lectures lt \
      where lt.subjectid in \
      ( \
        select sb.subjectid \
        from subject sb \
        inner join lectures lt \
        on sb.subjectid = lt.subjectid \
        where sb.subjectid = ${subjectid} \
      )`
    ).then((results) => {
      resolve(results);
    }).catch((e) => reject(e));
  }),
};
