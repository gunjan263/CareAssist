import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import UserService from "../../Services/UserService";
import "./LoginComponent.css";
import { useNavigate } from "react-router-dom";

export function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await UserService.userLogin({ username, password });
      console.log("Login Response:", response);

      if (response.data.token) {
        const accessToken = response.data.token;
        const userRole = response.data.role;
        const userId = response.data.userId;

        setAuth({ userId, user: username, accessToken }); // Set user details in context
        setError("");
        setUsername("");
        setPassword("");
        alert("Login SuccessFul");

        if (userRole === "ADMIN") {
          navigate("/admindashboard");
        } else if (userRole === "HEALTHCARE_PROVIDER") {
          navigate("/healthcaredashboard");
        } else if (userRole === "INSURANCE_COMPANY") {
          navigate("/insurancedashboard");
        } else if (userRole === "PATIENT") {
          navigate("/patientdashboard", { state: { userId } });
        } else {
          navigate("/");
        }
      } else {
        setError("Invalid credentials");
        alert("Invalid Credentials");
        window.alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Failed to log in. Please try again later.");
      window.alert("Failed to log in. Please try again.");
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
                    <p className="text-center h1 fw-bold mb-2 mx-1 mx-md-4 mt-4">
                      Sign In
                    </p>
                    <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                      <div className="mb-4">
                        <i className="fas fa-user fa-lg me-3"></i>
                        <input
                          type="text"
                          id="form3Example1c"
                          className="form-control"
                          placeholder="Your username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <i className="fas fa-lock fa-lg me-2"></i>
                        <input
                          type="password"
                          id="form3Example4c"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <div className="d-grid gap-3 mb-3">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ color: "black" }}
                        >
                          Login{" "}
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
