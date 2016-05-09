require('dotenv').config();
var co = require('co');
var TopicFetcher = require('./topicFetcher');
var PostFetcher = require('./postFetcher');
var PostParser = require('./postParser');



co(function* () {
  // var res = yield TopicFetcher.getTopicIds();
  // console.log(res);

  let topicIds = yield TopicFetcher.getTopicIds();

  // console.log(posts);

  for (let topicId of topicIds) {
    let posts = yield PostFetcher.getPosts(topicId);
console.log(topicId);
    PostParser.perform(posts);
  }

  console.log(PostParser.store);

  // console.log(topicIds)
  //   console.log(topicIds);
 topicIds.forEach( (topicId) => {
    // console.log(topicIds);
    // let posts = yield PostFetcher.getPosts(topicId);
    // console.log(posts);
    // PostParser.perform(posts);
  });
})