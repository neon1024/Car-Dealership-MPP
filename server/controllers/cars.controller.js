const Car = require('../models/car');

module.exports.getAllCars = async (req, res) => {
    // added for infinite scroll
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const sort = req.query.sort || 'ascending';
    const offset = (page - 1) * limit;
    try {
        const cars = await Car.find().skip(offset).limit(limit);
        // cars.sort((a, b) => {
        //     const makeA = a.make.toLowerCase();
        //     const makeB = b.make.toLowerCase();
        //     if (sort === 'ascending') {
        //         if (makeA < makeB) return -1;
        //         if (makeA > makeB) return 1;
        //     } else {
        //         if (makeA < makeB) return 1;
        //         if (makeA > makeB) return -1;
        //     }
        //     return 0;
        // });
        res.status(200).json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to get cars');
    }
    //
    // try {
    //     const cars = await Car.find({});
    //     res.status(200).json(cars);
    // } catch (err) {
    //     res.status(404).send("Failed to get cars");
    // }   
}

module.exports.getCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        res.status(200).json(car);
    } catch (err) {
        res.status(404).send("Car not found");
    }
}

module.exports.createCar = async (req, res) => {
    try {
        const car = new Car(req.body);
        await car.save();
        res.status(201).json(car);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports.updateCar = async (req, res) => {
    try {
        const {id} = req.params;
        const car = await Car.findByIdAndUpdate(id, {...req.body}, {new: true});
        await car.save();
        res.status(200).json(car);
    } catch (err) {
        res.status(404).send("Car not found");
    }
}

module.exports.deleteCar = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedCar = await Car.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        res.status(404).send("Car not found");
    }
}
