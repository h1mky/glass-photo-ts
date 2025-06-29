import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";

const MainPage = lazy(() => import("../../pages/MainPage"));
const PhotoModal = lazy(() => import("../postModal"));
const SignUpForm = lazy(() => import("../../pages/signUpForm"));
const SignInForm = lazy(() => import("../../pages/SignInForm"));

import { ClipLoader } from "react-spinners";

const App = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <Suspense
      fallback={
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ClipLoader color="#f0f0f0f0" size={40} />
        </div>
      }
    >
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
    </Suspense>
  );
};

export default App;
// filepath:
