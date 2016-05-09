var request = require('co-request');
var util    = require('./util');

class TopicFetcher {

  static *getTopic() {
    let threads = yield request({
      url: util.getCatalogUrl(),
      headers: {
        'User-Agent' : process.env.USER_AGENT
      }
    });

    return threads.body;
  }

  static *getTopicIds() {
    let body = yield this.getTopic();

    return JSON.parse(body)['threads'].map((thread) => thread['num']);
  }

}

module.exports = TopicFetcher;


