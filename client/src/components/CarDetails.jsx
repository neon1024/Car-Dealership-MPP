import "../css/CarDetails.css";
import carService from "../utils/carService";
import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect } from "react";
import useCarStore from "../store/carStore";
import serviceRecordService from "../utils/serviceRecordService";

import ServiceRecordList from "./ServiceRecordList";

export default function CarDetails({removeCar, removeServiceRecord}) {
    const { id } = useParams();
    const navigateTo = useNavigate();
    //const car = cars.find(car => car._id === id);
    const [car, setCar] = useState(undefined);
    const [serviceRecords, setServiceRecords] = useState([]);
    //const car = useCarStore(state => state.cars.find(car => car._id === id));
    

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const car = await carService.getCarById(id);
                setCar(car);
            } catch(error) {
                console.error('Error fetching car', error);
            }
           
        }

        const fetchServiceRecords = async () => {
            try {
                const fetchedServiceRecords = await serviceRecordService.getAllserviceRecordsForCar(id);
                setServiceRecords(fetchedServiceRecords);
            } catch(error) {
                console.error('Error fetching service records', error);
            }
            
        }

        fetchCar();
        fetchServiceRecords();
    }, []);

    const deleteCar = async () => {
        await removeCar(car._id);
        navigateTo('/cars');
    }

    return (
        <div className="CarDetails">
            {car === undefined ? <h1>The car you're looking for doesn't exist</h1> :
                <div>
                    <div className="Car">
                        <img src={car.image} alt="Car Image" />
                        <p>Manufacturer: {car.make}</p>
                        <p>Model: {car.model}</p>
                        <p>Year: {car.year}</p>
                        <p>Price: {car.price}€</p>
                        <span className="Buttons"><button className="Delete-Button" onClick={deleteCar}>Delete</button> <button onClick={() => navigateTo(`/cars/edit/${car._id}`)} className="Edit-Button">Edit</button></span>
                    </div>
                    <div className="ServiceRecords">
                        <h2><u>Service records</u></h2>
                        <ServiceRecordList serviceRecords={serviceRecords} carId={id} removeServiceRecord={removeServiceRecord}></ServiceRecordList>
                        <button onClick={() => navigateTo(`/cars/${car._id}/serviceRecords/add`)}>Add Service Record</button>
                    </div> 
                </div>
            }
            <a className="Back-Link" href="/cars">Go Back</a>
        </div>
    );
}