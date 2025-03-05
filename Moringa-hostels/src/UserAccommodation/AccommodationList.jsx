import AccommodationItem from "./AccommodationItem";

function AccommodationList({ accommodation, setAccommodation }) {
    return (
        <div id="acc-container">
            {accommodation.length > 0 ? accommodation.map(acc => (
                <AccommodationItem 
                    key={acc.id}
                    id={acc.id}
                    name={acc.name}
                    image={acc.image}
                    description={acc.description}
                    latitude={acc.latitude}
                    longitude={acc.longitude}
                    accommodation={accommodation} 
                    setAccommodation={setAccommodation}
                />
            )) : null}
        </div>
    );
}

export default AccommodationList;
