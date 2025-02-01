import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../ui.module.css";
import Dropdown from "../ui/DropdownMenu";
import { AiOutlineDown } from "react-icons/ai";
import client from "../sanityClient";

const Header = () => {
  const [isFeaturedOpen, setIsFeaturedOpen] = useState(false);
  const [topItems, setTopItems] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "topitem"]{
          _id,
          name
        }`
      )
      .then((data) => setTopItems(data))
      .catch(console.error);
  }, []);

  const toggleFeaturedMenu = () => {
    setIsFeaturedOpen((prev) => !prev);
  };

  return (
    <header className="md:absolute z-20 md:flex md:items-center md:justify-evenly pt-8 md:ml-8 md:bg-transparent">
      {/* Logo */}
      <div className="flex justify-center font-semibold">
        <Link to="/" aria-label="Zeemsa Overseas Home">
          <span
            style={{ fontFamily: "Playfair Display" }}
            className="text-4xl font-extralight text-gray-800 hover:text-gray-600 transition-all duration-300 md:mr-40"
          >
            Zeemsa OverSeas.
          </span>
        </Link>
      </div>

      {/* Navigation for desktop */}
      <div
        style={{ fontFamily: "Pacifico" }}
        className="hidden md:flex md:justify-evenly md:text-center w-full"
      >
        <Link className={styles.nav} to="/" aria-label="Navigate to Home">
          Home
        </Link>
        <Link
          className={styles.nav}
          to="/about-us"
          aria-label="Learn more About Us"
        >
          About Us
        </Link>

        {/* Featured Products Dropdown */}
        <div className={`relative ${styles.nav}`}>
          <button
            onClick={toggleFeaturedMenu}
            className="text-gray-800 hover:text-gray-600 mx-4 flex items-center transition-all duration-300"
            aria-expanded={isFeaturedOpen}
            aria-label="Toggle Featured Products Menu"
          >
            Products
            <AiOutlineDown
              className={`ml-2 transform ${
                isFeaturedOpen ? "rotate-180" : ""
              } transition-transform duration-300`}
            />
          </button>

          {/* Dropdown Menu */}
          {isFeaturedOpen && (
            <ul
              className="absolute left-0 mt-2 bg-white shadow-md rounded-md p-2 w-48 max-h-48 overflow-y-auto"
              style={{ scrollbarWidth: "thin" }}
            >
              {topItems.length > 0 ? (
                topItems.map((item) => (
                  <li key={item._id}>
                    <Link
                      to={`/topitem/${item._id}`}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsFeaturedOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="block px-4 py-2 text-gray-500">
                  No items available
                </li>
              )}
            </ul>
          )}
        </div>

        {/* Contact Us */}
        <Link
          className={styles.nav}
          to="/contact-us"
          aria-label="Get in touch with us"
        >
          Contact Us
        </Link>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Dropdown />
      </div>
    </header>
  );
};

export default Header;
