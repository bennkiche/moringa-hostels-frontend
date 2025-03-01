import AccommodationCard from "./AccommodationCard";

const AccommodationList = ({ accommodations }) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {accommodations.map((accommodation) => (
        <AccommodationCard key={accommodation.id} accommodation={accommodation} />
      ))}
    </div>
  );
};

export default AccommodationList;
