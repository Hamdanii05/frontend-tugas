import axios from "axios"
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduk = () => {
    const navigate = useNavigate();
    const [namaProduk, setNamaProduk] = useState("");
    const [stok, setStok] = useState(0);
    const [minStok, setMinStok] = useState("");
    const [harga, setHarga] = useState("");
    const [kategori, setKategori] = useState("");
    const [gambar, setGambar] = useState(null);
    const [preview, setPreview] = useState(null);

    const [kategoriList, setKategoriList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});


    useEffect(() => {
        getKategori();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/produk`,{
                nama_barang: namaProduk,
                stok,
                min_stok : minStok,
                harga,
                jenis_produk_id  : kategori,
                gambar,
            },{
                headers: {
                    "Content-Type" : "multipart/form-data",
                },
            },
        );
        navigate(-1);
        } catch (error) {
            console.log(error.response);
            
        }finally{ 
            setLoading(false);
        }

    };

    const getKategori = async () => {
        try {
            const result = await axios.get(
            `${import.meta.env.VITE_API_URL}/jenis-produk`
            );
            // console.log(result.data); 
            setKategoriList(result.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setGambar(file);
    setPreview(URL.createObjectURL(file));
    }
  return (

    <>
    <div className="user-header">
        <h3>Tambah Produk</h3>
      </div>

      <form onSubmit={handleSubmit} className='form-wrapper'>
        <div className="form-grid">
            <label htmlFor="nama_produk">Nama Produk</label>
            <input type='text' 
                    id='nama_produk' 
                    placeholder='Contoh: Indomie' 
                    onChange={(e) => setNamaProduk(e.target.value)} 
                    required/>

                    {
                        errors.nama_produk && <span className='error' style={{color:"red"}}>
                            {errors.nama_produk}
                        </span>
                    }
        </div>

          <div className="form-grid">
            <label htmlFor="stok">Stok</label>
            <input type='number' 
                    id='stok' 
                    onChange={(e) => setStok(e.target.value)} 
                    required/>

                    {
                        errors.stok && <span className='error' style={{color:"red"}}>
                            {errors.stok}
                        </span>
                    }
        </div>

          <div className="form-grid">
            <label htmlFor="min_stok">Minimal stok</label>
            <input type='text' 
                    id='min_stok' 
                    onChange={(e) => setMinStok(e.target.value)} 
                    required/>

                    {
                        errors.min_stok && <span className='error' style={{color:"red"}}>
                            {errors.min_stok}
                        </span>
                    }
        </div>

          <div className="form-grid">
            <label htmlFor="harga">Harga</label>
            <input type='text' 
                    id='harga' 
                    
                    onChange={(e) => setHarga(e.target.value)} 
                    required/>

                    {
                        errors.harga && <span className='error' style={{color:"red"}}>
                            {errors.harga}
                        </span>
                    }
        </div>

            <div className="form-grid">
            <label htmlFor="nama_kategori">Nama kategori</label>
            
            <select
                    id="nama_kategori"
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    required
                    >
                    <option value="">-- pilih kategori --</option>
                    
                    {kategoriList.map((item) => (
                        <option key={item.id} value={item.id}>
                        {item.nama}
                        </option>
                    ))}
                    </select>
                    {
                        errors.nama_kategori && <span className='error' style={{color:"red"}}>
                            {errors.nama_kategori}
                        </span>
                    }
        </div>


        <div className="form-grid">
            <label htmlFor="gambar">Gambar</label>
            <input type='file' 
                    id='gambar' 
                    accept='image/*' 
                    onChange={handleChangeImage}/>

                    {
                        preview && <img src={preview} alt="image-privew" width={220} />
                    }
                    {
                        errors.global && <span className='error' style={{color:"red"}}>
                            {errors.global}
                        </span>
                    }
        </div>

        <div className="btn-group">
            <button type='button' onClick={() => navigate(-1)} className='btn-delete' disabled={loading}>Batal</button>
            <button type='submit' className='btn-tambah' disabled={loading}>{loading ? "Menyimpan..." : "Simpan"}</button>
        </div>
      </form>
    </>
  )
}

export default AddProduk
