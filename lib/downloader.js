var nativeFS = require('fs');
var fs       = require('co-fs');
var request  = require('request');
var util     = require('./util');

class Downloader {

  static getFileResponse(uri) {
    return request({
      url: util.getFileUrl(uri),
      headers: {
        'User-Agent' : process.env.USER_AGENT
      }
    });
  }

  static *saveFile({ path, name }) {
    let dirExists = yield this.checkIfDirExists();

    if (!dirExists) {
      let err = yield fs.mkdir(process.env.FILE_PATH);
    }

    let wstream = nativeFS.createWriteStream(process.env.FILE_PATH + '/' + name);

    this.getFileResponse(path).pipe(wstream);
    wstream.close();
  }

  static *checkIfDirExists() {
    return yield fs.exists(process.env.FILE_PATH);
  }
}

module.exports = Downloader;