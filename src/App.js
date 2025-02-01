import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import CategoryPage from "./pages/CategoryPage";
import FeaturedItemsPage from "./pages/FeaturedItemsPage";
import { Helmet } from "react-helmet"; // Import React Helmet
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <TransitionGroup>
            <CSSTransition
              timeout={500}
              classNames="page"
              key={window.location.pathname}
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Helmet>
                        <title>Home - Zeemsa OverSeas</title>
                        <meta
                          name="description"
                          content="Zeemsa OverSeas specializes in high-quality handcrafted furniture, decor, and custom designs. We deliver worldwide with a focus on excellence."
                        />
                      </Helmet>
                      <Home />
                    </>
                  }
                />
                <Route
                  path="/about-us"
                  element={
                    <>
                      <Helmet>
                        <title>About Us - Zeemsa OverSeas</title>
                        <meta
                          name="description"
                          content="Zeemsa OverSeas specializes in high-quality handcrafted furniture, decor, and custom designs. We deliver worldwide with a focus on excellence."
                        />
                      </Helmet>
                      <AboutUs />
                    </>
                  }
                />
                <Route
                  path="/contact-us"
                  element={
                    <>
                      <Helmet>
                        <title>Contact Us - Zeemsa OverSeas</title>
                        <meta
                          name="description"
                          content="Zeemsa OverSeas specializes in high-quality handcrafted furniture, decor, and custom designs. We deliver worldwide with a focus on excellence."
                        />
                      </Helmet>
                      <ContactUs />
                    </>
                  }
                />
                <Route
                  path="/category/:id"
                  element={
                    <>
                      <Helmet>
                        <title>Category - Zeemsa OverSeas</title>
                        <meta
                          name="description"
                          content="Zeemsa OverSeas specializes in high-quality handcrafted furniture, decor, and custom designs. We deliver worldwide with a focus on excellence."
                        />
                      </Helmet>
                      <CategoryPage />
                    </>
                  }
                />
                <Route
                  path="/topitem/:id"
                  element={
                    <>
                      <Helmet>
                        <title>Featured Item - Zeemsa OverSeas</title>
                        <meta
                          name="description"
                          content="Zeemsa OverSeas specializes in high-quality handcrafted furniture, decor, and custom designs. We deliver worldwide with a focus on excellence."
                        />
                      </Helmet>
                      <FeaturedItemsPage />
                    </>
                  }
                />
                <Route
                  path="/featured-products"
                  element={
                    <>
                      <Helmet>
                        <title>Featured Products - Zeemsa OverSeas</title>
                        <meta
                          name="description"
                          content="Zeemsa OverSeas specializes in high-quality handcrafted furniture, decor, and custom designs. We deliver worldwide with a focus on excellence."
                        />
                      </Helmet>
                      <FeaturedItemsPage />
                    </>
                  }
                />
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
