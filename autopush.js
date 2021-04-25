const path = require('path');
const OSS = require('ali-oss');
const globby = require('globby');
const slash = require('slash');
require('colors');
require('dotenv').config({
  path: './.env.local',
});

class Uploader {
  constructor(config = {}) {
    this.config = {
      ossPath: '.',
      buildRoot: '',
      deleteOrigin: false,
      deleteEmptyDir: false,
      timeout: 30 * 1000,
      setHeaders: null,
      overwrite: true,
      region: '',
      accessKeyId: '',
      accessKeySecret: '',
      bucket: '',
      ...config,
    };
    const { region, accessKeyId, accessKeySecret, bucket } = this.config;
    this.client = new OSS({
      region,
      accessKeyId,
      accessKeySecret,
      bucket,
    });

    this.filesUploaded = [];
    this.filesIgnored = [];
  }

  async start() {
    const { buildRoot } = this.config;
    const from = path.join(__dirname, buildRoot);
    const files = await globby(from);

    if (files.length) await this.upload(files);
    else {
      console.log('no files to be uploaded');
      return Promise.resolve('no files to be uploaded');
    }
  }

  async upload(files) {
    const { buildRoot, ossPath, setHeaders, timeout, overwrite } = this.config;

    files = files.map((file) => path.resolve(file));

    this.filesUploaded = [];
    this.filesIgnored = [];

    const splitToken =
      '/' + path.resolve(buildRoot).split('/').slice(-2).join('/') + '/';
    try {
      for (let filePath of files) {
        console.log('====================================');
        console.log(filePath);
        console.log('====================================');
        let ossFilePath = slash(
          path.join(ossPath, splitToken && filePath.split(splitToken)[1])
        );

        // const fileExists = await this.fileExists(ossFilePath);

        // if (fileExists) {
        //   this.filesIgnored.push(filePath);
        //   console.log(`file: ${filePath} is already exists \n`.green);
        //   continue;
        // }

        const headers = (setHeaders && setHeaders(filePath)) || {};
        let result = await this.client.put(ossFilePath, filePath, {
          timeout,
          headers: overwrite
            ? headers
            : Object.assign(headers, { 'x-oss-forbid-overwrite': true }),
        });

        result.url = this.normalize(result.url);
        this.filesUploaded.push(filePath);

        console.log(
          filePath.blue,
          '\nupload to ' + ossFilePath + ' success,'.green,
          'cdn url =>',
          result.url.green
        );
      }
    } catch (err) {
      console.log(
        `failed to upload to ali oss: ${err.name}-${err.code}: ${err.message}`
          .red
      );
    }
  }

  fileExists(filepath) {
    return this.client
      .get(filepath)
      .then((result) => {
        return result.res.status === 200;
      })
      .catch((e) => {
        if (e.code == 'NoSuchKey') {
          return false;
        }
      });
  }

  normalize(url) {
    const tmpArr = url.split(/\/{2,}/);
    if (tmpArr.length > 2) {
      const [protocol, ...rest] = tmpArr;
      url = protocol + '//' + rest.join('/');
    }
    return url;
  }
}

const { region, accessKeyId, accessKeySecret, bucket } = process.env;

new Uploader({
  ossPath: './interview/',
  buildRoot: './docs/.vitepress/dist/',
  region,
  accessKeyId,
  accessKeySecret,
  bucket,
}).start();
