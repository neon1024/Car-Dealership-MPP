import "../css/CarList.css"
import CarItem from "./CarItem";
import { CSVLink } from "react-csv";
import { useState } from "react";

export default function CarList({cars, sortCars, deleteSelected}) {

    const [isShowing, setIsShowing] = useState(false);
    const [selectedCars, setSelectedCars] = useState([]);

    const toggleShowing = () => {
        setIsShowing(!isShowing);
    }

    const handleCheck = (carId) => {
        const isSelected = selectedCars.includes(carId);
        setSelectedCars(prevSelectedCars => isSelected ? prevSelectedCars.filter(id => id !== carId) : [...prevSelectedCars, carId]);
    }

    const handleDelete = () => {
        deleteSelected(selectedCars);
        setIsShowing(false);
    }

    return (
        <div className="Cars">
            <h1>Cars Available</h1>
            <header className="Header">
                <button onClick={sortCars}>Sort Cars</button>
                <button onClick={toggleShowing} className="BulkDelete">{isShowing ? "Cancel" : "Bulk Delete"}</button>
                <CSVLink className="CSVLink" data={cars}>Download cars data</CSVLink>
            </header>
            
            <ul className="CarList">
                {cars.map((car) => (
                <li key={car._id} className="CarList-Item">
                   <CarItem car={car}/>
                    <a href={`/cars/details/${car._id}`}>Details</a>
                    <input type="checkbox" className={isShowing ? "ShowCheckbox" : "HideCheckbox"} checked={selectedCars.includes(car._id)} onChange={() => handleCheck(car._id)}/> 
                </li>
                ))}
                <li key="last-1" className="CarList-Item-Last"></li>
                <li key="last-2" className="CarList-Item-Last"></li>
            </ul>
            <div className={isShowing ? "DeleteAllShow" : "DeleteAllHide"}>
                <button className="DeleteAllBtn" onClick={handleDelete}>
                    <img className="DeleteAllImg" src="https://cdn2.iconfinder.com/data/icons/thin-line-color-1/21/33-512.png" alt="delete" />
                </button>
            </div>
            <footer className="Footer">
                <a className="AddCar" href="/cars/add">Add Car</a>
            </footer>
        </div>
        
    );
}