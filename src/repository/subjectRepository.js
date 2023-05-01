const db = require('../../dbconfig/dbConfig');
const sequelize = require('sequelize');
const Subject = require('../db/model/Subject');

module.exports = {
  addSubject: (input) => new Promise((resolve, reject) => {
    const { name, courseSyllabus } = input;
    Subject.create({
      name,
      courseSyllabus,
    }).then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),

  getSubjects: () => new Promise((resolve, reject) => {
    sequelize.query(
      'SELECT s.subjectid, s.name FROM subject s WHERE not(s.deleted) ORDER BY s.subjectid DESC',
    ).then((results) => {
      resolve(results);
    }).catch((e) => reject(e));
  }),

  getSubject: (input) => new Promise((resolve, reject) => {
    const { subjectId } = input;
    Subject.findOne({
      where: {
        subjectId,
      }
    }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(response);
      });
  }),

  updateSubject: (input) => new Promise((resolve, reject) => {
    const { subjectId, name, courseSyllabus } = input;
    Subject.update({
      name,
      courseSyllabus,
    }, {
      where: {
        subjectId,
      }
    }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(response);
      });
  }),

  deleteSubject: (subjectId) => new Promise((resolve, reject) => {
    Subject.update({
      deleted: true,
    }, {
      subjectId,
    }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(response);
      });
  }),
};
