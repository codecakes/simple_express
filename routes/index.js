
/*
 * GET home page.
 */

exports.indexNamespace = function indexNamespace (app) {
    var
        namespace = require('express').Router(),
        
        pageIndex = function pageIndex(req, res){
            console.log("Requesting cookie");
            console.log(req.cookies);
            console.log("Requesting from Session");
            console.log(req.session);
            res.render('index', { title: 'Express',
                                  bulu_bulu: "bulu_bulu",
                                  bulu_content: "Up on the bulu bulu"});
        },
        
        //courtesy:
        //http://www.hascode.com/2012/10/html5-server-send-events-using-node-js-or-jetty/
        writeSSE = function writeSSE(res, sseId, data) {
                     console.log('id: ' + sseId + '\n');
                     //res.write('id: ' + sseId + '\n');
                     var html_render ='';
                     res.end("Hellow I am here");
                     /*
                     res.render('index', data, function (err, html) {
                         if ( !( err) ) {
                             console.log(html);
                             html_render = html;
                         }
                     });
                     res.end(html_render);
                     */
                    },
        
        sendSSE = function sendSSE(req, res, data) {
            res.writeHead(200, {
                'Content-Type' : 'text/event-stream',
                'Cache-Control' : 'no-cache',
                'Connection' : 'keep-alive'
                });
            var dt;
            /*
            setInterval(function () {
                    dt = (new Date()).toLocaleTimeString();
                    writeSSE(res, dt, data);
                },1000);
            */
            writeSSE(res, (new Date()).toLocaleTimeString(), JSON.parse(data));
        },
        
        ajaxReq = function ajaxReq(req, res) {
            
            //console.log(req.body);
                
            if (req.accepts(['json', 'jsonp'])) {
                console.log("server side req.query");
                console.log("req.body");
                console.log(req.body);    
                console.log("req.query");
                console.log(req.query);
                
                
                //res.setHeader("Content-Type", "application/json");
                //res.setHeader("Access-Control-Allow-Origin", "*");
                
                var json_data = {data: req.query.textinp,
                                title: 'Express',
                                bulu_bulu: "bulu_bulu",
                                bulu_content: "Up on the bulu bulu"
                };
                //implies res.jsonp(req.query.callback + '('+ JSON.stringify(obj) + ');');
                res.jsonp(json_data);
                //sendSSE(req, res, json_data);
                //res.end();
                
                //#TODO: do something with this to doc reflow instead page reload
                /*
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
                                    });*/
            }
        };
    
    namespace.get('/', pageIndex);
    namespace.get('/ajaxReq', ajaxReq);
    
    app.use('/', namespace);
}