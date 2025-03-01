import { Link } from "react-router-dom";

const AccommodationCard = ({ accommodation }) => {
  return (
    <div className="border p-4 rounded shadow">
      <img src={accommodation.image} alt={accommodation.name} className="w-full h-40 object-cover rounded" />
      <h3 className="text-lg font-bold mt-2">{accommodation.name}</h3>
      <p>{accommodation.location}</p>
      <p className="text-blue-500">${accommodation.price} per night</p>
      <Link to={`/accommodation/${accommodation.id}`} className="text-blue-600 mt-2 block">
        View Details
      </Link>
    </div>
  );
};

export default AccommodationCard;
