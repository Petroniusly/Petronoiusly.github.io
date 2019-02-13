const express = require('express');
const _ = require('lodash');
const newsController = require('../controllers/news.controller');
const logger = require('../handlers/logger');

const router = express.Router();

// "C: create, R: read, U: update, and D: delete"
// "create - put, read - get, update - post, delete - delete"
router.route('/*')
  .all(logger.logConnect);

router.route('/news')
  .get(newsController.getNewsBlock)
  .post(newsController.updateNewsBlock)
  .put(newsController.putNewsBlock)
  .delete(newsController.deleteNewsBlock);

router.route('/news/:id')
  .get(newsController.getArticleById)
  .post(newsController.updateArticleById)
  .put(newsController.putOneArticleById)
  .delete(newsController.deleteArticleById);

module.exports = router;