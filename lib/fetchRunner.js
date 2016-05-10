require('dotenv').config();
var co = require('co');
var TopicFetcher = require('./topicFetcher');
var PostFetcher = require('./postFetcher');
var PostParser = require('./postParser');



co(function* () {

  let topicIds = yield TopicFetcher.getTopicIds();


  for (let topicId of topicIds.slice(0, 4)) {
    let posts = yield PostFetcher.getPosts(topicId);

    console.log(topicId);

    yield PostParser.perform(posts);
  }

  console.log(PostParser.store);

}).catch((err) => console.log(err));