var RedisStore = require('./redisStore');


class PostParser {
  // this.md5UriStore = {};

  static get store() {
    return this.md5UriStore || {};
  }

  static set store(fileRecord) {
    let {md5sum, uri} = fileRecord;

    if (!this.md5UriStore)
      this.md5UriStore = {};

    this.md5UriStore[md5sum] = uri;
    RedisStore.persist(fileRecord);
  }

  static get webmRegexp() {
    return /^([a-z]|[0-9])+?\.webm$/i;
  }

  static isWebm(fileName) {
    return this.webmRegexp.test(fileName);
  }

  static storePostFiles(post) {
    if (post && Array.isArray(post['files'])) {
      post['files'].forEach( (fileField) => {
        if (this.isWebm(fileField['name'])) {
          this.store = { md5sum: fileField['md5'], uri: fileField['path'] };
        }
      })
    }
  }

  static perform(posts) {
    posts.forEach( (post) => this.storePostFiles(post) )
  }
}

module.exports = PostParser;