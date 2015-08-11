exports.counterNamespace = function (app) {
    var
        namespace = require('express').Router(),
        
        counter = function (req, res) {
            var count= req.signedCookies.counter || 0;
            
            count++;
            res.cookie('counter', count, {
                signed: true,
                path: '/counter'
            });
            
            console.log("Views");
            console.log(req.session.views);
            
            res.render('counter', {
                counter: req.signedCookies.counter,
                views: req.session.views['/counter'],
                user_view: req.session.cookie.user_view['/counter']
                //sid: req.session.get(req.signedCookies['connect.sid'], req.session)
            });
            console.log("cookie count: %s - Unsigned %s - Signed %s",
            count, req.cookies.counter,req.signedCookies.counter);
            console.log("signed cookie is:");
            console.log(req.signedCookies);
            console.log("req.session.cookie");
            console.log(req.session.cookie);
            console.log("req.session");
            console.log(req.session);
        };
    
    namespace.get('/', counter);
    
    app.use('/counter', namespace);
}