import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Privacy from "./pages/Privacy/Privacy";
import ScrollToTop from "./atoms/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  let token = localStorage.getItem("token");

  return (
    <>
      <ToastContainer />
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
    </>
  );
}

export default App;
