import axios from "axios"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddProduk = () => {
  const navigate = useNavigate();

  // state untuk form
  const [tanggal, setTanggal] = useState("");
  const [total, setTotal] = useState(0);
  const [pelanggan, setPelanggan] = useState("");

  // state tambahan
  const [pelangganList, setPelangganList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getPelanggan();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/pesanan`,
        {
          tanggal,
          total,
          pelanggan_id: pelanggan,
        },
        {
          headers: {
            "Content-Type": "application/json", // pakai json, bukan multipart
          },
        }
      );
      navigate(-1);
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  const getPelanggan = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/pelanggan`
      );
      setPelangganList(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="user-header">
        <h3>Tambah Pesanan</h3>
      </div>

      <form onSubmit={handleSubmit} className="form-wrapper">
        <div className="form-grid">
          <label htmlFor="tanggal">Tanggal</label>
          <input
            type="date"
            id="tanggal"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            required
          />
          {errors.tanggal && (
            <span className="error" style={{ color: "red" }}>
              {errors.tanggal}
            </span>
          )}
        </div>

        <div className="form-grid">
          <label htmlFor="total">Total</label>
          <input
            type="number"
            id="total"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            required
          />
          {errors.total && (
            <span className="error" style={{ color: "red" }}>
              {errors.total}
            </span>
          )}
        </div>

        <div className="form-grid">
          <label htmlFor="pelanggan_id">Nama Pelanggan</label>
          <select
            id="pelanggan_id"
            value={pelanggan}
            onChange={(e) => setPelanggan(e.target.value)}
            required
          >
            <option value="">-- pilih Pelanggan --</option>
            {pelangganList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>
          {errors.pelanggan_id && (
            <span className="error" style={{ color: "red" }}>
              {errors.pelanggan_id}
            </span>
          )}
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
          <button
            type="submit"
            className="btn-tambah"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddProduk;
