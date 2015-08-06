exports.testNamespace = function testNamespace (app) {
    var
        namespace = require('express').Router(),
        
        test = function test(req, res) {
                    //this will fail and give a decorated msg courtesy router and errorHandler
                    tatu();
                    res.send("<p>This is a test</p>");
                };
        
        namespace.get('/', test);
        
        namespace.use(function error400(req, res, next) {
             res.status(400);
             res.render("error400", {
                error: "Hmmm...my last straw",
                msg: "Actually, we haven't published such a page..yet.",
                src1: "https://farm9.staticflickr.com/8142/7706530240_718f34f1e6_o_d.jpg", //birdie
                src2: "https://pixabay.com/static/uploads/photo/2015/03/25/13/04/page-not-found-688965_640.png", //404
                src3: "https://upload.wikimedia.org/wikipedia/commons/a/af/Notfound.png" //404 espanole
             });
             next();
         });
         
        namespace.use(function error500(err, req, res, next) {
            res.status(500);
            res.render("error500", {
                error: err.toString(),
                msg: "You may think anything goes but this page actually is not properly implemented. Maybe later.",
                src:"https://40.media.tumblr.com/94465034675ed1a2e9df3196895030b1/tumblr_nnsjrusajT1smegxwo1_500.png"
            });
            next();
          });
         
         
         
        app.use('/test', namespace);
}
