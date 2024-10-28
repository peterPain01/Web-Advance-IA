import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPhotoById } from "../services/api";
import "./PhotoDetailsPage.css";

const PhotoDetailsPage = () => {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    useEffect(() => {
        const loadPhoto = async () => {
            const response = await fetchPhotoById(id);
            setPhoto(response.data);
            setLoading(false);
        };
        loadPhoto();
    }, [id]);

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="photo-detail-container">
            <div className="photo-image">
                <img
                    className="image"
                    src={photo.urls.full}
                    alt={photo.alt_description || "Photo"}
                />
            </div>
            <div className="photo-info">
                <h2>{photo.alt_description || "Untitled Photo"}</h2>
                <p>
                    <strong>Author:</strong> {photo.user.name}
                </p>
                <p>
                    <strong>Description:</strong>{" "}
                    {photo.description || "No description available"}
                </p>
                <p>
                    <strong>Likes:</strong> {photo.likes}
                </p>
                <p>
                    <strong>Location:</strong>{" "}
                    {photo.location?.name || "Unknown"}
                </p>
                <img src={photo.sponsorship?.sponsor.profile_image.medium} />
                <button className="button" onClick={() => navigate(-1)}>
                    Back to Home page
                </button>
            </div>
        </div>
    );
};

export default PhotoDetailsPage;
