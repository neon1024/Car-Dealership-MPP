import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/CarAddForm.css";

export default function ServiceRecordAddForm({addServiceRecord}) {
    const {id} = useParams();
    const navigateTo = useNavigate();
    const [formData, setFormData] = useState({
        autoShopName: "",
        type: "",
        date: "",
        cost: 0,
    });

    const handleChange = (event) => {
        const changedField = event.target.name;
        const newValue = event.target.value;
        setFormData(currentData => {
            return {
                ...currentData,
                [changedField]:newValue
            }
        });
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await addServiceRecord(id, formData);
            navigateTo(`/cars/details/${id}`);
        } catch (error) {
            console.log(error.message);
        }  
    }

    return (
        <>
        <h1>Add Service Record</h1>
        <form className="CarAddForm" onSubmit={handleSubmit}>
            <label htmlFor="autoShopName">Auto Shop Name</label>
            <input type="text" placeholder="autoShopName" value={formData.autoShopName} onChange={handleChange} name="autoShopName" />
            <label htmlFor="type">Type</label>
            <input type="text" placeholder="type" value={formData.type} onChange={handleChange} name="type" />
            <label htmlFor="date">Date</label>
            <input type="text" placeholder="date" value={formData.date} onChange={handleChange} name="date" />
            <label htmlFor="cost">Cost</label>
            <input type="text" placeholder="cost" value={formData.cost} onChange={handleChange} name="cost" />
            <button type="submit">Submit</button>
        </form>
        <button onClick={() => {navigateTo(`/cars/details/${id}`)}}>Go Back</button>
        </> 
    );
}