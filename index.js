var fs = require('fs-extra');
var https = require('https');
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
const httpsServer = https.createServer({
  key: fs.readFileSync(__dirname + '/localhost-privkey.pem'),
  cert: fs.readFileSync(__dirname + '/localhost-cert.pem')
}, app);
httpsServer.listen(8443);


var list = [
  { key: "a", value: "a" },
  { key: "abbr", value: "abbr" },
  { key: "address", value: "address" },
  { key: "area", value: "area" },
  { key: "article", value: "article" },
  { key: "aside", value: "aside" },
  { key: "audio", value: "audio" },
  { key: "b", value: "b" },
  { key: "base", value: "base" },
  { key: "bdi", value: "bdi" },
  { key: "bdo", value: "bdo" },
  { key: "blockquote", value: "blockquote" },
  { key: "body", value: "body" },
  { key: "br", value: "br" },
  { key: "button", value: "button" },
  { key: "buttonSubmit", value: "button", type: "submit" },
  { key: "buttonReset", value: "button", type: "reset" },
  { key: "buttonButton", value: "button", type: "button" },
  { key: "canvas", value: "canvas" },
  { key: "caption", value: "caption" },
  { key: "cite", value: "cite" },
  { key: "code", value: "code" },
  { key: "col", value: "col" },
  { key: "colgroup", value: "colgroup" },
  { key: "command", value: "command" },

  { key: "commandRadio", value: "command", type:"radio" },
  { key: "commandCheckbox", value: "command", type:"checkbox" },
  { key: "commandCommand", value: "command", type:"command" },

  { key: "datalist", value: "datalist" },
  { key: "dd", value: "dd" },
  { key: "del", value: "del" },
  { key: "details", value: "details" },
  { key: "dfn", value: "dfn" },
  { key: "div", value: "div" },
  { key: "dl", value: "dl" },
  { key: "dt", value: "dt" },
  { key: "em", value: "em" },
  { key: "embed", value: "embed" },
  { key: "fieldset", value: "fieldset" },
  { key: "figcaption", value: "figcaption" },
  { key: "figure", value: "figure" },
  { key: "footer", value: "footer" },
  { key: "form", value: "form" },
  { key: "h1", value: "h1" },
  { key: "h2", value: "h2" },
  { key: "h3", value: "h3" },
  { key: "h4", value: "h4" },
  { key: "h5", value: "h5" },
  { key: "h6", value: "h6" },
  { key: "head", value: "head" },
  { key: "header", value: "header" },
  { key: "hgroup", value: "hgroup" },
  { key: "hr", value: "hr" },
  { key: "html", value: "html" },
  { key: "i", value: "i" },
  { key: "iframe", value: "iframe" },
  { key: "img", value: "img" },

  { key: "input", value: "input", type: "" },
  { key: "inputText", value: "input", type: "text" },
  { key: "inputPassword", value: "input", type: "password" },
  { key: "inputCheckbox", value: "input", type: "checkbox" },
  { key: "inputRadio", value: "input", type: "radio" },
  { key: "inputButton", value: "input", type: "button" },
  { key: "inputSubmit", value: "input", type: "submit" },
  { key: "inputReset", value: "input", type: "reset" },
  { key: "inputFile", value: "input", type: "file" },
  { key: "inputHidden", value: "input", type: "hidden" },
  { key: "inputImage", value: "input", type: "image" },
  { key: "inputDatetime", value: "input", type: "datetime" },
  { key: "inputDatetimeLocal", value: "input", type: "datetime-local" },
  { key: "inputDate", value: "input", type: "date" },
  { key: "inputMonth", value: "input", type: "month" },
  { key: "inputTime", value: "input", type: "time" },
  { key: "inputWeek", value: "input", type: "week" },
  { key: "inputNumber", value: "input", type: "number" },
  { key: "inputRange", value: "input", type: "range" },
  { key: "inputEmail", value: "input", type: "email" },
  { key: "inputUrl", value: "input", type: "url" },
  { key: "inputSearch", value: "input", type: "search" },
  { key: "inputTel", value: "input", type: "tel" },
  { key: "inputColor", value: "input", type: "color" },

  { key: "ins", value: "ins" },
  { key: "kbd", value: "kbd" },
  { key: "keygen", value: "keygen" },
  { key: "label", value: "label" },
  { key: "legend", value: "legend" },
  { key: "li", value: "li" },
  { key: "link", value: "link" },
  { key: "map", value: "map" },
  { key: "mark", value: "mark" },
  { key: "menu", value: "menu" },
  { key: "meta", value: "meta" },

  { key: "metaName", value: "meta" },
  { key: "metaHttpEquivRefresh", value: "meta", attr: "http-equiv", attrVal: "'refresh'" },
  { key: "metaHttpEquivDefaultStyle", value: "meta", attr: "http-equiv", attrVal: "'default-style'" },
  { key: "metaCharset", value: "meta", attr: "charset", attrVal: "args[0].charset ? args[0].charset : 'UTF-8'" },
  { key: "metaHttpEquivContentType", value: "meta", attr: "http-equiv", attrVal: "'content-type'" },

  { key: "meter", value: "meter" },
  { key: "nav", value: "nav" },
  { key: "noscript", value: "noscript" },
  { key: "object", value: "object" },
  { key: "ol", value: "ol" },
  { key: "optgroup", value: "optgroup" },
  { key: "option", value: "option" },
  { key: "output", value: "output" },
  { key: "p", value: "p" },
  { key: "param", value: "param" },
  { key: "pre", value: "pre" },
  { key: "progress", value: "progress" },
  { key: "q", value: "q" },
  { key: "rp", value: "rp" },
  { key: "rt", value: "rt" },
  { key: "ruby", value: "ruby" },
  { key: "s", value: "s" },
  { key: "samp", value: "samp" },
  { key: "script", value: "script" },
  { key: "section", value: "section" },
  { key: "select", value: "select" },
  { key: "small", value: "small" },
  { key: "source", value: "source" },
  { key: "span", value: "span" },
  { key: "strong", value: "strong" },
  { key: "style", value: "style" },
  { key: "sub", value: "sub" },
  { key: "summary", value: "summary" },
  { key: "sup", value: "sup" },
  { key: "table", value: "table" },
  { key: "tbody", value: "tbody" },
  { key: "td", value: "td" },
  { key: "textarea", value: "textarea" },
  { key: "tfoot", value: "tfoot" },
  { key: "th", value: "th" },
  { key: "thead", value: "thead" },
  { key: "time", value: "time" },
  { key: "title", value: "title" },
  { key: "tr", value: "tr" },
  { key: "track", value: "track" },
  { key: "u", value: "u" },
  { key: "ul", value: "ul" },
  { key: "var", value: "var" },
  { key: "video", value: "video" },
  { key: "wbr", value: "wbr" }
]

var targetFolder = "C:\\Development\\mrbrAssembly\\html"

var classContents = `class {
    static get inherits() { return ["Mrbr.Html.BaseHtml"]; }
      constructor(...args) {
      let self = this;
      self._elementType = "{value}"
      self.base(...args)        
      self.element.setAttribute("id", self.id);
      self.element.setAttribute("name", self.name);
      {type}
      {attr}      
    } 
  }`

list.forEach(listEntry => {
  let clsContents = classContents.replace(/\{value\}/g, listEntry.value)
  clsContents = clsContents.replace(/\{type\}/g, listEntry.type ? `self.frameElement.addAttribute("type", "${listEntry.type}")` : "")
  clsContents = clsContents.replace(/\{attr\}/g, listEntry.attr ? `self.frameElement.addAttribute("${listEntry.attr}", ${listEntry.attrVal})` : "")
  fs.writeFileSync(`${targetFolder}\\${listEntry.key}.js`, clsContents)
})

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