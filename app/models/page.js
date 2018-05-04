var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var pageSchema = new Schema({
    name: {type : String, default: ''},
    html: {type : String, default: ''},
    script : {type : String, default: ''}
});

module.exports = mongoose.model('page', pageSchema);