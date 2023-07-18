// import './App.css';

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Privacy from "./pages/Privacy/Privacy";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import 'dotenv/config'

function App() {
  let token = localStorage.getItem("token");

  // const count = useSelector((state) => state.counter.value)
  // const dispatch = useDispatch()
  // console.log("env", process.env)
  // const BaseURL = process.env.REACT_APP_BASE_URL;
  // const getHospitalData = process.env.REACT_APP_GET_HOSPITAL_DATA;
  // const { data, isLoading, error } = useFetch(`${BaseURL}/${getHospitalData}`);

  // console.log("data", data)
  // console.log("isLoading", isLoading)
  // console.log("error", error)

  return (
    <>
      <ToastContainer />

      {/* <button
        aria-label="Increment value"
        onClick={() => dispatch(increment(data))}
      >
        Increment
      </button>
      <span>{console.log('count', count)}</span> */}

      {/* <Privacy /> */}
      <BrowserRouter>
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
