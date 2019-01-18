const path = require('path');
const fs = require('fs');
const _ = require('lodash');

function getArticleById(req, res) {
  fs.readFile('./mockData.json', 'utf8', (err, data) => {
    if (err) throw err;
  
    let newData = JSON.parse(data);
    if (_.isUndefined(newData[req.params.id])) {
      throw err;
    } else {
      res.json(newData[req.params.id]);
    }
  });
}

function getAllNews(req, res) {
  fs.readFile('./mockData.json', 'utf8', (err, data) => {
    if (err) throw err;

    res.json(JSON.parse(data));
  })
}

function putOneArticleById(req, res) {
  fs.readFile('./mockData.json', 'utf8', (err, data) => {
    if (err) throw err;
    
    let newData = JSON.parse(data);
    if (_.isUndefined(newData[req.params.id])) {
      newData[req.params.id] = req.body;
      fs.writeFile('./mockData.json', JSON.stringify(newData, null, 2), (err, data) => {
        if (err) throw err;
    
        res.status(200).send();
      });
    } else {
      throw err;
    }
  });
}

function updateArticleById(req, res) {
  fs.readFile('./mockData.json', 'utf8', (err, data) => {
    if (err) throw err;
    
    let newData = JSON.parse(data);
    if (_.isUndefined(newData[req.params.id])) {
      throw err;
    } else {
      newData[req.params.id] = req.body;
      fs.writeFile('./mockData.json', JSON.stringify(newData, null, 2), (err, data) => {
        if (err) throw err;
    
        res.status(200).send();
      });
    }
  });
}

function updateNewsBlock(req, res) {
  fs.writeFile('./mockData.json', JSON.stringify(req.body, null, 2), (err, data) => {
    if (err) throw err;
    
    res.status(200).send();
  });
}

function deleteArticleById(req, res) {
  fs.readFile('./mockData.json', 'utf8', (err, data) => {
    if (err) throw err;
    
    let parsedData = JSON.parse(data);
    if (_.isUndefined(parsedData[req.params.id])) {
      throw err;
    } else {
      let newData = _.omit(parsedData, [req.params.id]);
      fs.writeFile('./mockData.json', JSON.stringify(newData, null, 2), (err, data) => {
        if (err) throw err;
        
        res.status(200).send();
      });
    }
  });
}

function deleteNewsBlock(req, res) {
  fs.writeFile('./mockData.json', JSON.stringify({}), (err, data) => {
    if (err) throw err;
    
    res.status(200).send();
  });
}

// Read
module.exports.getArticleById = getArticleById;
// Read all news
module.exports.getAllNews = getAllNews;
// Create
module.exports.putOneArticleById = putOneArticleById;
// Update
module.exports.updateArticleById = updateArticleById;
// Update all news
module.exports.updateNewsBlock = updateNewsBlock;
// Delete
module.exports.deleteArticleById = deleteArticleById;
// Delete all news
module.exports.deleteNewsBlock = deleteNewsBlock;