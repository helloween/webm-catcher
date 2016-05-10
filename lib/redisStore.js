var redisConnection = require('./redisConnection');

class RedisStore {

  static persist(values) {
    this.persistMd5sumAsKey(values);
    this.persistWebmData(values);
  }

  static persistMd5sumAsKey({ md5 }) {
    redisConnection.rpush('webm_md5:list', md5);
  }

  static persistWebmData({ md5, name }) {
    redisConnection.hmset('webm_data:hash', `${md5}_name`, name);
  }
}

module.exports = RedisStore;