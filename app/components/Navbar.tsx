import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
        >
          <span className="text-white font-bold text-xs">CV</span>
        </div>
        <span className="text-sm md:text-base font-bold text-gradient">
          CVLens
        </span>
      </Link>
      <Link to="/upload" className="primary-button w-fit text-xs sm:text-sm">
        Upload CV
      </Link>
    </nav>
  );
};

export default Navbar;
