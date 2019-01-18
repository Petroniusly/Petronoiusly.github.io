const newsController = require('../controllers/news.controller');
const express = require('express');
const _ = require('lodash');

const router = express.Router();

// Read all news
router.get('/news', newsController.getAllNews);
// Read
router.get('/news/:id', newsController.getArticleById);
// Create
router.put('/news/:id', newsController.putOneArticleById);
// Update
router.post('/news', newsController.updateNewsBlock);
// // Delete all news
router.post('/news/:id', newsController.updateArticleById);
// // Update all news
router.delete('/news', newsController.deleteNewsBlock);
// // Delete
router.delete('/news/:id', newsController.deleteArticleById);

module.exports = router;