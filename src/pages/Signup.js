import React, { useEffect, useRef, useState } from "react";
import { useNavigate,  Link } from "react-router-dom";
import "../assets/css/Signin.scss";
// import maweidi_logo from '../assets/images/common/maweidi_logo.svg'

// Image
import maweidi_logo from "../assets/images/common/maweidi_logo.svg";
import CustomCheckbox from "../components/common/CustomCheckbox";

const Signup = () => {
  let navigate = useNavigate();

  const firstNameReference = useRef(null);
  const lastNameReference = useRef(null);
  const emailReference = useRef(null);
  const passwordReference = useRef(null);

  const [empty, setEmpty] = useState(0);
  const [firstName, setFirstName] = useState(0);
  const [lastName, setLastName] = useState(0);
  const [email, setEmail] = useState(0);
  const [emailError, setEmailError] = useState(0);
  const [password, setPassword] = useState(0);
  const [passwordError, setPasswordError] = useState(0);
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  useEffect(() => {
    if (!empty.email) {
      // setEmail(1)
    } else {
      setEmail(0);
    }

    if (empty.email) {
      if (!empty.email.match(/[@]/)) {
        setEmailError(1);
      } else {
        setEmailError(0);
      }
      // setEmailError(1)
    } else {
      setEmailError(0);
    }

    if (empty.password) {
      if (
        !empty.password.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+|\\=\-{}\[\]:";'<>?,./])[A-Za-z\d!@#$%^&*()_+|\\=\-{}\[\]:";'<>?,./]{8,}$/
        )
      ) {
        setPasswordError(1);
      } else {
        setPasswordError(0);
      }
      // setEmailError(1)
    } else {
      setPasswordError(0);
    }

    if (!empty.password) {
      // setPassword(1)
    } else {
      setPassword(0);
    }

    if (!empty.firstname) {
      // setPassword(1)
    } else {
      setFirstName(0);
    }

    if (!empty.lastname) {
      // setPassword(1)
    } else {
      setLastName(0);
    }
  });

  const handleInput = (event) => {
    setEmpty((empty) => ({
      ...empty,
      [event.target.name]: event.target.value,
    }));

    // const { name, value } = event.target;
    // setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!empty.firstname) {
      // alert("please enter email")
      setFirstName(1);
      firstNameReference.current.focus();
    } else if (!empty.lastname) {
      // alert("please enter password")
      setLastName(1);
      lastNameReference.current.focus();
    } else if (!empty.email) {
      // alert("please enter email")
      setEmail(1);
      emailReference.current.focus();
    } else if (!empty.email.match(/[@]/)) {
      // alert("please enter email")
      setEmailError(1);
      emailReference.current.focus();
    } else if (!empty.password) {
      // alert("please enter password")
      // setEmailError(0)
      setPassword(1);
      passwordReference.current.focus();
    } else if (
      !empty.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+|\\=\-{}\[\]:";'<>?,./])[A-Za-z\d!@#$%^&*()_+|\\=\-{}\[\]:";'<>?,./]{8,}$/
      )
    ) {
      // alert("please enter password")
      // setEmailError(0)
      setPasswordError(1);
      passwordReference.current.focus();
    } else {
      setEmail("");
      setEmailError(0);
      setPassword(0);
      setFirstName(0);
      setLastName(0);

      navigate("/signin");
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
                style={{ height: "100%" }}
                className="col-10 col-lg-6  px-lg-5 maweidi-logo d-flex justify-content-center flex-column"
              >
                <img className="mb-3" src={maweidi_logo} alt="" />

                <div style={{ height: "100%" }} className="  ">
                  <div
                    style={{ height: "100%" }}
                    className="row  mx-lg-5 px-lg-4 pt-3 pb-2 siginup-inner"
                  >
                    <div className="col-12 d-flex justify-content-center signup-text1">
                      <p className="mb-1">ADMIN</p>
                    </div>

                    <div className="col-12 mb-4 d-flex justify-content-center signup-text2">
                      <p className="mb-0">Sign Up</p>
                    </div>

                    <div className="col-12 mt-3 signup-input-label-input-top">
                      <div className="row ">
                        <div className="col-6 signup-input-label signup-input-label-input">
                          <p className="mb-2 ">
                            First Name
                            <span className="signup-staric-color">*</span>
                          </p>
                          <input
                            type="text"
                            onChange={handleInput}
                            name="firstname"
                            value={empty.firstname}
                            ref={firstNameReference}
                          />
                          {firstName ? (
                            <p className="mb-0 ">
                              <span className="error_message">
                                First name is a required field
                              </span>
                            </p>
                          ) : (
                            ""
                          )}
                        </div>

                        <div className="col-6 signup-input-label signup-input-label-input">
                          <p className="mb-2 ">
                            Last Name
                            <span className="signup-staric-color">*</span>
                          </p>
                          <input
                            type="text"
                            onChange={handleInput}
                            name="lastname"
                            value={empty.lastname}
                            ref={lastNameReference}
                          />
                          {lastName ? (
                            <p className="mb-0 ">
                              <span className="error_message">
                                Last Name is a required field
                              </span>
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-12 mt-4 signup-input-label">
                      <p className="mb-2 ">
                        Your Email<span className="signup-staric-color">*</span>
                      </p>
                      <input
                        className=""
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

                      {emailError ? (
                        <p className="mb-0 ">
                          <span className="error_message">Invalid email</span>
                        </p>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-12 mt-4 mb-3 signup-input-label">
                      <p className="mb-2 ">
                        Password<span className="signup-staric-color">*</span>
                      </p>
                      <div className="d-flex border " style={{height:'36px', borderRadius:'5px'}}>
                      <input
                      style={{border:'none', backgroundColor:'transparent', paddingBottom:'5px'}}
                        type={passwordType}
                        onChange={handleInput}
                        name="password"
                        value={empty.password}
                        ref={passwordReference}
                      />
                      <div className=" loginPasswordPositionBottom input-group-btn " >
                        <h1 className="eyeBtn btn " onMouseUp={togglePassword} onMouseDown={togglePassword} onTouchStart={togglePassword} ontouchend={togglePassword} >
                          <p style={{ width: "10px", height: "5px", color: "Black", border: "none" }}>{passwordType === "password" ? <i class="fa fa-eye-slash" aria-hidden="true"></i> : <i class="fa fa-eye" aria-hidden="true"></i>}</p>
                        </h1>
                      </div>
                      </div>

                      {password ? (
                        <p
                          className="mb-0 "
                          
                        >
                            <span className="error_message">
                          Password is a required field</span>
                        </p>
                      ) : (
                        ""
                      )}

                      {
                        passwordError ? (
                          <p
                            className="mb-0 "
                           
                          >  <span className="error_message">
                            Week password</span>
                          </p>
                        ) : (
                          ""
                        )
                        // passwordError ? <p className='mb-0 ' style={{ fontSize: "0.78vw", color: "red"}}>Week password (at least one lowercase letter, one uppercase letter, one digit, one special character, and lenth is greater than 8)</p> : ''
                      }
                    </div>

                    <div className="col-12 mt-4 signup-input-label-accept  signup-input-label">
                      <div className="d-flex asdf">
                        <label className="checkbox-container">
                          {/* <input
                            type="checkbox"
                            style={{ border: "1px solid red", height:"13px" }}
                          /> */}
                          {/* <span className="checkmark"></span> */}
                          {/* Label text */}
                          <CustomCheckbox />
                        </label>

                        <span className="PleaseAcceptCheckbox ml-1  ">
                          {" "}
                          I Accept{" "}
                          <span className="termsAndConditionsCheckbox">
                            {" "}
                            Terms And Condition{" "}
                          </span>{" "}
                        </span>
                      </div>
                    </div>

                    <div className="col-12 mt-2 resgister-button">
                      <button onClick={handleSubmit}>Register</button>
                    </div>

                    <div className="col-12 mt-4 mb-4 signup-lower-text">
                      <p className="mb-0">
                        Already have an account?{" "}
                        <span>
                          <Link className="maweidi-link sign-text" to="/signin">
                            {" "}
                            Sign In{" "}
                          </Link>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-1 col-lg-3  "></div>
            </div>

            {/* <img className='sign-page-background-logo' src={maweidi_logo} alt="" /> */}

            {/* <SignupCom/> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
