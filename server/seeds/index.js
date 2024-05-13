const mongoose = require('mongoose');
const Car = require('../models/car');
const ServiceRecord = require('../models/serviceRecord');
const User = require('../models/user');

const dbUrl = 'mongodb://127.0.0.1:27017/cars';

mongoose.connect(dbUrl)
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
    await Car.deleteMany({});
    await ServiceRecord.deleteMany({});
    //await User.deleteMany({});

    const serviceRecord1 = new ServiceRecord({autoShopName: "Mercedes Service", type: "oil change", date: "2017-12-22", cost: 500});
    await serviceRecord1.save();
    const serviceRecord2 = new ServiceRecord({autoShopName: "Mercedes Service", type: "repair", date: "2018-11-11", cost: 10000});
    await serviceRecord2.save();
    const serviceRecord3 = new ServiceRecord({autoShopName: "Audi Service", type: "oil change", date: "2018-10-14", cost: 450});
    await serviceRecord3.save();
    const serviceRecord4 = new ServiceRecord({autoShopName: "BMW Service", type: "oil change", date: "2022-06-25", cost: 500});
    await serviceRecord4.save();

    const car1 = new Car({make: "Mercedes", model: "CLA", year: "2020", price: 30000, image: "https://upload.wikimedia.org/wikipedia/commons/7/71/Mercedes-Benz_C118_IMG_2673.jpg", serviceRecords: [serviceRecord1._id, serviceRecord2._id]});
    await car1.save();
    const car2 = new Car({make: "Mercedes", model: "CLS", year: "2022", price: 80000, image: "https://frankfurt.apollo.olxcdn.com/v1/files/jci1a0lw66jv2-RO/image;s=1000x750"});
    await car2.save();
    const car3 = new Car({make: "Mercedes", model: "GLC", year: "2021", price: 50000, image: "https://www.mercedes-benz.ro/content/romania/ro/passengercars/models/suv/glc/overview/_jcr_content/root/responsivegrid/tabs/tabitem/hotspot_module/hotspot_simple_image.component.damq1.3314754749195.jpg/mercedes-benz-glc-suv-x254-exterior-hotspot-3302x1858-05-2022.jpg"});
    await car3.save();
    const car4 = new Car({make: "Audi", model: "A4", year: "2019", price: 20000, image: "https://t4.ftcdn.net/jpg/04/51/65/87/360_F_451658744_Bm9QLAj1D0nluOkPHDKVXKTSZ6jRBOOS.jpg", serviceRecords: [serviceRecord3._id]});
    await car4.save();
    const car5 = new Car({make: "BMW", model: "M4", year: "2023", price: 90000, image: "https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6Imk3dnVjcG93NWhpcDMtQVVUT1ZJVFJPIn0.-Vn6Nw9AKoccB9mU2OtHRoCswQQBglGSWp_f2lLqTAA/image;s=644x461", serviceRecords: [serviceRecord4._id]});
    await car5.save();
}

seedDb()
.then(() => {
    mongoose.connection.close();
});