const db = require('../../dbconfig/dbConfig');

module.exports = {
  getClasses: () => new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM CLASSES',
    ).then((response) => {
      resolve(response.rows);
    }).catch((e) => reject(e));
  }),

  getClass: (input) => new Promise((resolve, reject) => {
    const { classid } = input;
    db.query(
      'select * from CLASSES where classId = $1',
      [classid],
    )
      .then((response) => {
        resolve(response.rows[0]);
      }).catch((response) => {
        reject(response);
      });
  }),

  updateClass: (input) => new Promise((resolve, reject) => {
    const { subjectId, classCode, year, semester, password, classid } = input;

    if(classid === '0'){
      db.query(
        'INSERT INTO CLASSES(subjectId, classCode, year, semester, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [subjectId, classCode, year, semester, password],
      ).then((response) => {
        resolve(response.rows[0]);
      }).catch((e) => reject(e));
    }
    else {
    db.query(
      'UPDATE classes \
        SET subjectId = $1, classCode = $2, year = $3, semester = $4, password= $5 \
        WHERE classId = $6  RETURNING *',
      [subjectId, classCode, year, semester, password, classid],
    )
      .then((response) => {
        resolve(response.rows[0]);
      }).catch((response) => {
        reject(response);
      });
    }
  }),

  deleteClass: (classid) => new Promise((resolve, reject) => {
    db.query(
      'UPDATE classes SET deleted = true WHERE classId = $1 RETURNING *',
      [classid])
      .then((response) => {
        resolve(response.rows);
      }).catch((response) => {
        reject(response);
      });
  }),
};
