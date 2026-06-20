import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) {

      return;

    }

    localStorage.removeItem("user");

    toast.success(
      "Logged out successfully 👋"
    );

    setTimeout(() => {

      window.location.reload();

    }, 1000);

  };

  return (

    <nav className="navbar">

      <h2 className="logo">

        Labour Connect

      </h2>

      <div className="nav-links">

        <button
          className="nav-btn"
          onClick={() => navigate("/")}
        >

          Dashboard

        </button>

        <button
          className="nav-btn"
          onClick={() => navigate("/profile")}
        >

          Profile

        </button>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >

          Logout

        </button>

      </div>

    </nav>

  );

}

export default Navbar;