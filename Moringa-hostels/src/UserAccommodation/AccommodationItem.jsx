import { Link } from "react-router-dom";

function AccommodationItem({ name, image, description, id }) {
  return (
    <div className="hostel-card">
      <img className="hostel-image" src={image} alt={name} />
      <div className="hostel-info">
        <h2 className="hostel-name">{name}</h2>
        <p className="hostel-description">{description}</p>
        <div className="hostel-buttons">
          <Link to="/roomUsers" state={{ accommodationId: id }}>  {/* ✅ Pass accommodationId in state */}
            <button className="roomView-btn">View Rooms</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccommodationItem;
