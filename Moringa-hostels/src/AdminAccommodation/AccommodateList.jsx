import AccommodateItem from "./AccommodateItem";

function AccommodateList({accommodate,setAccommodate}){
    return(
       <div id="container">
          {accommodate.length >0? accommodate.map(accommodates => (
            <AccommodateItem 
            key={accommodates.id}
            id={accommodates.id}
            name={accommodates.name}
            image={accommodates.image}
            description={accommodates.description}
            accommodate={accommodate} 
            setAccommodate={setAccommodate}
            />
          )):null}
       </div>
    )
}

export default AccommodateList;