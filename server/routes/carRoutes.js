const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');

const cars = require('../controllers/cars.controller')

router.route('/')
.get(cars.getAllCars)
.post(cars.createCar);

router.route('/:id')
.get(cars.getCar)
.put(cars.updateCar)
.delete(cars.deleteCar);


module.exports = router;