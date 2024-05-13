import axios from "axios";

const BASE_URL = 'http://localhost:8800';

const userService = {
    registerUser: async (userData) => {
        try {
            const response = await axios.post(`${BASE_URL}/register`, userData, {withCredentials: true});
            return response.data;
        } catch (error) {
            throw error;
        }       
    },
    loginUser: async (userData) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, userData, {withCredentials: true});
            return response.data;
          } catch (error) {
            throw error;
          }
    },
    logoutUser: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/logout`, {withCredentials: true});
            return response.data;
          } catch (error) {
            throw error;
        }
    },
    getUser: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/users/${id}`, {withCredentials: true});
            return response.data;
          } catch (error) {
            throw error;
        }
    },
    getDecodedToken: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/cookie`, {withCredentials: true});
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getEmailConfirmation: async (token) => {
        try {
            const response = await axios.get(`${BASE_URL}/confirmation/${token}`, {withCredentials: true});
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default userService;
