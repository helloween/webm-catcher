require('dotenv').config();
var co = require('co');
var TopicFetcher = require('./topicFetcher');
var PostFetcher = require('./postFetcher');
var PostParser = require('./postParser');



co(function* () {
  // var res = yield TopicFetcher.getTopicIds();
  // console.log(res);
  let topicIds = yield TopicFetcher.getTopicIds();
    console.log(topicIds);
  // .each( (topicId) => {

  //   PostParser.perform(PostFetcher.getPosts(topicId));
  // });
})