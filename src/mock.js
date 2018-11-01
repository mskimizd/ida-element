var http = require("http");

var result = require("./mock/result");

var hasBody = function(req){
    return 'transfer-encoding' in req.headers || 'content-length' in req.headers;
}
var mime = function(req){
    var str = req.headers['content-type'] || '';
    return str.split(";")[0];
}
var handle = function(req, res, proc){
    if(hasBody(req)){
        var buffers = [];var size=0;
        req.on('data', function(chunk){
            buffers.push(chunk);
            size += chunk.length;
        });
        req.on('end', function(){
            req.rawBody = Buffer.concat(buffers, size).toString();
            if(mime(req) === 'application/x-www-form-urlencoded'){
                req.body = querystring.parse(req.rawBody);
            }else if(mime(req) === 'application/json'){
                try {
                    req.body = JSON.parse(req.rawBody);
                } catch (error) {
                    res.writeHead(400);
                    res.end('invalid JSON');
                    return;
                }
            }
            proc(req, res);
        });
    }else{
        proc(req, res);
    }
}

var server = http.createServer(function(req,res){
    if(req.url == '/search' ) {
        handle(req, res, function(req, res){
            res.writeHead(200,{
                'Content-type':"application/json",
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Headers":"Content-Type",
                "Access-Control-Allow-Methods":"GET,POST,OPTIONS"
            });
            if(req.method == 'OPTIONS'){
                res.end(); 
            }else if(req.method == 'POST'){
                var page = req.body['page'];
                page = page % 4;
                if(page==0) page = 4;
                console.log((page-1)*10+" - "+page*10);
                // console.log(result.sets.slice((page-1)*10,page*10));
                res.end(JSON.stringify({ code:200, data:result.sets.slice((page-1)*10,page*10) }));                
            }
            // console.log(111);
        });      
    }
 });
server.listen('3000',function(){
    console.log("服务器启动");
});