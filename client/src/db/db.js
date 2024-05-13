import Dexie from 'dexie';
import carService from '../utils/carService';

export const db = new Dexie('offlineDB');
db.version(1).stores({
    cars: '++id, make, model, year, price, image, method, _id'
});

export const saveCarLocally = async (carData, method) => {
    await db.cars.add({...carData, method});
}

export const syncDataWithBackend = async () => {
    const offlineCarsData = await db.cars.where('method').anyOf('POST', 'PUT').toArray();

    for (let carData of offlineCarsData) {
        if (carData.method === 'POST') {
            const newCar = {make: carData.make, model: carData.model, year: carData.year, price: carData.price, image: carData.image};
            try {
                await carService.addCar(newCar);
            } catch (error) {
                console.error('Error syncing car data', error);
            }
        }
        else if (carData.method === 'PUT') {
            const updatedCar = {make: carData.make, model: carData.model, year: carData.year, price: carData.price, image: carData.image};
            try {
                await carService.updateCar(carData._id, updatedCar);
            } catch (error) {
                console.error('Error syncing car data', error);
            }
        }
        await db.cars.update(carData.id, {method: 'synced'});
    }
}

export const clearOfflineDb = async () => {
    try {
        await db.delete();
    } catch (error) {
        console.error('Offline db data could not be deleted', error);
    }
}

