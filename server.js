var DEBUG = -1,
    INFO = 0;

var express = require('express'),
    log = require('custom-logger').config({
        format: '%timestamp% %event%:%padding% %message%',
        level: DEBUG // INFO
    });

log.new({
    debug: { color: 'cyan', level: DEBUG,  event: 'debug' }
});

var server = express();

//server.get('/', function(request, response){
//    response.writeHead(200, {'Content-Type': 'text/plain'});
//    response.write('test');
//    response.end();
//}); // home faq doc

/* our main handler */
server.use(express.static(__dirname + '/public'));
server.use('/js', express.static(__dirname + '/js'));
server.use('/css', express.static(__dirname + '/css'));
server.use(express.logger()); 
server.get(
    /^\/(\d+)x(\d+)\/(any|[0-9A-Fa-f]{6})\/((\S+,)*\S+)?$/,
    function(request, response) {
        var params   = request.params,
            width    = params[0],
            height   = params[1],
            color    = params[2],
            keywords = params[3];
    
        log.debug('Request for image size ' + width + 'x' + height +
                  ', color ' + color + ', keywords = ' +
                  (keywords === undefined ? '(no keywords)' : keywords));

        response.send('test');

    }
);

server.listen(1234);
