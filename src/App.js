import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group"; // Import for smooth transitions
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import WhyUs from "./pages/WhyUs";
import ContactUs from "./pages/ContactUs";
import CategoryPage from "./pages/CategoryPage";
import FeaturedItemsPage from "./pages/FeaturedItemsPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <TransitionGroup>
            <CSSTransition
              timeout={500} // Duration of the transition
              classNames="page" // Class names for the transition effect
              key={window.location.pathname} // Unique key for each route to trigger transitions
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/why-us" element={<WhyUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/category/:id" element={<CategoryPage />} />
                <Route path="/topitem/:id" element={<FeaturedItemsPage />} />
              </Routes>
            </CSSTransition>
          </TransitionGroup>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
