var redisConnection = require('./redisConnection');

class RedisStore {

  static persist(values) {
    this.persistMd5sumAsKey(values);
    this.persistWebmData(values);
  }

  static persistMd5sumAsKey({ md5sum }) {
    redisConnection.rpush('webm_md5:list', md5sum);
  }

  static persistWebmData({ md5sum, uri }) {
    redisConnection.hmset('webm_data:hash', `${md5sum}_uri`, uri);
  }
}

module.exports = RedisStore;