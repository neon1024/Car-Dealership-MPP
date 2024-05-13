import "../css/CarItem.css"

export default function CarItem({car}) {

    return (
        <div className="CarItem">
            <img src={car.image} alt="Car Image" />
            <p>{car.make}</p>
            <p><span>{car.model}</span> <span>{car.year}</span></p>
            <p>Price: {car.price}€</p>
            <p>Number of service records: {car.serviceRecords.length}</p>
        </div>
    );

}