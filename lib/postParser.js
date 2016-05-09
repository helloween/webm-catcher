
class PostParser {
  let md5UriStore = {};

  static get store() {
    return md5UriStore;
  }

  static set store(md5sum, uri) {
    md5UriStore[md5sum] = uri;
  }

  static get webmRegexp() {
    return /^([a-z]|[0-9])+?\.webm$/i;
  }

  static isWebm(fileName) {
    return this.webmRegexp.test(fileName);
  }

  static storePostFiles(post) {
    if (post && post['files'] instanceof Array) {
      post['files'].each( (fileField) => {
        if (this.isWebm(fileField['name'])) {
          this.store(fileField['md5'], fileField['path']);
        }
      } )
    }
  }

  static perform(posts) {
    posts.each( (post) => this.storePostFiles(post) )
  }
}

module.exports = PostParser;