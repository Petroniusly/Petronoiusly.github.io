const path = require('path');
const _ = require('lodash');
const errorHandler = require('../handlers/errorHandler');
const ValidationError = require('../errors/ValidationError.component');
const newsDB = require('../models/news.model');

function updateArticlePromise(req) {
	return new Promise((resolve, reject) => {
		newsDB
			.update({ id: req.params.id }, req.body, {
				runValidators: true,
				upsert: false
			})
			.exec((err, docs) => {
				if (err) reject(err);
				resolve(docs);
			});
	});
}

function deleteArticlePromise(id) {
	return new Promise((resolve, reject) => {
		newsDB.deleteOne({ id: id }).exec((err, docs) => {
			if (err) reject(err);
			resolve(docs);
		});
	});
}

function getArticleById(req, res, next) {
	return new Promise((resolve, reject) => {
		newsDB
			.findOne({ id: req.params.id })
			.select('-_id -__v')
			.lean()
			.exec((err, docs) => {
				if (err) reject(err);
				if (_.isNull(docs))
					reject(
						new ValidationError(
							`article with id = ${req.params.id} is not found`
						)
					);
				resolve(docs);
			});
	})
		.then(data => res.json(data))
		.catch(err => next(err));
}

function getNewsBlock(req, res, next) {
	return new Promise((resolve, reject) => {
		newsDB
			.find()
			.select('-_id -__v')
			.exec((err, docs) => {
				if (err) reject(err);
				if (_.isNull(docs)) reject(new ValidationError(`database is empty`));
				resolve(docs);
			});
	})
		.then(data => res.json(data))
		.catch(err => next(err));
}

function putOneArticleById(req, res, next) {
	return new Promise((resolve, reject) => {
		let data = _.assign(req.body, {
			id: req.params.id
		});
		newsDB.create(data, function(err, res) {
			if (err) reject(err);
			resolve(res);
		});
	})
		.then(code => res.status(201).send())
		.catch(err => {
			next(errorHandler.databaseErrors(err));
		});
}

function putNewsBlock(req, res, next) {
	newsDB
		.insertMany(req.body, { ordered: false, rawResult: true })
		.then(data => {
			if (_.isEmpty(data))
				throw new ValidationError(`provided News block is invalid`);
			res.status(200).send(data);
		})
		.catch(err => next(err));
}

function updateArticleById(req, res, next) {
	updateArticlePromise(req)
		.then(() => res.status(200).send())
		.catch(err => {
			next(new ValidationError(err.message));
		});
}

function updateNewsBlock(req, res, next) {
	Promise.all(
		_.forEach(req.body, article => {
			return updateArticlePromise(article);
		})
	)
		// Error logger works incorrect
		.then(() => res.status(200).send())
		.catch(err => {
			next(new ValidationError(err.message));
		});
}

function deleteArticleById(req, res, next) {
	deleteArticlePromise(req.params.id)
		.then(data => {
			if (_.isEqual(data.n, data.ok)) res.status(200).send();
			throw new ValidationError(
				`article with id = ${req.params.id} is not exist`
			);
		})
		.catch(err => next(err));
}

function deleteNewsBlock(req, res, next) {
	Promise.all(
		_.map(req.body, id => {
			return deleteArticlePromise(id);
		})
	)
		.then(results => {
			successResults = _.filter(results, result =>
				_.isEqual(result.n, result.ok)
			);
			if (successResults.length !== results.length) {
				throw new ValidationError(`some articles are not exist already`);
			} else {
				res.status(200).send();
			}
		})
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
