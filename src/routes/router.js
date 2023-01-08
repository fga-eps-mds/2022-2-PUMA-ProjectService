const projectRoutes = require('./ProjectRoutes');
const subjectRoutes = require('./SubjectRoutes');
const keywordRoutes = require('./KeywordRoutes');
const classRoutes = require('./ClassRoutes');

module.exports = (app) => {
  app.use('/', [
    projectRoutes,
    subjectRoutes,
    keywordRoutes,
    classRoutes,
  ]);
};
