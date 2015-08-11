
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
    http = require("http"),
    responseTime = require("response-time"),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    methodOverride = require('method-override'),
    path = require('path'),
    logger = require('morgan'),
    errorHandler = require('errorhandler'),
    fs = require("fs"),
    fileStreamRotator = require('file-stream-rotator'),
    iniparser = require("iniparser"),
    configFile = iniparser.parseSync(path.join(__dirname, 'config', 'config.ini')),
    partial = require("express-partial"),
    cookieParser = require("cookie-parser"),
    session = require('express-session'),
    random = require('random-js')(),
    parse = require("parseurl"),
    MongoStore = require('connect-mongo')(session),
    //import controller routes
    routes = require('./routes'),
    //import route handler 
    handler = require(path.join(__dirname, "routes_handler", "handler.js"));
    
  
  //Create the log dir if it doesn't exist
  fs.existsSync(path.join(__dirname, configFile.logDir)) || fs.mkdirSync(path.join(__dirname, configFile.logDir));
  
  // Configuration
  app.set('port', process.env.PORT || parseInt(configFile.PORT));
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.set('env', process.env['NODE_ENV'] || 'development');
  app.set('trust proxy', 1);
  
  var logfile = path.join(__dirname, configFile.logDir, "log-%DATA%.log");
  app.use(logger('combined',
                fileStreamRotator.getStream({
                  filename: logfile.toString(),
                  verbose: true,
                  frequency: 'daily'
                })
          ));
  app.use(logger(app.get('env')));
  
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  //app.use(multer()); // for parsing multipart/form-data
  app.use(methodOverride());
  app.use(responseTime());
  app.use(partial());
  
  var secret = random.uuid4();
  
  //Store less metaData on cookies using cookie parser
  app.use(cookieParser(secret));
  
  //Backend can store much more session data using Session Storage
  app.use(session({
    resave: false,
    saveUninitialized: false,
    path: '/',
    //If secure is set, and you access your site over HTTP, the cookie will not be set.
    //secure: true is a recommended option. However, it requires an https-enabled website, 
    //i.e., HTTPS is necessary for secure cookies. 
    // If you have your node.js behind a proxy and are using secure: true, 
    //you need to set "trust proxy" in express:
    //cookie: { secure: true },  
    cookie: {},
    //httpOnly: true,
    //secure: true,
    secret: secret,
    store: new MongoStore({ url: 'mongodb://localhost/simple_express',
    autoRemove: 'disabled'})}
    ));
  
  //check if empty object
  function CheckObjNull (obj) {
    var l = [];
    
    for (var count in obj) {
      l.push(obj[count]);
    }
    return l.length === 0;
  };
  
  //Record Total Hits in Session per route
  app.use(function Views(req, res, next) {
    var
      sess = req.session,
      pathname;
    
    pathname = parse(req).pathname;
    
    if (sess.views) {
      sess.views[pathname]++;
    }
    else {
      sess.views = sess.views || {};
      sess.views[pathname] = 1;
    }
    
    next();
  });
  
  //Record individual user Hits per route
  app.use(function UserViews(req, res, next) {
    var
      cookies = req.session.cookie,
      pathname;
    
    pathname = parse(req).pathname;
    
    if (cookies.user_view) {
      cookies.user_view[pathname]++;
    }
    else {
      cookies.user_view = cookies.user_view || {};
      cookies.user_view[pathname] = 1;
    }
    
    next();
  });
  
  
  // Routes
  
  app.use('/', router);
  handler.handler(router);
  
  // use stylus middleware and static after setting router
  app.use(require("stylus").middleware({
    compress:true,
    src: path.join(__dirname, 'public', 'stylesheets')
  }));
  
  app.use(express.static(path.join(__dirname, 'public')));
  
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