import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-base md:text-lg font-bold text-gradient">RESUMIND</p>
      </Link>
      <Link to="/upload" className="primary-button w-fit">
        Upload CV
      </Link>
    </nav>
  );
};

export default Navbar;
