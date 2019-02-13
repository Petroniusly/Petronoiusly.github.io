const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const News = new Schema({
	id: { type: String, trim: true, index: true, unique: true, sparse: true },
	author: { type: String, required: true, max: 500 },
	title: { type: String, required: true, max: 1500 },
	description: { type: String, required: true, max: 2500 },
	url: { type: String, required: true, max: 500 },
	urlToImage: { type: String, required: true, max: 1500 },
	publishedAt: { type: String, required: true, max: 120 },
	content: { type: String, required: true, max: 2500 }
});

//Export model
module.exports = mongoose.model('News', News);
