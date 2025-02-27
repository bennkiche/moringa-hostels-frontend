import RoomItem from "./RoomItem";

function RoomList({room,setRoom}){
    return(
       <div id="container">
          {room.length >0? room.map(accommodates => (
            <RoomItem
            key={accommodates.id}
            id={accommodates.id}
            name={accommodates.name}
            description={accommodates.description}
            room={room} 
            setRoom={setRoom}
            />
          )):null}
       </div>
    )
}

export default RoomList;