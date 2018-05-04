var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    console.log('Logging for request -> /');
    res.sendfile('./public/views/index.html');
});

require('./page')(router);

module.exports = router;