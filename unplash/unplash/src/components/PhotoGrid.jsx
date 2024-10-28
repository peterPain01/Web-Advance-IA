import React, { useState, useEffect } from "react";
import { fetchPhotos } from "../services/api";
import PhotoItem from "./PhotoItem";
import "./PhotoGrid.css";
import { Oval } from "react-loader-spinner";

const PhotoGrid = () => {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(3);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchPhotos().then((response) => {
            setPhotos(response.data);
        });
        fetchPhotos(2).then((response) => {
            setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
        });
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    function handleScroll() {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.scrollHeight - 1
        ) {
            if (loading || !hasMore) return;
            setPage((prev) => prev + 1);
        }
    }

    useEffect(() => {
        setLoading(true);
        const loadPhotos = async () => {
            setTimeout(async () => {
                const response = await fetchPhotos(page);
                setPhotos((prev) => [...prev, ...response.data]);
                setHasMore(response.data.length > 0);
                setLoading(false);
            }, 2000);
        };
        loadPhotos();
    }, [page]);

    return (
        <div className="container">
            <div className="photo-grid" onScroll={() => handleScroll}>
                {photos.map((photo) => (
                    <PhotoItem key={photo.id} photo={photo} />
                ))}
            </div>
            <div className="center">
                {loading && (
                    <div className="loading">
                        <Oval
                            visible={true}
                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                        .
                    </div>
                )}
                {!hasMore && <div className="end-message">End of list</div>}
            </div>
        </div>
    );
};

export default PhotoGrid;
