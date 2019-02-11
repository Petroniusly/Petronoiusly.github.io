import ValidationError from '../errors/ValidationError.component';

const path = require('path');
const fs = require('fs');
const _ = require('lodash');

function readFilePromise() {
	return new Promise((resolve, reject) => {
		fs.readFile('./mockData.json', 'utf8', (err, data) => {
			if (err) reject(err);
			resolve(data);
		});
	});
}

function parseData(data) {
	try {
		return JSON.parse(data);
	} catch (e) {
		throw new ValidationError(`intern DB error: ${e}`);
	}
}

function writeFilePromise(code, data) {
	return new Promise((resolve, reject) => {
		fs.writeFile('./mockData.json', JSON.stringify(data, null, 2), err => {
			if (err) reject(err);
			resolve(code);
		});
	});
}

function getArticleById(req, res, next) {
	readFilePromise()
		.then(parseData)
		.then(data => {
			if (_.isUndefined(data[req.params.id])) {
				throw new ValidationError(
					`article with id = ${req.params.id} is not found`
				);
			} else {
				res.json(data[req.params.id]);
			}
		})
		.catch(err => next(err));
}

function getNewsBlock(req, res, next) {
	readFilePromise()
		.then(parseData)
		.then(data => res.json(data))
		.catch(err => next(err));
}

function putOneArticleById(req, res, next) {
	readFilePromise()
		.then(parseData)
		.then(data => {
			if (_.isUndefined(data[req.params.id])) {
				data[req.params.id] = req.body;
				return writeFilePromise(201, data);
			} else {
				throw new ValidationError(
					`article with id = ${req.params.id} is already exist`
				);
			}
		})
		.then(code => res.status(code).send())
		.catch(err => next(err));
}

function putNewsBlock(req, res, next) {
	readFilePromise()
		.then(parseData)
		.then(data => {
			if (_.isUndefined(data)) {
				return writeFilePromise(201, data);
			} else {
				throw new ValidationError(`news block is already exist`);
			}
		})
		.then(code => res.status(code).send())
		.catch(err => next(err));
}

function updateArticleById(req, res, next) {
	readFilePromise()
		.then(parseData)
		.then(data => {
			if (_.isUndefined(data[req.params.id])) {
				throw new ValidationError(
					`article with id = ${req.params.id} is not found to be updated`
				);
			} else {
				data[req.params.id] = req.body;
				return writeFilePromise(200, data);
			}
		})
		.then(code => res.status(code).send())
		.catch(err => next(err));
}

function updateNewsBlock(req, res, next) {
	writeFilePromise(200, req.body)
		.then(code => res.status(code).send())
		.catch(err => next(err));
}

function deleteArticleById(req, res, next) {
	readFilePromise()
		.then(parseData)
		.then(data => {
			if (_.isUndefined(data[req.params.id])) {
				throw new ValidationError(
					`article with id = ${req.params.id} is not exist`
				);
			} else {
				return writeFilePromise(200, _.omit(data, [req.params.id]));
			}
		})
		.then(code => res.status(code).send())
		.catch(err => next(err));
}

function deleteNewsBlock(req, res, next) {
	writeFilePromise(200, {})
		.then(code => res.status(code).send())
		.catch(err => next(err));
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
