const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const ValidationError = require('../errors/ValidationError.component')

function getArticleById(req, res, next) {
  fs.readFile('./mockData.json', 'utf8', (err, data) => {
    if (err) next(err);
  
    let newData = JSON.parse(data);
    if (_.isUndefined(newData[req.params.id])) {
      next(new ValidationError(`article with id = ${req.params.id} is not found`));
    } else {
      res.json(newData[req.params.id]);
    }
  });
}

function getNewsBlock(req,res,next) {
  fs.readFile('./mockData.json', 'utf8', (err, data) => {
    if (err) next(err);

    res.json(JSON.parse(data));
  })
}

function putOneArticleById(req,res,next) {
  fs.readFile('./mockData.json', 'utf8', (err, data) => {
    if (err) next(err);
    
    let newData = JSON.parse(data);
    if (_.isUndefined(newData[req.params.id])) {
      newData[req.params.id] = req.body;
      fs.writeFile('./mockData.json', JSON.stringify(newData, null, 2), (err, data) => {
        if (err) next(err);
    
        res.status(201).send();
      });
    } else {
      next(new ValidationError(`article with id = ${req.params.id} is already exist`));
    }
  });
}

function putNewsBlock(req,res,next) {
  fs.readFile('./mockData.json', 'utf8', (err, data) => {
    if (err) next(err);
    
    let newData = JSON.parse(data);
    if (_.isUndefined(newData)) {
      fs.writeFile('./mockData.json', JSON.stringify(newData, null, 2), (err, data) => {
        if (err) next(err);
    
        res.status(201).send();
      });
    } else {
      next(new ValidationError(`news block is already exist`));
    }
  });
}

function updateArticleById(req,res,next) {
  fs.readFile('./mockData.json', 'utf8', (err, data) => {
    if (err) next(err);
    
    let newData = JSON.parse(data);
    if (_.isUndefined(newData[req.params.id])) {
      next(new ValidationError(`article with id = ${req.params.id} is not found to be updated`));
    } else {
      newData[req.params.id] = req.body;
      fs.writeFile('./mockData.json', JSON.stringify(newData, null, 2), (err, data) => {
        if (err) next(err);
    
        res.status(200).send();
      });
    }
  });
}

function updateNewsBlock(req,res,next) {
  fs.writeFile('./mockData.json', JSON.stringify(req.body, null, 2), (err, data) => {
    if (err) next(err);
    
    res.status(200).send();
  });
}

function deleteArticleById(req,res,next) {
  fs.readFile('./mockData.json', 'utf8', (err, data) => {
    if (err) next(err);
    
    let parsedData = JSON.parse(data);
    if (_.isUndefined(parsedData[req.params.id])) {
      next(new ValidationError(`article with id = ${req.params.id} is not exist`));
    } else {
      let newData = _.omit(parsedData, [req.params.id]);
      fs.writeFile('./mockData.json', JSON.stringify(newData, null, 2), (err, data) => {
        if (err) next(err);
        
        res.status(200).send();
      });
    }
  });
}

function deleteNewsBlock(req,res,next) {
  fs.writeFile('./mockData.json', JSON.stringify({}), (err, data) => {
    if (err) next(err);
    
    res.status(200).send();
  });
}

// Read
module.exports.getArticleById = getArticleById;
// Read all news
module.exports.getNewsBlock = getNewsBlock;
// Create
module.exports.putOneArticleById = putOneArticleById;
// Create
module.exports.putNewsBlock = putNewsBlock;
// Update
module.exports.updateArticleById = updateArticleById;
// Update all news
module.exports.updateNewsBlock = updateNewsBlock;
// Delete
module.exports.deleteArticleById = deleteArticleById;
// Delete all news
module.exports.deleteNewsBlock = deleteNewsBlock;