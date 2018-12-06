export default class FetchFactory {
  constructor(config) {
    this.options = {};
    this.params = config.options;
    this.url = config.url;
    this.options.method = config.method;
    switch (config.method) {
      case 'GET':
      case 'DELETE':
        this.url += this.createGetOptions(config.options);
        break;
      case 'HEAD':
        this.options = this.createHeadOptions(this.options, config.headers);
        break;
      case 'PUT':
      case 'POST':
      case 'PATCH':
        this.options = this.createPostOptions(this.options, config.body);
        break;
      case 'CONNECT':
      case 'OPTIONS':
      case 'TRACE':
        break;
    }
  }

  send() {
    return fetch(this.url, this.options);
  }

  createGetOptions(options) {
    return '?' + this.getParams(options);
  };

  createPostOptions(service, body) {
    service.body = body;
    return service;
  };

  createHeadOptions(service, headers) {
    service.headers = headers;
    return service;
  };


  getParams(params) {
    let entries = Object.entries(params);
    let getParams = '';

    for (let i = 0; i < entries.length; i++) {
      getParams += entries[i][0] + '=' + entries[i][1] + (( i < entries.length - 1 ) ? '&' : '');
    }

    return getParams;
  }
}