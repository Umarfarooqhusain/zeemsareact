import { useState } from "react";
import styles from "../ui.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.dropdown} aria-label="Main Navigation">
      <button
        onClick={toggleDropdown}
        className={styles.hamburgerButton}
        aria-expanded={isOpen}
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
        className={`${styles.dropdownMenu} ${isOpen ? styles.show : ""}`}
        style={{ fontFamily: "Dancing Script" }}
      >
        <li onClick={closeMenu}>
          <a href="/">Home</a>
        </li>
        <li onClick={closeMenu}>
          <a href="/about-Us">About</a>
        </li>
        <li onClick={closeMenu}>
          <a href="/why-Us">Why Us</a>
        </li>
        <li onClick={closeMenu}>
          <a href="/contact-Us">Contact Us</a>
        </li>
      </ul>
    </nav>
  );
}
