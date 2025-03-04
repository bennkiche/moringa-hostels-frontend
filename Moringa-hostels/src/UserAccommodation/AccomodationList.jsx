import AccommodationItem from "./AccommodationItem";

function AccommodationList({accommodation,setAccommodation}){
    return(
       <div id="container">
          {accommodation.length >0? accommodation.map(accommodates => (
            <AccommodationItem 
            key={accommodates.id}
            id={accommodates.id}
            name={accommodates.name}
            image={accommodates.image}
            description={accommodates.description}
            accommodation={accommodates.id} 
            setAccommodation={setAccommodation}
            />
          )):null}
       </div>
    )
}

export default AccommodationList;