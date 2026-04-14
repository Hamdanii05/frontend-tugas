import React, { useState, useEffect } from "react";
import NavbarLandingPage from "../../Components/NavbarLandingPage/NavbarLandingPage";
import "./CTA.css";
import axiosInstance from "../../Utils/axiosInstance";
import keranjang from "../../assets/keranjang.jpeg";
import Footer from "../../Components/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate()
  const [kategori, setKategori] = useState([]);
  const [selectedKategori, setSelectedKategori] = useState("Semua");
  const [produk, setProduk] = useState([]);
  const [jenisProduk, setJenisProduk] = useState([]);

  useEffect(() => {
    getJenisProduk();
  })

  useEffect(() => {
    const getKategori = async () => {
      try {
        const res = await axiosInstance.get("https://apiniaga.psjpetik.my.id/api/v1/jenis-produk");
        setKategori(res.data.data); 
      } catch (error) {
        console.log(error.response);
      }
    };
    getKategori();
  }, []);

  useEffect(() => {
    const getProduk = async () => {
      try {
        const res = await axiosInstance.get("https://apiniaga.psjpetik.my.id/api/v1/produk");
        setProduk(res.data.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    getProduk();
  }, []);

  const getJenisProduk = async () => {
        try {
            const result = await axiosInstance.get(
            `${import.meta.env.VITE_API_URL}/jenis-produk`
            );
            setJenisProduk(result.data.data);
        }   catch (error) {
            console.log(error);
        }
    };

  const getNamaJenis = (id) => {
        const found = jenisProduk.find((j) => j.id === id);
            return found ? found.nama : "-";
    };

  const filteredProduk =
    selectedKategori === "Semua"
      ? produk
      : produk.filter((item) => item.jenis_produk_id === selectedKategori);

    const handleBuy = (uuid) => {
     navigate(`/checkout/${uuid}`);
    };

  return (
    <div>
      <NavbarLandingPage />

      <section className="cta-banner">
        <div className="cta-content">
          <h2>Belanja Mudah, Harga Terbaik</h2>
          <p>Temukan berbagai produk berkualitas di Petik Niaga</p>
          <button className="cta-button">Lihat Produk</button>
        </div>
      </section>

      <div className="kategori-container">
        <h3 className="judul">Kategori</h3>
        <div className="kategori">
          <button
            className={`btn-kategori ${selectedKategori === "Semua" ? "active" : ""}`}
            onClick={() => setSelectedKategori("Semua")}>
            <b>Semua</b>
          </button>

          {kategori.map((kat) => (
            <button
              key={kat.id}
              className={`btn-kategori ${selectedKategori === kat.id ? "active" : ""}`}
              onClick={() => setSelectedKategori(kat.id)}>
              <b>{kat.nama}</b>
            </button>
          ))}
        </div>
      </div>

      <div className="produk-container">
        {filteredProduk.length > 0 ? (
          filteredProduk.map((item) => (
            <div key={item.id} className="card-gambar">
              <div className="card-img">
                <img
                  src={item.url || keranjang}
                  alt={item.nama_barang}
                  onError={(e) => {
                    e.target.src = keranjang;
                  }}
                />
              </div>
              <div className="card-body">
                <small className="card-category">{getNamaJenis(item.jenis_produk_id)}</small>
                <h3 className="card-title">{item.nama_barang}</h3>
                <small className="card-stok">stok: {item.stok}</small>
                <p className="card-price">Rp {item.harga?.toLocaleString("id-ID")}</p>
                <div className="btn">
                  <button>+Keranjang</button>
                <button onClick={() => handleBuy(item.uuid)}>Beli</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="empty">Tidak ada produk</p>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default CTA;
