const Car = require('../models/car');
const SerivceRecord = require('../models/serviceRecord');

module.exports.getAllServiceRecordsForCar = async (req, res) => {
    try {
        const {id} = req.params;
        const car = await Car.findById(id).populate('serviceRecords');
        if (!car) {
            return res.status(404).json({ error: "Service record not found" });
        }
        res.status(200).json(car.serviceRecords);
    } catch (error) {
        console.error("Error in getAllServiceRecordsForCar:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports.getServiceRecordById = async (req,res) => {
    const {serviceRecordId} = req.params;
    const serviceRecord = await SerivceRecord.findById(serviceRecordId);
    res.status(200).json(serviceRecord);
}

module.exports.createServiceRecord = async (req, res) => {
    const {id} = req.params;
    const car = await Car.findById(id);
    const serviceRecord = new SerivceRecord(req.body);
    car.serviceRecords.push(serviceRecord);
    await serviceRecord.save();
    await car.save();
    res.status(200).json(serviceRecord);
}

module.exports.updateServiceRecord = async (req, res) => {
    const {serviceRecordId} = req.params;
    const serviceRecord = await SerivceRecord.findByIdAndUpdate(serviceRecordId, {... req.body}, {new: true})
    await serviceRecord.save();
    res.status(200).json(serviceRecord);
}

module.exports.deleteServiceRecord = async (req, res) => {
    const {id, serviceRecordId} = req.params;
    await Car.findByIdAndUpdate(id, {$pull: {serviceRecords: serviceRecordId}});
    await SerivceRecord.findByIdAndDelete(serviceRecordId);
    res.status(204);
}