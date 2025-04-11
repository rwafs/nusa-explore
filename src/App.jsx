import { Routes, Route } from "react-router-dom";
import HeroSection from "./sections/Hero";
import Featured from "./sections/Featured";
import Step from "./sections/Step";
import Testimoni from "./sections/Testimoni";
import Footer from "./sections/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route
        path="/"
        element={
          <>
            <HeroSection />
            <Featured />
            <Step />
            <Testimoni />
            <Footer />
          </>
        }
      />

      {/* Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
