import axios from "axios"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddPelanggan = () => {
  const navigate = useNavigate();


  const [nama, setNama] = useState("");
  const [gender, setGender] = useState("");
  const [noHp, setNoHp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tglLahir, setTglLahir] = useState("");
  const [userId, setUserId] = useState("");
  const [kartuId, setKartuId] = useState("");


  const [userList, setUserList] = useState([]);
  const [kartuList, setKartuList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getUsers();
    getKartu();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/pelanggan`,
        {
          nama,
          gender,
          no_hp: noHp,
          alamat,
          tgl_lahir: tglLahir,
          user_id: userId,
          kartu_id: kartuId,
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

  const getUsers = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      setUserList(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getKartu = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/kartu`);
      setKartuList(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="user-header">
        <h3>Tambah Pelanggan</h3>
      </div>

      <form onSubmit={handleSubmit} className="form-wrapper">
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
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">-- pilih gender --</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
          {errors.gender && <span style={{ color: "red" }}>{errors.gender}</span>}
        </div>

        <div className="form-grid">
          <label htmlFor="no_hp">No HP</label>
          <input
            type="text"
            id="no_hp"
            value={noHp}
            onChange={(e) => setNoHp(e.target.value)}
            required
          />
          {errors.no_hp && <span style={{ color: "red" }}>{errors.no_hp}</span>}
        </div>

        <div className="form-grid">
          <label htmlFor="alamat">Alamat</label>
          <textarea
            id="alamat"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            required
          />
          {errors.alamat && <span style={{ color: "red" }}>{errors.alamat}</span>}
        </div>

        <div className="form-grid">
          <label htmlFor="tgl_lahir">Tanggal Lahir</label>
          <input
            type="date"
            id="tgl_lahir"
            value={tglLahir}
            onChange={(e) => setTglLahir(e.target.value)}
            required
          />
          {errors.tgl_lahir && <span style={{ color: "red" }}>{errors.tgl_lahir}</span>}
        </div>

        <div className="form-grid">
          <label htmlFor="user_id">User</label>
          <select
            id="user_id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          >
            <option value="">-- pilih User --</option>
            {userList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.username}
              </option>
            ))}
          </select>
          {errors.user_id && <span style={{ color: "red" }}>{errors.user_id}</span>}
        </div>

        <div className="form-grid">
          <label htmlFor="kartu_id">Kartu</label>
          <select
            id="kartu_id"
            value={kartuId}
            onChange={(e) => setKartuId(e.target.value)}
            required
          >
            <option value="">-- pilih Kartu --</option>
            {kartuList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>
          {errors.kartu_id && <span style={{ color: "red" }}>{errors.kartu_id}</span>}
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

export default AddPelanggan;
