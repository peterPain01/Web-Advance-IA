import { Link } from "react-router-dom";
import "./PhotoItem.css";

const PhotoItem = ({ photo }) => (
    <Link to={`/photos/${photo.id}`} className="photo-item">
        <img src={photo.urls.thumb} alt={photo.alt_description || "Photo"} />
        <p>{photo.user.name}</p>
    </Link>
);

export default PhotoItem;
