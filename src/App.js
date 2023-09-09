import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Privacy from "./pages/Privacy/Privacy";
import ScrollToTop from "./atoms/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SkeletonTheme } from 'react-loading-skeleton';

function App() {
  let token = localStorage.getItem("token");

  return (
    <>
      <ToastContainer />
      <SkeletonTheme baseColor="#D8D8D8" highlightColor="#c9c9c9">
      <BrowserRouter>
      <ScrollToTop/>
        {token ? (
          <>
            <Dashboard />
          </>
        ) : (
          <Routes>
            <Route path="*" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        )}
      </BrowserRouter>
      </SkeletonTheme>
    </>
  );
}

export default App;
