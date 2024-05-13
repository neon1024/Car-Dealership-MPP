import '../css/ServiceRecordList.css'
import { useNavigate } from 'react-router-dom';

export default function ServiceRecordList({serviceRecords, carId, removeServiceRecord}) {
    const navigateTo = useNavigate();

    const deleteServiceRecord = async (id) => {
        await removeServiceRecord(carId, id);
    }

    return (
        <>
            <ul className="ServiceRecordsList">
                {serviceRecords.map((serviceRecord) => (
                    <li key={serviceRecord._id}>
                        <p>Auto Shop: {serviceRecord.autoShopName}</p>
                        <p>Type: {serviceRecord.type}</p>
                        <p>Date: {serviceRecord.date}</p>
                        <p>Cost: {serviceRecord.cost}</p>
                        <span className='Buttons'><button onClick={() => deleteServiceRecord(serviceRecord._id)}>Delete</button><button onClick={() => navigateTo(`/cars/${carId}/serviceRecords/edit/${serviceRecord._id}`)}>Edit</button></span>
                    </li>
                ))} 
            </ul> 
        </> 
    );
}