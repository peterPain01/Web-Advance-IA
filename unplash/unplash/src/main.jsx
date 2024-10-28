import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PhotoDetailsPage from "./pages/PhotoDetailsPage.jsx";
import PhotoGrid from "./components/PhotoGrid.jsx";

const router = createBrowserRouter([
    {
        path: "/photos",
        element: <PhotoGrid />,
    },
    {
        path: "/photos/:id",
        element: <PhotoDetailsPage />,
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </StrictMode>
);
