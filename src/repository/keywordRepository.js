/* eslint-disable no-multi-str */
/* eslint-disable import/order */
const db = require('../../dbconfig/dbConfig');
const format = require('pg-format');
const Keyword = require('../db/model/Keyword');
const Abstracts = require('../db/model/Abstracts');
const Summarize = require('../db/model/Summarize');
const Subject = require('../db/model/Subject');
const sequelize = require('sequelize');

module.exports = {
  addKeyword: (keyword) => new Promise((resolve, reject) => {
    Keyword.create({ keyword }).then((response) => {
      resolve(response);
    }).catch((e) => {
      reject(e);
    });
  }),

  addManyKeywords: (keywords) => new Promise((resolve, reject) => {
    Keyword.bulkCreate(keywords).then((response) => {
      resolve(response);
    }).catch((e) => {
      reject(e);
    });
  }),

  getAllKeywords: () => new Promise((resolve, reject) => {
    Keyword.findAll({
      order: [['keywordId', 'DESC']]
    }).then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),

  getKeywordByName: (keyword) => new Promise((resolve, reject) => {
    Keyword.findAll({
      where: {
        keyword,
      }
    }).then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),

  getKeywordById: (keywordId) => new Promise((resolve, reject) => {
    Keyword.findAll({
      keywordId,
    }).then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),

  getProjectKeywords: (projectId) => new Promise((resolve, reject) => {
    sequelize.query(
      `SELECT K.keyword, K.keywordid, A.main FROM abstracts as A JOIN KEYWORD as K on A.keywordid = K.keywordid WHERE projectid = ${projectId}`
    ).then((results) => {
      resolve(results);
    }).catch((e) => reject(e));
  }),

  addKeywordSubjectRelation: (payload) => new Promise((resolve, reject) => {
    const { keywordid, subjectid } = payload;
    Summarize.create({
      keywordId: keywordid,
      subjectId: subjectid,
    }).then((response) => resolve(response))
      .catch((e) => reject(e));
  }),

  getKeywordsAvailbleToProject: () => new Promise((resolve, reject) => {
    sequelize.query(
      `SELECT DISTINCT k.keywordid, k.keyword FROM summarize JOIN subject s ON summarize.subjectid = s.subjectid JOIN keyword k ON summarize.keywordid = k.keywordid WHERE not(k.deleted) and not(s.deleted)`,
    ).then((results) => {
      resolve(results);
    }).catch((e) => {
      reject(e);
    });
  }),

  getKeywordAvailbleToSubject: () => new Promise((resolve, reject) => {
    sequelize.query(
      `SELECT k.keywordid, k.keyword FROM keyword k LEFT JOIN summarize s ON k.keywordid = s.keywordid WHERE s.keywordid IS NULL and not(k.deleted)`,
    ).then((results) => {
      resolve(results);
    }).catch((e) => reject(e));
  }),

  getKeywordsAlternative: () => {
    return new Promise((resolve, reject) => {
      sequelize.query(
        'SELECT k.keywordid, k.keyword, s.name as subjectname, s.subjectid, array_agg(c.userid) FROM summarize JOIN subject s ON summarize.subjectid = s.subjectid JOIN keyword k ON summarize.keywordid = k.keywordid and k.deleted is not true inner join lectures l on l.subjectid = s.subjectid inner join professor p on l.regnumber = p.regnumber inner join common_user c on p.userid = c.userid GROUP BY k.keywordid, s.name,s.subjectid ORDER BY k.keywordid;',
      ).then((results) => {
        resolve(results);
      }).catch((response) => {
        reject(response);
      });
    });
  },

  getSubjects: () => {
    return new Promise((resolve, reject) => {
      sequelize.query(
        'SELECT subjectId as value, name as text FROM subject;',
      ).then((results) => {
        resolve(results);
      }).catch((response) => {
        reject(response);
      });
    });
  },

  updateKeyword: (keywordid, newKeyword) => {
    try {
      return new Promise((resolve, reject) => {
        Keyword.update({
          keyword: newKeyword,
        }, {
          where: {
            keywordId: keywordid
          }
        }).then((response) => {
          resolve(response);
        }).catch((e) => {
          reject(e);
        });
      });
    } catch (e) {
      reject(e);
    }
  },

  deleteKeyword: (keywordid) => {
    try {
      return new Promise((resolve, reject) => {
        Keyword.update({
          deleted: true,
        }, {
          keywordId: keywordid,
        }).then((response) => {
          resolve(response);
        }).catch((e) => {
          reject(e);
        });
      });
    } catch (e) {
      reject(e);
    }
  },

  updateSubjectKeyword: (keywordid, subjectid) => {
    try {
      return new Promise((resolve, reject) => {
        Summarize.update({
          keywordId: keywordid,
          subjectId: subjectid,
        }, {
          where: {
            keywordId: keywordid,
          }
        }).then((response) => {
          resolve(response);
        }).catch((e) => {
          reject(e);
        });
      });
    } catch (e) {
      reject(e);
    }
  },

  getKeywordsOfSubject: (input) => new Promise((resolve, reject) => {
    const { subjectid } = input;
    sequelize.query(
      `select kw.keyword, kw.keywordid from subject sb \
      inner join summarize sm on sb.subjectid = sm.subjectid \
      inner join keyword kw on sm.keywordid = kw.keywordid \
      where sb.subjectid = ${subjectid}`
    ).then((results) => {
      resolve(results);
    }).catch((e) => reject(e));
  }),

  removeKeywordsOfSubject: (input) => new Promise((resolve, reject) => {
    const { subjectid } = input;
    sequelize.query(
      `delete from summarize sm \
      where sm.subjectid in \
      ( \
        select sb.subjectid \
        from subject sb \
        inner join summarize sm \
        on sb.subjectid = sm.subjectid \
        where sb.subjectid = ${subjectid} \
      )`
    ).then((results) => {
      resolve(results);
    }).catch((e) => reject(e));
  }),
};
