import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AccommodationDetails = () => {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/accommodations/${id}`)
      .then((res) => res.json())
      .then((data) => setAccommodation(data));
  }, [id]);

  if (!accommodation) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <img src={accommodation.image} alt={accommodation.name} className="w-full h-60 object-cover rounded" />
      <h1 className="text-2xl font-bold mt-4">{accommodation.name}</h1>
      <p className="text-gray-600">{accommodation.location}</p>
  
      <p className="mt-4">{accommodation.description}</p>
    </div>
  );
};

export default AccommodationDetails;
