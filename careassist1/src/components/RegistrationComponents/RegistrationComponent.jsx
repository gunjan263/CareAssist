import React, { useState } from "react";
import UserService from "../../Services/UserService";
import "./RegistrationComponent.css";
import { useNavigate } from "react-router-dom";

export function RegistrationComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setError("");
    // Password validation
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(password)
    ) {
      setPasswordError(
        "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email format.");
      return;
    }
    try {
      const userData = {
        username,
        password,
        email,
        role,
      };
      const response = await UserService.registerUser(userData);
      navigate("/");
      console.log("Response: ", response);
    } catch (error) {
      setError("Registration failed");
    }
  };

  return (
    <section className="vh-200" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-12">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-12">
                <div className="row justify-content-center align-items-center">
                  <div className="col-md-12">
                    <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>
                    <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                      <div className="mb-4">
                        <i className="fas fa-user fa-lg me-3"></i>
                        <input
                          type="text"
                          id="form3Example1c"
                          className="form-control"
                          placeholder="Your Name"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      {emailError && (
                        <p className="text-danger">{emailError}</p>
                      )}
                      <div className="mb-4">
                        <i className="fas fa-envelope fa-lg me-3"></i>
                        <input
                          type="email"
                          id="form3Example3c"
                          className="form-control"
                          placeholder="Your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      {passwordError && (
                        <p className="text-danger">{passwordError}</p>
                      )}
                      <div className="mb-4">
                        <i className="fas fa-lock fa-lg me-3"></i>
                        <input
                          type="password"
                          id="form3Example4c"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <i className="fas fa-user fa-lg me-3"></i>
                        <select
                          id="role"
                          className="form-select"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value="">Select Role</option>
                          {/* <option value="ADMIN">Admin</option> */}
                          <option value="PATIENT">Patient</option>
                          {/* <option value="INSURANCE_COMPANY">
                            Insurance Company
                          </option>
                          <option value="HEALTHCARE_PROVIDER">
                            Healthcare Provider
                          </option> */}
                        </select>
                      </div>
                      <div className="form-check mb-4">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3c"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3"
                        >
                          I agree all statements in{" "}
                          <a href="#!">Terms of service</a>
                        </label>
                      </div>
                      <div className="d-grid gap-2">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ color: "black" }}
                        >
                          Register{" "}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
