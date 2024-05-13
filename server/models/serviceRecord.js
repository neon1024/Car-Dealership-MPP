const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceRecordSchema = new Schema({
    autoShopName: String,
    type: String,
    date: String,
    cost: Number
});

module.exports = mongoose.model('ServiceRecord', ServiceRecordSchema);