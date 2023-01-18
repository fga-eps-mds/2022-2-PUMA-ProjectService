const express = require('express');

const routes = express.Router();
const classController = require('../controller/ClassController');

routes.get('/classes', (req, res) => {
  classController.getClasses().then((response) => {
    res.status(200).json(response);
  }).catch((response) => {
    res.status(400).json(response);
  });
});

routes.get('/class/:classid', (req, res) => {
  classController.getClass({
    classid: parseInt(req.params.classid, 10),
  }).then((response) => {
    res.status(200).json(response);
  }).catch((response) => {
    res.status(400).json(response);
  });
});

routes.put('/class/:classid', (req, res) => {
  classController.updateClass(req.body).then((response) => {
    res.status(200).json(response);
  }).catch((response) => {
    res.status(400).json(response);
  });
});

routes.delete('/class/:classid', (req, res) => {
  classController.deleteClass(req.params.classid).then((response) => {
    res.status(200).json(response.data);
  }).catch((error) => {
    res.status(400).json({ error });
  });
});

module.exports = routes;
