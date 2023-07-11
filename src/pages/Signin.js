import React, { useEffect, useRef, useState } from "react";
import { Checkbox } from "antd";
import maweidi_logo from "../assets/images/common/maweidi_logo.svg";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/Signin.scss";
import CustomCheckbox from "../components/common/CustomCheckbox";

const Signin = () => {
  let navigate = useNavigate();
  const emailReference = useRef(null);
  const passwordReference = useRef(null);

  const [empty, setEmpty] = useState(0);
  const [email, setEmail] = useState(0);
  const [password, setPassword] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const handleOptionChange = (event) => {
    setSelectedOption();
    localStorage.setItem("userRole", JSON.stringify(event.target.value));
  };

  useEffect(() => {
    if (!empty.email) {
      // setEmail(1)
    } else {
      setEmail(0);
    }

    if (!empty.password) {
      // setPassword(1)
    } else {
      setPassword(0);
    }
  });

  const handleInput = (event) => {
    setEmpty((empty) => ({
      ...empty,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!empty.email) {
      // alert("please enter email")
      setEmail(1);
      emailReference.current.focus();
    } else if (!empty.password) {
      // alert("please enter password")
      setPassword(1);
      passwordReference.current.focus();
    } else {
      setEmail(0);
      setPassword(0);

      // navigate("/dashboard");
      navigate("/");

      localStorage.setItem("token", "save");




      // Note:
      //Please not use only these keys to setup roles
      // HospitalAdmin
      // LaboratoryAdmin
      // PharmacyAdmin
      // Doctor
      // superAdmin


      // window.location.reload()
      // window.location.href = "/dashboard";
      window.location.href = "/";
    }
  };

  return (
    <>
      <div className="fluid-container ">
        <div className="sign-page">
          <div className="sign-page-background d-flex align-items-center">
            <div className="row m-0 sign-page-background-row ">
              <div className="col-1 col-lg-3  "></div>

              <div
                style={{ height: "100%", width: "531px" }}
                className="col-10 col-lg-6 px-lg-5 maweidi-logo d-flex justify-content-center flex-column"
              >
                <img className="mb-3" src={maweidi_logo} alt="" />

                <div style={{ height: "100%" }} className="">
                  <div
                    style={{ height: "100%" }}
                    className="row  mx-lg-5 px-lg-4 pt-3 pb-2 siginup-inner"
                  >
                    <div className="col-12 d-flex justify-content-center signup-text1">
                      <p className="mb-1">ADMIN</p>
                    </div>

                    <div className="col-12 mb-3 d-flex justify-content-center signup-text2">
                      <p className="mb-0">Sign In</p>
                    </div>

                    <div className="col-12 mt-2 signup-input-label">
                      <p className="mb-2 ">
                        Your Email<span className="signup-staric-color">*</span>
                      </p>
                      <input
                        type="text"
                        onChange={handleInput}
                        name="email"
                        value={empty.email}
                        ref={emailReference}
                      />
                      {email ? (
                        <p className="mb-0 ">
                          <span className="error_message">
                            Email is a required field
                          </span>
                        </p>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-12 mt-4 mb-1 signup-input-label">
                      <p className="mb-2 ">
                        Password<span className="signup-staric-color">*</span>
                      </p>
                      <input
                        type="password"
                        onChange={handleInput}
                        name="password"
                        value={empty.password}
                        ref={passwordReference}
                      />

                      {password ? (
                        <p className="mb-0 ">
                          {" "}
                          <span className="error_message">
                            Password is a required field
                          </span>
                        </p>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-12 mt-2 mb-1 signup-input-label-accept  signup-input-label">
                      <div className="row">
                        <div className="col-6">
                          <div className="d-flex">
                            {/* <label className="checkbox-container">
                              <input type="checkbox" style={{height:"13px"}}/> */}
                            {/* <span className="checkmark"></span> */}
                            {/* Label text */}
                            {/* </label> */}

                            <CustomCheckbox />
                            <span
                              className="PleaseAcceptCheckboxSignin ml-1  "
                              style={{ paddingTop: "0%" }}
                            >
                              {" "}
                              Remember me
                            </span>
                          </div>
                        </div>

                        <div className="col-6 d-flex justify-content-end">
                          <span className="PleaseAcceptCheckboxSignin ml-1  ">
                            {" "}
                            <Link
                              className="PleaseAcceptCheckboxSignin"
                              to="/forgotpassword"
                            >
                              {" "}
                              Forgot Password?{" "}
                            </Link>{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                    <select value={selectedOption} onChange={handleOptionChange}>
                      <option value="">Select an option</option>
                      <option value="superAdmin">superAdmin</option>
                      <option value="HospitalAdmin">HospitalAdmin</option>
                      <option value="LaboratoryAdmin">LaboratoryAdmin</option>
                      <option value="PharmacyAdmin">PharmacyAdmin</option>
                      
                      <option value="Doctor">Doctor</option>
                    </select>

                    <div className="col-12 mt-4 resgister-button">
                      <button onClick={handleSubmit}>Sign in</button>
                    </div>

                    <div className="col-12 mt-4 mb-4 signup-lower-text">
                      <p className="mb-0">
                        Don’t have an account?{" "}
                        <span>
                          {" "}
                          <Link
                            className="maweidi-link sign-text "
                            to="/signup"
                          >
                            {" "}
                            Sign Up{" "}
                          </Link>{" "}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
