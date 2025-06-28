import { Routes, Route, useLocation } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import PhotoModal from "../postModal";

const App = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/post/:id" element={<PhotoModal />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/post/:id" element={<PhotoModal />} />
        </Routes>
      )}
    </>
  );
};

export default App;
