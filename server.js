var express = require('express');
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var morgan = require('morgan');
    
Object.assign=require('object-assign')

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); 

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3030,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
      mongoPassword = process.env[mongoServiceName + '_PASSWORD']
      mongoUser = process.env[mongoServiceName + '_USER'];

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;
  }
}

if(mongoURL == null)
  mongoURL = 'mongodb://localhost:27017/self-learning-dev';

var db = null,
    dbDetails = new Object();

var initDb = function(callback) {
  if (mongoURL == null) return;

  mongoose.connect(mongoURL, function(err, conn) {
    if (err) {
      callback(err);
      return;
    }

    db = conn;
    dbDetails.databaseName = db.databaseName;
    dbDetails.url = mongoURLLabel;
    dbDetails.type = 'MongoDB';

    console.log('Connected to MongoDB at: %s', mongoURL);
  }); 
};

var routes = require("./app/routes");
app.use('/', routes);

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
