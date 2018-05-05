var pagecount = require('../models/pagecount');

/*module.exports = function(router) {
    router.route('/pagecount').get(function (req, res) {
        console.log("Logging for GET Request ->  /pagecount");
        pagecount.find(function (err, pagecounts) {
            if (err) {
                res.send(err);
            }
            res.send(pagecounts.findOne().count());
        });
        res.status(200).send('200');
    });
};*/