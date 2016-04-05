var hotle = require('../web service/index.js')
var http = require('http');

http.createServer(function(req,res){

    var hotleReviews1 = {
        name: 'Mizpe Hayamim',
        brunch: 'Boutique Hotel'
    }

    var hotleReviews2 = {
        name: 'Berashit',
        brunch: 'Boutique Hotel'
    }

    var h1 = hotle(hotleReviews1);
    h1.like(4);
    h1.unlike(5);
    h1.unlike(2);
  

    var h2 = hotle(hotleReviews2);
    h2.like(2);
    h2.unlike(1);


    res.writeHeader(200, { 'Content-Type' : 'text/plain'});
    res.end('success: \n' + h1.getLogs());

}).listen(8080,'127.0.0.1');   

console.log('listening on port 8080');

