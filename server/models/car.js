const mongoose = require('mongoose');
const ServiceRecord = require('./serviceRecord');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    make: String,
    model: String,
    year: String,
    price: Number,
    image: String,
    serviceRecords: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ServiceRecord'
        }
    ]
});

CarSchema.post('findOneAndDelete', async function (document) {
    if (document) {
        await ServiceRecord.deleteMany({
            _id: {
                $in: document.serviceRecords
            }
        }); 
    }
});

module.exports = mongoose.model('Car', CarSchema);

