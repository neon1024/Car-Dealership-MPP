import axios from "axios";

const BASE_URL = 'http://localhost:8800/cars/:id/serviceRecords';

const serviceRecordService = {
    getAllserviceRecordsForCar: async (carId) => {
        try {
            const response = await axios.get(`http://localhost:8800/cars/${carId}/serviceRecords`);
            return response.data;
        } catch (error) {
            throw error;
        }       
    },
    getserviceRecordById: async (carId, id) => {
        try {
            const response = await axios.get(`http://localhost:8800/cars/${carId}/serviceRecords/${id}`);
            return response.data;
          } catch (error) {
            throw error;
          }
    },
    addServiceRecord: async (carId, serviceRecordData) => {
        try {
            const response = await axios.post(`http://localhost:8800/cars/${carId}/serviceRecords`, serviceRecordData);
            return response.data;
          } catch (error) {
            throw error;
        }
    },
    updateServiceRecord: async (carId, id, serviceRecordData) => {
        try {
            const response = await axios.put(`http://localhost:8800/cars/${carId}/serviceRecords/${id}`, serviceRecordData);
            return response.data;
          } catch (error) {
            throw error;
          }
    },
    deleteServiceRecord: async (carId, id) => {
        try {
            await axios.delete(`http://localhost:8800/cars/${carId}/serviceRecords/${id}`);
        } catch (error) {
            throw error;
        }
    }
}

export default serviceRecordService;