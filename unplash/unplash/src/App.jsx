import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import PhotoGrid from "./components/PhotoGrid";
import PhotoDetailsPage from "./pages/PhotoDetailsPage";

function App() {
    <Router>
        <Routes>
            <Route path="/photos" element={<PhotoGrid />} />
            <Route path="/photos/:id" element={<PhotoDetailsPage />} />
            <Route path="*" element={<Navigate to="/photos" replace />} />
        </Routes>
    </Router>;
}

export default App;
