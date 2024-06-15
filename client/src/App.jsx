import './css/App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useState, useEffect} from 'react';
import carService from './utils/carService';
import serviceRecordService from './utils/serviceRecordService.js';
import userService from './utils/userService.js';
import useCarStore from './store/carStore';
import axios from 'axios';
import * as db from './db/db.js';
import Dexie from 'dexie';

import Home from './components/Home';

import CarList from './components/CarList';
import CarDetails from './components/CarDetails';
import CarAddForm from './components/CarAddForm';
import CarEditForm from './components/CarEditForm';

import ServiceRecordAddForm from './components/ServiceRecordAddForm.jsx';
import ServiceRecordEditForm from './components/ServiceRecordEditForm.jsx';

import UserLoginForm from './components/UserLoginForm.jsx';
import UserRegisterForm from './components/UserRegisterForm.jsx';
import UserProfile from './components/UserProfile.jsx'
import VerificationPage from './components/VerificationPage.jsx';

// axios.interceptors.response.use(
//   async (response) => {
//     console.log(response.config.data);
//     return response;
//   },
//   async (error) => {
//     if (error.code === 'ERR_NETWORK') {
//       console.log('Network error, retrying...');
//       console.error(error);
//       console.log(error.config.data);
//       await new Promise(resolve => setTimeout(resolve, 10000));
//       return axios(error.config);
//     } 
//   }
// );

export default function App() {
    const [cars, setCars] = useState([]);
    const [backendDown, setBackendDown] = useState(true);
    const [sort, setSort] = useState('ascending');
    //const cars = useCarStore(state => state.cars);
    //const setCars = useCarStore(state => state.setCars);

    //infinite scroll
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    //const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const fetchedCars = await carService.getAllCars(currentPage, itemsPerPage, sort);
                setCars([...cars, ...fetchedCars]);
                setBackendDown(false);
            } catch (error) {
                console.error('Error fetching cars', error);
                if (error.code === 'ERR_NETWORK') {
                    setBackendDown(true);
                }
            }
        }
        fetchCars();
    }, [currentPage]);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        if (scrollY + windowHeight >= documentHeight - 100) {
            setCurrentPage(currentPage + 1);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [currentPage]);

    //
    useEffect(() => {
        const syncData = async () => {
            const databaseExists = await Dexie.exists('offlineDB');
            if (backendDown === false && databaseExists) {
                await db.syncDataWithBackend();
                await db.clearOfflineDb();
            }
        }
        syncData();
    }, [backendDown])

    const addCar = async (car) => {
        try {
            const newCar = await carService.addCar(car);
            setCars(prevCars => [...prevCars, newCar]);
            setBackendDown(false);
        } catch (error) {
            console.error('Error adding car', error);
            if (error.code === 'ERR_NETWORK') {
                console.log('error adding car');
                setBackendDown(true);
                db.saveCarLocally(car, 'POST');
            }
        }
    }

    const updateCar = async (id, updatedCar) => {
        try {
            await carService.updateCar(id, updatedCar);
            setBackendDown(false);
        } catch (error) {
            console.error('Error updating car', error);
            if (error.code === 'ERR_NETWORK') {
                console.log('error updating car');
                setBackendDown(true);
                db.saveCarLocally({...updatedCar, _id: id}, 'PUT');
            }
        }
    }

    const removeCar = async (id) => {
        try {
            await carService.deleteCar(id);
            setCars(prevCars => prevCars.filter(car => car._id !== id));
            setBackendDown(false);
        } catch (error) {
            console.error('Error removing car', error);
            setBackendDown(true);
        }
    };

    const sortCars = () => {
        // const sortedCars = [...cars];
        // sortedCars.sort((a, b) => {
        //     const makeA = a.make.toLowerCase();
        //     const makeB = b.make.toLowerCase();
        //     if (makeA < makeB) return -1;
        //     if (makeA > makeB) return 1;
        //     return 0;
        // });
        // setCars(sortedCars);
        if (sort === 'ascending') {
            setSort('descending');
        } else {
            setSort('ascending');
        }
        const fetchSorted = async () => {
            const sortedCars = await carService.getAllCars(currentPage, itemsPerPage, sort);
            setCars(sortedCars);
        }
        fetchSorted();
    }

    const deleteSelected = (selectedCars) => {
        selectedCars.forEach(async (id) => {
            await removeCar(id);
        });
        setCars(prevCars => prevCars.filter(car => !selectedCars.includes(car._id)));
    }

    const addServiceRecord = async (carId, newServiceRecord) => {
        try {
            await serviceRecordService.addServiceRecord(carId, newServiceRecord);
        } catch (error) {
            console.error('Error adding service record', error);
        }
    }

    const updateServiceRecord = async (carId, id, updatedServiceRecord) => {
        try {
            await serviceRecordService.updateServiceRecord(carId, id, updatedServiceRecord);
        } catch (error) {
            console.error('Error adding service record', error);
        }
    }

    const removeServiceRecord = async (carId, id) => {
        try {
            await serviceRecordService.deleteServiceRecord(carId, id);
        } catch (error) {
            console.error('Error adding service record', error);
        }
    }

    const registerUser = async (userData) => {
        try {
            const emailToken = await userService.registerUser(userData);
            // console.log(emailToken);
            return emailToken;
            //setCurrentUser(currentUser);
        } catch (error) {
            console.error('Error registering user', error);
        }
    }

    const loginUser = async (userData) => {
        try {
            const currentUser = await userService.loginUser(userData);
            alert("login successful");
            return currentUser;
            //setCurrentUser(currentUser);
        } catch (error) {
            console.error('Error logging in user', error);
        }
    }

    const logoutUser = async () => {
        try {
            await userService.logoutUser();
            //setCurrentUser(undefined);
        } catch (error) {
            console.error('Error logging out user', error);
        }
    }

    return (
        <Router>
            <div className='content'>
                <Routes>
                    <Route path='/' element={<Home logoutUser={logoutUser}/>}/>
                    <Route path='/login' element={<UserLoginForm loginUser={loginUser}/>}/>
                    <Route path='/register' element={<UserRegisterForm registerUser={registerUser}/>}/>
                    <Route path='/cars' element={<CarList cars={cars} sortCars={sortCars} deleteSelected={deleteSelected}/>}/>
                    <Route path='/cars/details/:id' element={<CarDetails removeCar={removeCar} removeServiceRecord={removeServiceRecord}/>}/>
                    <Route path='/cars/edit/:id' element={<CarEditForm cars={cars} updateCar={updateCar}/>}/>
                    <Route path='/cars/add' element={<CarAddForm addCar={addCar}/>}/>
                    <Route path='/cars/:id/serviceRecords/add' element={<ServiceRecordAddForm addServiceRecord={addServiceRecord}/>}/>
                    <Route path='/cars/:id/serviceRecords/edit/:serviceRecordId' element={<ServiceRecordEditForm updateServiceRecord={updateServiceRecord}/>}/>
                    <Route path='/users/:id' element={<UserProfile/>}/>
                    <Route path='/confirmation/:token' element={<VerificationPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}


