import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>Petik Niaga</h2>
          <p>Belanja mudah, harga terbaik.</p>
        </div>

        <div className="footer-links">
          <h4>Menu</h4>
          <ul>
            <li><a href="/">Beranda</a></li>
            <li><a href="/produk">Produk</a></li>
            <li><a href="/kategori">Kategori</a></li>
            <li><a href="/kontak">Kontak</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Kontak</h4>
          <p>Email: support@petikniaga.com</p>
          <p>Telp: +62 812 3456 7890</p>
        </div>

        <div className="footer-social">
          <h4>Ikuti Kami</h4>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Petik Niaga. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
