const http = require('http');
const url = require('url');

const handlers = {};

handlers.notFound = (callback) => callback(404, { message: 'Not found!' });
handlers.getHello = (callback) => callback(200, { message: 'Welcome!' });
handlers.postHello = (callback) => callback(200, { message: 'Welcome!' });

const router = {
  get: {
    hello: handlers.getHello
  },
  post: {
    hello: handlers.postHello
  }
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
  const method = req.method.toLowerCase();

  const handler = router[method][path] || handlers.notFound;

  handler((code, obj) => {
    const payload = JSON.stringify(obj);

    res.setHeader('Content-Type', 'application/json');
    res.writeHead(code);
    res.end(payload);
  });
});

server.listen(3000, () => console.log('App is now runnig on port 3000'));
