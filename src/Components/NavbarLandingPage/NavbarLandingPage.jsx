import React from "react";
import "./NavbarLandingPage.css";
import { useNavigate } from "react-router-dom";

const NavbarLandingPage = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo-circle">P</div>
        <span className="logo-text">Petik Niaga</span>
      </div>

      <ul className="navbar-menu">
        <li onClick={() => navigate("/")}>Beranda</li>
        <li onClick={() => navigate("/produk")}>Produk</li>
        <li onClick={() => navigate("/tentang")}>Tentang</li>
        <li onClick={() => navigate("/kontak")}>Kontak</li>
      </ul>

      <div className="navbar-right">
        <div className="search-box">
          <input type="text" placeholder="Cari produk..." />
          <span className="search-icon">🔍</span>
        </div>
        <span className="cart-icon">🛒</span>
        <button className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default NavbarLandingPage;
