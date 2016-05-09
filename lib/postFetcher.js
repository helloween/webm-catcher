var request = require('co-request');
var util    = require('./util');

class PostFetcher {

  static *fetchPosts(topicId) {
    let response = yield request({
      url: util.getTopicUrl(topicId),
      headers: {
        'User-Agent' : process.env.USER_AGENT
      }
    });

    return response.body;
  }

  static *getPosts(topicId) {
    let body = yield this.fetchPosts(topicId);
    let parsedBody = JSON.parse(body);

    if (parsedBody['threads'] instanceof Array) {
      return parsedBody['threads'][0]['posts'];
    } else {
      return [];
    }
  }

}

module.exports = PostFetcher;