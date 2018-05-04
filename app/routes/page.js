var page = require('../models/page');

module.exports = function(router) {
    router.route('/api/pages/:page_name').get(function (req, res) {
        console.log("Logging for GET Request ->  /api/pages/:page_name");
        page.findById(req.params.page_name, function (err, pge) {
            if (err)
                res.send(err);
            res.json(pge);
        });
    });

    router.route('/api/pages').get(function (req, res) {
        console.log("Logging for GET Request ->  /api/pages");
        page.find(function (err, pages) {
            if (err) {
                res.send(err);
            }
            res.send(pages);
        });
    });

    router.route('/api/page').post(function (req, res) {
        console.log("Logging for POST Request ->  /api/page");
        var p = new page();
        console.log("Req Body -> " + JSON.stringify(req.body));
        console.log("Body -> " + req.body.name + " | " + req.body.html + " | " + req.body.script);
        p.name = req.body.name;
        p.html = req.body.html;
        p.script = req.body.script;
        p.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.send({ message: 'Page Created!' })
        });
    });
};