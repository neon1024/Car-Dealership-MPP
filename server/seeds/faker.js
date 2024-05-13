const mongoose = require('mongoose');
const Car = require('../models/car');
const ServiceRecord = require('../models/serviceRecord');
const { faker } = require('@faker-js/faker');


mongoose.connect('mongodb://127.0.0.1:27017/cars')
.then(() => {
    console.log('Mongo connection open');
})
.catch(err => {
    console.log('Mongo connection ERROR');
    console.log(e);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const seedDb = async () => {
    try {
        await Car.deleteMany({});
        await ServiceRecord.deleteMany({});
        for (let i = 0; i < 200; i++) { 
            const car = new Car({
                make: faker.vehicle.manufacturer(),
                model: faker.vehicle.model(),
                year: faker.number.int({ min: 1990, max: 2024 }).toString(),
                price: faker.number.int({ min: 1000, max: 300000 }), 
                image: 'image'
            });

            for (let j = 0; j < 50; j++) { 
                const serviceRecord = new ServiceRecord({
                    autoShopName: faker.company.buzzPhrase(),
                    type: faker.helpers.arrayElement(['Oil Change', 'Tire Rotation', 'Brake Inspection', 'Repair']),
                    date: faker.date.past(),
                    cost: faker.number.int({ min: 100, max: 15000 }) 
                });
                await serviceRecord.save();
                car.serviceRecords.push(serviceRecord); 
            }
            await car.save();  
        }
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}
seedDb()
.then(() => {
    mongoose.connection.close();
});