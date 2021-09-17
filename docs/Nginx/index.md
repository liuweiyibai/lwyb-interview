# Nginx

## Docker + Nginx

```bash
docker run -p 8080:8080 --name proxy_nginx -v /data/nginx/proxy_nginx/log/:/var/log/nginx -v /data/nginx/proxy_nginx/nginx.conf:/etc/nginx/nginx.conf -v /data/nginx/proxy_nginx/conf.d/:/etc/nginx/conf.d -v /data/nginx/proxy_nginx/dist/:/usr/share/nginx/html -d nginx

# 日志目录
# 配置目录
# 静态文件目录
```
