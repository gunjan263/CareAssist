import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./components/AboutComponents/About";
import Work from "./components/WorkComponents/Work";
import Testimonial from "./components/TestimonialComponents/Testimonial";
import Contact from "./components/ContactComponents/Contact";
import AuthProvider from "./context/AuthProvider";
import Navbar from "./components/NavbarComponents/Navbar";
import Footer from "./components/FooterComponents/Footer";
import { RegistrationComponent } from "./components/RegistrationComponents/RegistrationComponent";
import { LoginComponent } from "./components/LoginComponents/LoginComponent";
import Home from "./components/HomeComponents/Home";
import { RequireAuth } from "./hook/useAuth";
import AdminDashboard from "./components/Dashboards/AdminDashboard";
import PatientDashboard from "./components/Dashboards/PatientDashboard";
import HealthcareProviderDashboard from "./components/Dashboards/HealthcareDashboard";
import InsuranceCompanyDashboard from "./components/Dashboards/InsuranceCompanyDashboard";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <About />
                <Work />
                <Testimonial />
                <Contact />
                <Footer />
              </>
            }
          />

          <Route
            exact
            path="/about"
            element={
              <>
                <Navbar />

                <About />

                <Footer />
              </>
            }
          />
          <Route
            path="/work"
            element={
              <>
                <Navbar />

                <Work />

                <Footer />
              </>
            }
          />
          <Route
            path="/testimonial"
            element={
              <>
                <Navbar />

                <Testimonial />

                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar />

                <Contact />
                <Footer />
              </>
            }
          />

          <Route
            path="/register"
            element={
              <>
                <Navbar />
                <RegistrationComponent />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <LoginComponent />
                <Footer />
              </>
            }
          />

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/patientdashboard" element={<PatientDashboard />} />
            <Route
              path="/healthcaredashboard"
              element={<HealthcareProviderDashboard />}
            />
            <Route
              path="/insurancedashboard"
              element={<InsuranceCompanyDashboard />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
