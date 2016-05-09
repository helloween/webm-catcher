var request = require('co-request');
var util    = require('./util');

class PostFetcher {

  static *getPosts(topicId) {
    let response = yield request(
      url: util.getPostUrl(topicId),
      headers: {
        'User-Agent' : process.env.USER_AGENT
      }
    )

    if (response.body['threads'] instanceof Array) {
      return response.body['threads'][0]['posts'];
    } else {
      return [];
    }
  }

}

module.export = PostFetcher;