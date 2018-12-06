import { default as metadata }  from '../config'

let service;
export default class FetchService {
	constructor() {
		if (service) {
			return service
		}

		service = metadata
		service.url = metadata.url + '?' + this.getParams(metadata.params)
	}

	request() {
		return fetch(service.url)
	}

	getParams(params) {
		let entries = Object.entries(params);
		let getParams = '';

		for(let i = 0; i < entries.length; i++) {
			getParams += entries[i][0] + '=' + entries[i][1] + (( i < entries.length - 1 ) ? '&' : '');
		}

		return getParams;
	}
}