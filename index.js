const http2 = require('http2');
const fs = require('fs');
var path = require('path');

console.log(process.argv)
var rootFilePath = process.argv[2]
function onRequest(req, response) {
  console.log('request starting...');
  var filePath = rootFilePath + req.url;
  console.log(filePath);

  //if (filePath == './')        filePath = './index.html';

  var extname = path.extname(filePath);
  var contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.wav':
      contentType = 'audio/wav';
      break;
  }

  fs.readFile(filePath, function (error, content) {
    if (error) {
      if (error.code == 'ENOENT') {
        fs.readFile('./404.html', function (error, content) {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        });
      }
      else {
        response.writeHead(500);
        response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
        response.end();
      }
    }
    else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
}
const server = http2.createSecureServer({
  
  key: fs.readFileSync(__dirname + '/localhost-privkey.pem'),
  cert: fs.readFileSync(__dirname + '/localhost-cert.pem')
}, onRequest);
 
server.listen(8443)