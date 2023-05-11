const db = require('../../dbconfig/dbConfig');
const Semester = require('../db/model/Semester');

module.exports = {
    getSemester: (semesterId) => new Promise((resolve, reject) => {
        Semester.findAll({
            where: {
                semesterId,
            }
        }).then((response) => {
            resolve(response);
        }).catch((e) => reject(e));
    }),
};
