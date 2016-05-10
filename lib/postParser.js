var RedisStore = require('./redisStore');
var Downloader = require('./downloader');

class PostParser {
  // this.md5UriStore = {};

  static get store() {
    return this.md5UriStore || {};
  }

  static set store(fileField) {
    let {md5, path} = fileField;

    if (!this.md5UriStore)
      this.md5UriStore = {};

    this.md5UriStore[md5] = path;
  }

  static get webmRegexp() {
    return /^([a-z]|[0-9])+?\.webm$/i;
  }

  static isWebm(fileName) {
    return this.webmRegexp.test(fileName);
  }

  static *storePostFiles(post) {
    if (post && Array.isArray(post['files'])) {
      for (let fileField of post['files']) {
        if (this.isWebm(fileField['name'])) {
          // let fileRecord = { md5sum: fileField['md5'], uri: fileField['path'] };
          this.store = fileField;
          RedisStore.persist(fileField);
          yield Downloader.saveFile(fileField);
        }
      }
    }
  }

  static *perform(posts) {
    for (let post of posts) {
      yield this.storePostFiles(post);
    }
    // posts.forEach( (post) => yield this.storePostFiles(post) )
  }
}

module.exports = PostParser;