import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import SignupForm from "./Signup/Signup";
import Signin from "./Login/Login";
import ForgotPassword from "./forgotpassword/forgotpassword";
import ContactUs from "./pages/ContactUs";
import Blog from "./pages/Blog";
import DestinationDetails from "./components/Destination/DestinationDetais";
import AboutUs from "./pages/AboutUs";
import { useEffect, useState } from "react";

const AppContent = () => {
  const location = useLocation();
  const [isAuthPage, setIsAuthPage] = useState(false);

  useEffect(() => {
    const authPaths = ["/signin", "/signupform", "/resetpassword"];
    const currentPath = location.pathname.toLowerCase();
    setIsAuthPage(authPaths.includes(currentPath));
  }, [location]);

  return (
    <div className={isAuthPage ? "auth-background" : ""}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/SignupForm" element={<SignupForm />} />
        <Route path='/contact-us' element={ <ContactUs /> } />
        <Route path='/blog' element={ <Blog /> } />
        <Route path="/destination-details/:id" element={<DestinationDetails />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/resetpassword" element={<ForgotPassword />} />
        
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
