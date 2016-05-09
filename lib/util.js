var url = require('clusterfoo.url-helpers');

class Util {

  static getCatalogUrl() {
    return url.build(process.env.DOMAIN, [process.env.FORUM, 'threads.json'].join('/'));
  }

  static getTopicUrl(topicId) {
    return url.build(process.env.DOMAIN,
      [process.env.FORUM, process.env.POST_URL_POSTFIX, `${topicId}.json`].join('/')
    );
  }
}

module.exports = Util;