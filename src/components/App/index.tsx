import { Routes, Route, useLocation } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import PhotoModal from "../postModal";
import SignUpForm from "../signUpForm";
import SignInForm from "../SignInForm";

const App = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/post/:id" element={<PhotoModal />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
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
