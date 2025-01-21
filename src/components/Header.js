import React from "react";
import { Link } from "react-router-dom";
import styles from "../ui.module.css";
import Dropdown from "../ui/DropdownMenu";

const Header = () => {
  return (
    <header className=" md:absolute z-20 md:flex md:items-center md:justify-evenly pt-8 md:ml-8 md:bg-transparent">
      <div className="flex justify-center font-semibold">
        <Link to="/" aria-label="Zeemsa Overseas Home">
          <span
            style={{ fontFamily: "Pacifico" }}
            className="text-4xl font-thin text-gray-800 hover:text-gray-600 transition-all duration-300 md:mr-40"
          >
            Zeemsa Overseas.
          </span>
        </Link>
      </div>
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
        <Link className={styles.nav} to="/why-Us" aria-label="Why Choose Us?">
          Why Us
        </Link>
        <Link
          className={styles.nav}
          to="/contact-Us"
          aria-label="Get in touch with us"
        >
          Contact Us
        </Link>
      </div>
      <div className="md:hidden">
        <Dropdown />
      </div>
    </header>
  );
};

export default Header;
