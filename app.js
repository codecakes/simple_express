
/**
 * Module dependencies.
 * https://github.com/senchalabs/connect#middleware
 * Migration from 3.x to 4.x: http://expressjs.com/guide/migrating-4.html
 * creator: @codecakes
 * maintainer:
 *  @codecakes
 */

(function app() {
  var 
    express = require('express'),
    app = module.exports = express(),
    debug = require('debug')(app),
    router = express.Router(),
    routes = require('./routes'),
    http = require("http"),
    responseTime = require("response-time"),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    path = require('path'),
    logger = require('morgan'),
    errorHandler = require('errorhandler'),
    fs = require("fs"),
    fileStreamRotator = require('file-stream-rotator'),
    iniparser = require("iniparser"),
    configFile = iniparser.parseSync(path.join(__dirname, 'config', 'config.ini')),
    handler = require(path.join(__dirname, "routes_handler", "handler.js"));
  
  //Create the log dir if it doesn't exist
  fs.existsSync(path.join(__dirname, configFile.logDir)) || fs.mkdirSync(configFile.logDir);
  
  // Configuration
  app.set('port', process.env.PORT || parseInt(configFile.PORT));
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.set('env', process.env['NODE_ENV'] || 'development');
  
  var logfile = path.join(__dirname, configFile.logDir, "log-%DATA%.log");
  app.use(logger(app.get('env')));
  app.use(logger('combined',
                fileStreamRotator.getStream({
                  filename: logfile.toString(),
                  verbose: true,
                  frequency: 'daily'
                })
          ));
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride());
  app.use(responseTime());
  app.use(express.static(path.join(__dirname, 'public')));
  
  
  // Routes
  
  app.use('/', router);
  handler.handler(router);
  
  // error handling middleware should be loaded after the loading the routes
  if ('development' == app.get('env')) {
    app.use(errorHandler({ dumpExceptions: true, showStack: true }));
  }
  
  if ('production' == app.get('env')) {
    app.use(errorHandler());
  }
  
  http.createServer(app).listen(app.get('port'), configFile.IP, function(){
    console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
  });

})();