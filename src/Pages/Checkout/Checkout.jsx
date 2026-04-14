import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import "./Checkout.css";
import { jwtDecode } from "jwt-decode";

const Checkout = () => {
  const { uuid } = useParams(); 
  const navigate = useNavigate();

  const [produk, setProduk] = useState(null);
  const [pembeli, setPembeli] = useState(null);
  const [pelanggan, setPelanggan] = useState("");
  const [noHp, setNoHp] = useState("");
  const [jumlah, setJumlah] = useState(1)
  

  const fetchProduk = async (uuid) => {
    try {
      const res = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/produk/${uuid}`
      );
      setProduk(res.data.data);
    } catch (err) {
      console.error("Error fetch produk:", err.response);
    }
  };

  
  const fetchPembeli = async () => {
  try {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);

    const res = await axiosInstance.get(
      `${import.meta.env.VITE_API_URL}/pelanggan`,{

      }
    );

    const cariPelanggan = res.data.data.find((e) => e.user_id === decoded.userId)
    setPelanggan(cariPelanggan.nama);
    setNoHp(cariPelanggan.no_hp);
    setPembeli(cariPelanggan);
    
  } catch (err) {
    console.error("Error fetch pembeli:", err.response);
  }
};


  useEffect(() => {
    if (uuid) {
      fetchProduk(uuid);
    }
    fetchPembeli();
  }, [uuid]);

  const tambah = () => setJumlah(jumlah + 1);
  const kurang = () => jumlah > 1 && setJumlah(jumlah - 1);

  if (!produk) return <p>Loading produk...</p>;

  const total = produk.harga * jumlah;

  return (
    <div className="checkout-container">
      <div className="header">
        <span className="back" onClick={() => navigate(-1)}>← Kembali</span>
        <h2>Checkout</h2>
      </div>

      <div className="content">
        <div className="card">
          <h3>Detail Produk</h3>
          <div className="product">
            <img
              src={produk.url || "https://picsum.photos/100/100"}
              alt={produk.nama_barang}
              onError={(e) => (e.target.src = "https://picsum.photos/100/100")}
            />
            <div>
              <h4>{produk.nama_barang}</h4>
              <p className="price">Rp {produk.harga.toLocaleString("id-ID")}</p>
              <p className="stock">Stok: {produk.stok}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Informasi Pembelian</h3>
          {pembeli ? (
            <div className="form-group">
              <label>Pembeli</label>
              <div className="input-box">
                <strong>{pelanggan}</strong>
                <p>{noHp}</p>
              </div>
            </div>
          ) : (
            <p>Silakan login untuk melanjutkan sebagai pembeli.</p>
          )}

          <div className="form-group">
            <label>Jumlah</label>
            <div className="qty">
              <button onClick={kurang}>-</button>
              <span>{jumlah}</span>
              <button onClick={tambah}>+</button>
            </div>
          </div>

          <div className="summary">
            <div>
              <span>Harga satuan</span>
              <span>Rp {produk.harga.toLocaleString("id-ID")}</span>
            </div>
            <div>
              <span>Jumlah</span>
              <span>{jumlah}</span>
            </div>
            <hr />
            <div className="total">
              <strong>Total</strong>
              <strong>Rp {total.toLocaleString("id-ID")}</strong>
            </div>
          </div>

          <button className="btn-buy">Lanjut ke Pembayaran →</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
