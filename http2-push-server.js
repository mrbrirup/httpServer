const http2 = require('http2');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const {
    HTTP2_HEADER_PATH,
    HTTP2_HEADER_METHOD,
    HTTP_STATUS_NOT_FOUND,
    HTTP_STATUS_INTERNAL_SERVER_ERROR
} = http2.constants;

const options = {
    // key: fs.readFileSync('./selfsigned.key'),
    // cert: fs.readFileSync('./selfsigned.crt')
    key: fs.readFileSync(__dirname + '/localhost-privkey.pem'),
    cert: fs.readFileSync(__dirname + '/localhost-cert.pem')
}

const server = http2.createSecureServer(options);

const serverRoot = "./public";

function respondToStreamError(err, stream) {
    console.log(err);
    if (err.code === 'ENOENT') {
        stream.respond({ ":status": HTTP_STATUS_NOT_FOUND });
    } else {
        stream.respond({ ":status": HTTP_STATUS_INTERNAL_SERVER_ERROR });
    }
    stream.end();
}

server.on('stream', (stream, headers) => {
    const reqPath = headers[HTTP2_HEADER_PATH];
    const reqMethod = headers[HTTP2_HEADER_METHOD];

    const fullPath = path.join(serverRoot, reqPath);
    const responseMimeType = mime.lookup(fullPath);

    if (fullPath.endsWith(".html")) {
        console.log('html');
        // handle HTML file
        stream.respondWithFile(fullPath, {
            "content-type": "text/html"
        }, {
            onError: (err) => {
                respondToStreamError(err, stream);
            }
        });

        stream.pushStream({ ":path": "/font.woff" }, { parent: stream.id }, (pushStream) => {
            console.log('pushing');
            pushStream.respondWithFile(path.join(serverRoot, "/font.woff"), {
                'content-type': "text/css"
            }, {
                onError: (err) => {
                    respondToStreamError(err, pushStream);
                }
            });
        });

    } else {
        // handle static file
        console.log(fullPath);
        stream.respondWithFile(fullPath, {
            'content-type': responseMimeType
        }, {
            onError: (err) => respondToStreamError(err, stream)
        });
    }

});

server.listen(443);