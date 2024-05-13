import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import serviceRecordService from "../utils/serviceRecordService";
import "../css/CarAddForm.css";

export default function ServiceRecordEditForm({updateServiceRecord}) {
    const {id, serviceRecordId} = useParams();
    const navigateTo = useNavigate();
    const [formData, setFormData] = useState({
        autoShopName: "",
        type: "",
        date: "",
        cost: 0,
    });

    useEffect(() => {
        const fetchServiceRecord = async () => {
            try {
                const serviceRecord = await serviceRecordService.getserviceRecordById(id, serviceRecordId);
                setFormData({
                    autoShopName: serviceRecord.autoShopName,
                    type: serviceRecord.type,
                    date: serviceRecord.date,
                    cost: serviceRecord.cost
                })
            } catch(error) {
                console.error('Error fetching serviceRecord', error);
            }
           
        }
        fetchServiceRecord();
    }, []);

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
            await updateServiceRecord(id, serviceRecordId, formData)
            navigateTo(`/cars/details/${id}`);
        } catch (error) {
            console.log(error.message);
        }
        
    }

    return (
        <>
        <h1>Edit Service Record</h1>
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
        </> 
    );
}