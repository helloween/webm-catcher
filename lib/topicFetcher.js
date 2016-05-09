var request = require('co-request');
var util    = require('./util');

class TopicFetcher {

  static *getTopic() {
    // console.log(util.getCatalogUrl());
    let response = yield request({
      url: util.getCatalogUrl(),
      headers: {
        'User-Agent' : process.env.USER_AGENT
      }
    });

    return response.body;
  }

  static *getTopicIds() {
    let body = yield this.getTopic();

    return JSON.parse(body)['threads'].map((thread) => thread['num']);
  }

}

module.exports = TopicFetcher;


