import axios from "axios";

const BASE_URL = 'http://localhost:8800/cars';

const carService = {
    getAllCars: async (currentPage, limit, sort) => {
        try {
            const response = await axios.get(`${BASE_URL}?page=${currentPage}&limit=${limit}&sort=${sort}`);
            return response.data;
        } catch (error) {
            throw error;
        }       
    },
    getCarById: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data;
          } catch (error) {
            throw error;
          }
    },
    addCar: async (carData) => {
        try {
            const response = await axios.post(BASE_URL, carData);
            return response.data;
          } catch (error) {
            throw error;
        }
    },
    updateCar: async (id, carData) => {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, carData);
            return response.data;
          } catch (error) {
            throw error;
          }
    },
    deleteCar: async (id) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
        } catch (error) {
            throw error;
        }
    }
};

export default carService;
