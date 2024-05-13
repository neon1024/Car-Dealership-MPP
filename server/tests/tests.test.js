const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Car = require('../models/car');

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/cars-test', {
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Car.deleteMany({});
});

describe('GET /cars', () => {
  test('should get all cars', async () => {
    await Car.create({
      make: 'Toyota',
      model: 'Corolla',
      year: '2022',
      price: 25000,
      image: 'corolla.jpg',
    });

    const response = await request(app).get('/cars');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});

describe('GET /cars/:id', () => {
  test('should get a car by id', async () => {
    const car = await Car.create({
      make: 'Toyota',
      model: 'Corolla',
      year: '2022',
      price: 25000,
      image: 'corolla.jpg',
    });

    const response = await request(app).get(`/cars/${car._id}`);

    expect(response.status).toBe(200);
    expect(response.body.make).toBe('Toyota');
    expect(response.body.model).toBe('Corolla');
  });

  test('should return 404 if car id is not found', async () => {
    const response = await request(app).get('/cars/invalid_id');

    expect(response.status).toBe(404);
    expect(response.text).toBe('Car not found');
  });
});

describe('POST /cars', () => {
  test('should create a new car', async () => {
    const newCar = {
      make: 'Honda',
      model: 'Accord',
      year: '2023',
      price: 30000,
      image: 'accord.jpg',
    };

    const response = await request(app).post('/cars').send(newCar);

    expect(response.status).toBe(201);
    expect(response.body.make).toBe('Honda');
  });
});

describe('PUT /cars/:id', () => {
  test('should update a car by id', async () => {
    const car = await Car.create({
      make: 'Toyota',
      model: 'Corolla',
      year: '2022',
      price: 25000,
      image: 'corolla.jpg',
    });

    const updatedCar = {
      make: 'Toyota',
      model: 'Camry',
      year: '2022',
      price: 28000,
      image: 'camry.jpg',
    };

    const response = await request(app)
      .put(`/cars/${car._id}`)
      .send(updatedCar);

    expect(response.status).toBe(200);
    expect(response.body.model).toBe('Camry');
  });

  test('should return 404 if car id is not found', async () => {
    const response = await request(app).put('/cars/invalid_id').send({});

    expect(response.status).toBe(404);
    expect(response.text).toBe('Car not found');
  });
});

describe('DELETE /cars/:id', () => {
  test('should delete a car by id', async () => {
    const car = await Car.create({
      make: 'Toyota',
      model: 'Corolla',
      year: '2022',
      price: 25000,
      image: 'corolla.jpg',
    });

    const response = await request(app).delete(`/cars/${car._id}`);

    expect(response.status).toBe(204);

    const deletedCar = await Car.findById(car._id);
    expect(deletedCar).toBeNull();
  });

  test('should return 404 if car id is not found', async () => {
    const response = await request(app).delete('/cars/invalid_id');

    expect(response.status).toBe(404);
    expect(response.text).toBe('Car not found');
  });
});