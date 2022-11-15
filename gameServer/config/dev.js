module.exports = {
  "env": "dev",
  "port": 8080,
  "whiteList": ["/","/api/login", "/api/register","/api/healthCheck","/api/upload",'/api/articleInit','/api/getArticleInfo','/admin/login','/admin/register'],
  "adminWhiteList": ['/admin/login','/admin/register'],
  "baseUrl": "http://localhost:8080",
  "mongo": {
    "url": "mongodb+srv://Jackknack:91ZJgjqf@cluster0.izrloio.mongodb.net/?retryWrites=true&w=majority",
    // "url": "mongodb://127.0.0.1:27017/app_db"
  },
  "redis": {
    "host": "124.220.160.190",
    "port": 6379,
    "password": "",
    "db": 1
  },
  "jwt": {
    "secret": "icubespace_test",
    "algorithms": ["HS256"]
  },
  "salt": 10
}
  