import { useState, useEffect, useRef } from "react";
import styles from "../ui.module.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiOutlineDown } from "react-icons/ai";
import client from "../sanityClient";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [topItems, setTopItems] = useState([]);
  const dropdownRef = useRef(null);

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

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setIsSubMenuOpen(false);
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={styles.dropdown}
      aria-label="Main Navigation"
      ref={dropdownRef}
    >
      <button
        onClick={toggleDropdown}
        className={styles.hamburgerButton}
        aria-expanded={isOpen}
        aria-controls="dropdown-menu"
        aria-label="Toggle Menu"
      >
        <div className={`${styles.icon} ${isOpen ? "rotate-180" : ""}`}>
          {isOpen ? (
            <AiOutlineClose size={30} />
          ) : (
            <GiHamburgerMenu size={30} />
          )}
        </div>
      </button>
      <ul
        id="dropdown-menu"
        className={`${styles.dropdownMenu} ${isOpen ? styles.show : ""}`}
        role="menu"
      >
        <li onClick={closeMenu}>
          <Link to="/" role="menuitem">
            Home
          </Link>
        </li>
        <li onClick={closeMenu}>
          <Link to="/about-us" role="menuitem">
            About Us
          </Link>
        </li>
        <li onClick={closeMenu}>
          <Link to="/contact-us" role="menuitem">
            Contact Us
          </Link>
        </li>
        <li>
          <button
            className={styles.featuredButton}
            onClick={toggleSubMenu}
            aria-expanded={isSubMenuOpen}
            aria-controls="sub-menu"
            role="menuitem"
          >
            Featured Products
            <AiOutlineDown
              className={`${styles.arrowIcon} ${
                isSubMenuOpen ? styles.arrowIconOpen : ""
              }`}
            />
          </button>
          <ul
            id="sub-menu"
            className={`${styles.subMenu} ${
              isSubMenuOpen ? styles.subMenuOpen : ""
            }`}
            role="menu"
          >
            {topItems.map((item) => (
              <li key={item._id}>
                <Link
                  to={`/topitem/${item._id}`}
                  onClick={closeMenu}
                  role="menuitem"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
}
