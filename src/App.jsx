import "./App.css";

import "react-datepicker/dist/react-datepicker.css";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";

import { ToastContainer } from "react-toastify";
import UnderConstruction from "./common/under-construction";
// import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import { ROUTESCONSTANTS } from "./constants/Routes";
import ForgotPassword from "./pages/auth/forgot-password";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import HomePage from "./pages/home";
import Profile from "./pages/profile";
// import Tracking from "./pages/tracking/g-map";
import PDFGenerate from "./pages/pdf";
import Reports from "./pages/reports";
import MapTracking from "./pages/tracking";
import TestComp from "./test-comp";

const App = () => {
  return (
    <div>
      <ToastContainer autoClose={3500} />
      {/* <Navbar /> */}
      <Routes>
        <Route path="/home" element={<HomePage />} />
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path={ROUTESCONSTANTS.login} element={<Login />} />
        <Route path={ROUTESCONSTANTS.register} element={<Register />} />
        <Route path="/test" element={<TestComp />} />
        <Route
          path={ROUTESCONSTANTS.forgetPassword}
          element={<ForgotPassword />}
        />

        {/* <Route path={ROUTESCONSTANTS.tracking} element={<Tracking />} /> */}
        <Route path={ROUTESCONSTANTS.tracking} element={<MapTracking />} />
        <Route path={ROUTESCONSTANTS.reports} element={<Reports />} />
        <Route
          path={ROUTESCONSTANTS.operation}
          element={<UnderConstruction />}
        />
        <Route path={ROUTESCONSTANTS.admin} element={<UnderConstruction />} />
        <Route path={ROUTESCONSTANTS.profile} element={<Profile />} />
        <Route
          path={ROUTESCONSTANTS.accounting}
          element={<UnderConstruction />}
        />
        <Route
          path={ROUTESCONSTANTS.serviceCharge}
          element={<UnderConstruction />}
        />
        <Route path="/pdf" element={<PDFGenerate />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
