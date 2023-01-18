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
      'SELECT * FROM CLASSES where classId = $1',
      [classid],
    )
      .then((responseClasses) => {
        let res = {class: responseClasses.rows[0], teachers: '', schedules: ''};
        db.query(
          'SELECT * FROM CLASSES_TEACHER where classId = $1',
          [classid],
        )
        .then((responseTeachers) => {
          res.teachers = responseTeachers.rows;

          db.query(
            'SELECT * FROM CLASSES_SCHEDULE where classId = $1',
            [classid],
          )
            .then((responseSchedules) => {
              res.schedules = responseSchedules.rows;
              resolve(res);
            }).catch((response) => {
              reject(response);
            });
        }).catch((response) => {
          reject(response);
        });
      }).catch((response) => {
        reject(response);
      });
  }),

  updateClass: (input) => new Promise((resolve, reject) => {
    const { subjectId, classCode, year, semester, password, classid, userId, classesTeacher, classesSchedule } = input;

    if(classid === '0'){
      db.query(
        'INSERT INTO CLASSES(subjectId, classCode, year, semester, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [subjectId, classCode, year, semester, password],
      ).then((response) => {
        for(let i=0; i<classesTeacher.length; i++){
          db.query(
            'INSERT INTO CLASSES_TEACHER(userId, classId) VALUES ($1, $2) RETURNING *',
            [classesTeacher[i], response.rows[0].classid],
          ).then(() => {
          }).catch((e) => reject(e));
        }

        for(let i=0; i<classesSchedule.length; i++){
          db.query(
            'INSERT INTO CLASSES_SCHEDULE(classId, day, start, finish) VALUES ($1, $2, $3, $4) RETURNING *',
            [response.rows[0].classid, classesSchedule[i].day, classesSchedule[i].start, classesSchedule[i].end],
          ).then(() => {
          }).catch((e) => reject(e));
        }

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

          db.query(
            'DELETE FROM CLASSES_TEACHER \
              WHERE classId = $1  RETURNING *',
            [classid],
          )
          .then(() => {
            for(let i=0; i<classesTeacher.length; i++){
              db.query(
                'INSERT INTO CLASSES_TEACHER(userId, classId) VALUES ($1, $2) RETURNING *',
                [classesTeacher[i], classid],
              ).then(() => {
              }).catch((e) => reject(e));
            }
          }).catch((e) => {
            reject(e);
          });

          db.query(
            'DELETE FROM CLASSES_SCHEDULE \
              WHERE classId = $1  RETURNING *',
            [classid],
          )
          .then(() => {
            for(let i=0; i<classesSchedule.length; i++){
              db.query(
                'INSERT INTO CLASSES_SCHEDULE(classId, day, start, finish) VALUES ($1, $2, $3, $4) RETURNING *',
                [classid, classesSchedule[i].day, classesSchedule[i].start, classesSchedule[i].end],
              ).then((res) => {
              }).catch((e) => reject(e));
            }
          }).catch((e) => {
            reject(e);
          });

        resolve(response.rows);
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
