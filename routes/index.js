
/*
 * GET home page.
 */

exports.indexNamespace = function indexNamespace (app) {
    var
        namespace = require('express').Router(),
        
        pageIndex = function pageIndex(req, res){
          res.render('index', { title: 'Express',
                              bulu_bulu: "bulu_bulu",
                              bulu_content: "Up on the bulu bulu"});
        };
    
    namespace.get('/', pageIndex);
    app.use('/', namespace);
}