let config = require('./config');
let path = require('path');
let fs = require('fs');
let mime = require('mime');
let chalk = require('chalk');
let util = require('util');
let url = require('url');
let http = require('http');
let stat = util.promisify(fs.stat);
let zlib = require('zlib');
// set NODE_ENV=static:app
// export NODE_ENV=static:app
// debug后面放置的是参数 可以根据后面的参数决定是否打印
let debug = require('debug')('static:app');
let ejs = require('ejs');
let tmpl = fs.readFileSync(path.join(__dirname, 'tmpl.ejs'), 'utf8');
let readdir = util.promisify(fs.readdir);
class Server {
    constructor(args) {
        this.confg = {...config,...args};
        this.tmpl = tmpl;
    }
    handleRequest() {
        return async (req, res) => {
            let { pathname } = url.parse(req.url, true);
            // 不管小图标
            if(pathname === '/favicon.ico') return res.end();
            let p = path.join(this.confg.dir, '.' + pathname);
            debug(p)
            try {
                let statObj = await stat(p);
                if (statObj.isDirectory()) {
                    // 是目录展示目录内容
                    // 模板引擎 ejs 
                    let dirs = await readdir(p); // 读取目录的文件路径
                    dirs = dirs.map(dir => ({
                        path: path.join(pathname, dir),
                        name: dir
                    }))
                    let content = ejs.render(this.tmpl, { dirs });
                    res.setHeader('Content-Type', 'text/html;charset=utf8');
                    res.end(content);
                } else {
                    this.sendFile(req, res, p, statObj);
                }
            } catch (e) {
                this.sendError(req, res, e)
            }
        }
    }
    cache(req, res, statObj) {
        // 一般是内容的一个md5 ctime-size
        let ifNoneMatch = req.headers['if-none-match'];
        // 文件的最新修改时间
        let ifModifiedSince = req.headers['if-modified-since'];
        // 服务器上的文件的最新修改时间
        let since = statObj.ctime.toUTCString();
        // 代表的是服务器文件的一个描述
        let etag = new Date(since).getTime() + '-' + statObj.size;
        res.setHeader('ETag', etag);
        res.setHeader('Last-Modified', since);
        res.setHeader('Cache-Control', 'max-age=10');
        if (ifNoneMatch !== etag) {
            return false;
        }
        if (ifModifiedSince != since) {
            return false;
        }
        res.statusCode = 304;
        res.end();
        return true;
    }
    compress(req, res, p, statObj) {
        let header = req.headers["accept-encoding"];
        if (header) {
            if (header.match(/\bgzip\b/)) {
                res.setHeader('Content-Encoding', 'gzip')
                return zlib.createGzip();
            } else if (header.match(/\bdeflate\b/)) {
                res.setHeader('Content-Encoding', 'deflate')
                return zlib.createDeflate();
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    range(req,res,p,statObj){
        let range = req.headers['range'];
        let start = 0;
        let end = statObj.size;
        if(range){
            let [,s,e] = range.match(/bytes=(\d*)-(\d*)/);
            start = s? parseInt(s):start;
            end = e?parseInt(e):end;
            res.setHeader('Accept-Ranges', 'bytes');
            res.setHeader('Content-Range',`bytes ${start}-${end}/${statObj.size}`)
        }
        return {start,end:end-1}
    }
    sendFile(req, res, p, statObj) {
        // 缓存的功能 对比 强制
        if (this.cache(req, res, statObj)) return;
        // 压缩 Accept-Encoding: gzip,deflate,br
        // Content-Encoding:gzip
        res.setHeader('Content-Type', mime.getType(p) + ';charset=utf8');
        let s = this.compress(req, res, p, statObj);
        // 范围请求 
        let {start,end} = this.range(req,res,p,statObj);
        let rs = fs.createReadStream(p,{start,end})
        if (s) {
            rs.pipe(s).pipe(res);
        } else {
            rs.pipe(res);
        }
    }
    sendError(req, res, e) {
        debug(util.inspect(e).toString());
        res.statusCode = 404;
        res.end();
    }
    start() {
        let { port, hostname } = this.confg;
        let server = http.createServer(this.handleRequest());
        let url = `http://${hostname}:${chalk.green(port)}`;
        debug(url);
        server.listen(port, hostname);
    }
}
module.exports = Server