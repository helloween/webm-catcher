var request = require('co-request');
var fs      = require('co-fs');
var util    = require('./util');

class Downloader {

  static *getFile(uri) {
    let response = yield request({
      url: util.getFileUrl(uri),
      headers: {
        'User-Agent' : process.env.USER_AGENT
      }
    });

    return response.body;
  }

  static *saveFile({ path, name }) {
    let content = yield this.getFile(path);
    let dirExists = yield this.checkIfDirExists();
    console.log("obj", dirExists);
    if (!dirExists) {
      let err = yield fs.mkdir(process.env.FILE_PATH);
    }

    yield fs.writeFile(process.env.FILE_PATH + '/' + name, content);
  }

  static *checkIfDirExists() {
    // let destDir = yield fs.stat(process.env.FILE_PATH);
    // let exists = yield fs.exists(process.env.FILE_PATH);
// console.log("obj");
    return yield fs.exists(process.env.FILE_PATH);
  }
}

module.exports = Downloader;