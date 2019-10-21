var fs = require('fs-extra');
var https = require('https');
var http = require('http');
var http2 = require('http2')
var express = require('express');
var app = express();
var configFileName = process.argv[2]
let configFile = fs.readJsonSync(configFileName, { throws: false })
  , staticFolders;
if (configFile.folders) {
  staticFolders = configFile.folders.filter(folderObject => folderObject.hasOwnProperty("static"))
}
staticFolders.forEach(folder => {
  app.use(express.static(folder.static))
})
// const httpsServer = http2.createServer({
//   //key: fs.readFileSync(__dirname + '/localhost-privkey.pem'),
//   //cert: fs.readFileSync(__dirname + '/localhost-cert.pem')
// }, app);
const httpsServer = http.createServer(app);
httpsServer.listen(8080);




// const http2 = require('http2');
// const fs = require('fs');
// var path = require('path');
// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// function onRequest(req, response) {
//   console.log('request starting...');
//   var filePath = rootFilePath + req.url;
//   console.log(filePath);

//   //if (filePath == './')        filePath = './index.html';

//   var extname = path.extname(filePath);
//   var contentType = 'text/html';
//   switch (extname) {
//     case '.js':
//       contentType = 'text/javascript';
//       break;
//     case '.css':
//       contentType = 'text/css';
//       break;
//     case '.json':
//       contentType = 'application/json';
//       break;
//     case '.png':
//       contentType = 'image/png';
//       break;
//     case '.jpg':
//       contentType = 'image/jpg';
//       break;
//     case '.wav':
//       contentType = 'audio/wav';
//       break;
//   }

//   fs.readFile(filePath, function (error, content) {
//     if (error) {
//       if (error.code == 'ENOENT') {
//         fs.readFile('./404.html', function (error, content) {
//           response.writeHead(200, { 'Content-Type': contentType });
//           response.end(content, 'utf-8');
//         });
//       }
//       else {
//         response.writeHead(500);
//         response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
//         response.end();
//       }
//     }
//     else {
//       response.writeHead(200, { 'Content-Type': contentType });
//       response.end(content, 'utf-8');
//     }
//   });
// }
// const server = http2.createSecureServer({

//   key: fs.readFileSync(__dirname + '/localhost-privkey.pem'),
//   cert: fs.readFileSync(__dirname + '/localhost-cert.pem')
// }, onRequest);

// server.listen(8443)