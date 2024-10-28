import axios from "axios";

const unsplashApi = axios.create({
    baseURL: "https://api.unsplash.com",
    headers: {
        Authorization: `Client-ID f6gpobrXM0y4oWx1pOg4rnzL33nZNRezV24sEuWFl-0`,
    },
});

export const fetchPhotos = (page = 1) =>
    unsplashApi.get(`/photos`, {
        params: { page },
    });
export const fetchPhotoById = (id) => unsplashApi.get(`/photos/${id}`);
