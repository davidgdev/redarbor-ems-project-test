import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <nav className="relative flex flex-wrap items-center justify-between py-12  mb-18">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            to="/"
            className="flex fle-rowtext-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
          >
            <img src={logo} alt="logo" className="w-4 mr-2" /> Employee
            Management
          </Link>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item">
              <a
                href="https://github.com/davidgdev/redarbor-ems-project-test"
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                <span className="ml-2">About</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="https://github.com/davidgdev/redarbor-ems-project-test/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              >
                <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
                <span className="ml-2">App Info</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="https://github.com/davidgdev/redarbor-ems-project-test/blob/main/README.md"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              >
                <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i>
                <span className="ml-2">Contact</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
