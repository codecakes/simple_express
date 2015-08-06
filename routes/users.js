exports.userNamespace = function userNamespace (app) {
    var
        namespace = require('express').Router(),
        
        index = function (req, res) {
            res.end("this is index");
        },
        
        create = function (req, res) {
            res.end("this is create");
        },
        
        read = function (req, res) {
            res.end("this is read");
        },
        
        update = function (req, res) {
            res.end("this is update");
        },
        
        del  = function (req, res) {
            res.end("this is delete");
        };
    
    namespace.get('/', index);
    namespace.post('/create', create);
    namespace.get('/read', read);
    namespace.put('/update', update);
    namespace.delete('/detele', del);
    
    app.use('/users', namespace);
}