import axiosInstance from "../../Utils/axiosInstance";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddKartu.css"

const AddKartu = () => {
  const navigate = useNavigate();

  // state form
  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [diskon, setDiskon] = useState("");
  const [iuran, setIuran] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/kartu`,
        {
          kode,
          nama,
          diskon,
          iuran,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate(-1);
    } catch (error) {
      console.log(error.response);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="user-header">
        <h3>Tambah Kartu</h3>
      </div>

      <form onSubmit={handleSubmit} className="form-wrapper">
        <div className="form-grid">
          <label htmlFor="kode">Kode</label>
          <input
            type="text"
            id="kode"
            value={kode}
            onChange={(e) => setKode(e.target.value)}
            required
          />
          {errors.kode && <span style={{ color: "red" }}>{errors.kode}</span>}
        </div>

        <div className="form-grid">
          <label htmlFor="nama">Nama</label>
          <input
            type="text"
            id="nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
          {errors.nama && <span style={{ color: "red" }}>{errors.nama}</span>}
        </div>

        <div className="form-grid">
          <label htmlFor="diskon">Diskon</label>
          <input
            type="number"
            step="0.01"
            id="diskon"
            value={diskon}
            onChange={(e) => setDiskon(e.target.value)}
            required
          />
          {errors.diskon && <span style={{ color: "red" }}>{errors.diskon}</span>}
        </div>

        <div className="form-grid">
          <label htmlFor="iuran">Iuran</label>
          <input
            type="number"
            id="iuran"
            value={iuran}
            onChange={(e) => setIuran(e.target.value)}
            required
          />
          {errors.iuran && <span style={{ color: "red" }}>{errors.iuran}</span>}
        </div>

        <div className="btn-group">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-delete"
            disabled={loading}
          >
            Batal
          </button>
          <button type="submit" className="btn-tambah" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddKartu;
