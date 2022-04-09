const projectRepository = require('../repository/projectRepository');
const alocateService = require('../service/AlocateService');

module.exports = {
  addProject: (project) => {
    return new Promise((resolve, reject) => {
      alocateService.getSubject(project.keywords).then((response) => {
        project.subjectid = response.data.subjectid;
        projectRepository.addProject(project).then((projectid) => {
          projectRepository.addProjectKeywordsRelation(projectid, project.keywords).then((response) => {
            resolve(response);
          }).catch((e) => reject(e));
        }).catch((e) => reject(e));
      }).catch((e) => { reject(e) });
    })
  },

  getUserProposals: (user) => {
    return new Promise((resolve, reject) => {
      projectRepository.getUserProposals(user).then((response) => {
        resolve(response);
      }).catch((error) => { reject(error) });
    })
  },

  addFile: (file) => {
    return new Promise((resolve, reject) => {
      try {
        const projectId = projectRepository.addFile(file);
        resolve(projectId);
      } catch (e) { reject(e); }
      resolve();
    })
  },

  deleteProject: (projectId) => {
    return new Promise((resolve, reject) => {
      try {
        const response = projectRepository.deleteProject(projectId);
        resolve(response);
      } catch (e) { reject(e); }
      resolve();
    });
  },

  getKnowledgeAreas: () => {
    return new Promise((resolve, reject) => {
      try {
        const response = projectRepository.getKnowledgeAreas();
        resolve(response);
      } catch (e) { reject(e); }
      resolve();
    });
  }
};
