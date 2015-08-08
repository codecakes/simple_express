
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
        },
        
        ajaxReq = function ajaxReq(req, res) {
            
            //console.log(req.body);
            
            if (req.accepts(['text', 'json', 'html'])) {
                //#TODO: do something with this to doc reflow instead page reload
                console.log("server side req.query");
                console.log(req.body);
                res.render('index', {ajaxReq: true, 
                                    data: req.body.textinp,
                                    title: 'Express',
                                    bulu_bulu: "bulu_bulu",
                                    bulu_content: "Up on the bulu bulu"
                                    },
                                    function (err, html) {
                                        if ( !( err ) ) {
                                            res.send(html);   
                                        }
                                    });
                //res.json({ajaxReq: req.body.textinp})
                //res.send(JSON.stringify({ajaxReq: req.body.textinp}));
                
                /*
                res.render('ajaxReq', {data: req.body.textinp.toString()}, 
                            function renderHtmlToFs(err, html) {
                                //res.status(200);
                                //When the parameter is a Buffer object, 
                                //the method sets the Content-Type response header field to “application/octet-stream”, 
                                //unless previously defined
                                //res.set('Content-Type', 'text/html');
                                //res.writeHead(200, { 'Content-Type': 'text/html' });
                                console.log(html);
                                //res.send(new Buffer(html));
                                res.send(html);
                                res.json({val: req.body.textinp.toString()});
                            });
                */
            }
        };
    
    namespace.get('/', pageIndex);
    namespace.post('/', ajaxReq);
    
    app.use('/', namespace);
}