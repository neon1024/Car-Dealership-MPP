const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');

const serviceRecords = require('../controllers/serviceRecords.controller');

router.route('/')
.get(serviceRecords.getAllServiceRecordsForCar)
.post(serviceRecords.createServiceRecord);

router.route('/:serviceRecordId')
.get(serviceRecords.getServiceRecordById)
.put(serviceRecords.updateServiceRecord)
.delete(serviceRecords.deleteServiceRecord);

module.exports = router;