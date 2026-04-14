import {useState} from 'react'
import {useNavigate, useParams} from "react-router-dom"
import axiosInstance from "../../Utils/axiosInstance";
import { useEffect } from 'react';

const EditProduk = () => {
    const navigate = useNavigate();
    const [namaBarang, setNamaBarang] = useState("");
    const [stok, setStok] = useState("");
    const [minStok, setMinStok] = useState("");
    const [harga, setHarga] = useState("");
    const [jenisProduk, setJenisProduk] = useState("");
    const [kategoriList, setKategoriList] = useState([]);
    const [preview, setPreview] = useState(null);
    const [gambar, setGambar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const {uuid} = useParams();

    useEffect(() => {
        getCategoriesByUUID();
        getKategori();
    }, []);
    
    const getCategoriesByUUID = async() => {
        setLoading(true);
        try {
            const categories = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/produk/${uuid}`);
            console.log(categories);
            setNamaBarang(categories.data.data.nama_barang);
            setStok(categories.data.data.stok);
            setMinStok(categories.data.data.min_stok);
            setHarga(categories.data.data.harga);
            setJenisProduk(categories.data.data.jenis_produk_id);
            setPreview(categories.data.data.url);
        } catch (error) {
            console.log(error.response);
            
        }finally {
            setLoading(false);
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        try {
            await axiosInstance.put(`${import.meta.env.VITE_API_URL}/produk/${uuid}`,{
                nama_barang : namaBarang,
                stok,
                min_stok : minStok,
                harga,
                jenis_produk_id : jenisProduk,
                gambar

            },
           {
            headers :{
                "Content-Type" : "multipart/form-data"
            }
           }
        );
        } catch (error) {
            console.log(error.response);
            
        }finally {
            setLoading(false);
        }
        navigate(-1);
    }

    const getKategori = async () => {
        try {
            const result = await axiosInstance.get(
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
    <div>
            <div className="user-header">
        <h3>Edit Kartu</h3>
      </div>

      <form onSubmit={handleSubmit} className='form-wrapper'>
        <div className="form-grid">
            <label htmlFor="namaBarang">Nama Barang</label>
            <input type='text' 
                    id='namaBarang' 
                    value={namaBarang}
                    placeholder='Contoh: PPA'
                    onChange={(e) => setNamaBarang(e.target.value)} 
                    required/>

                    {
                        errors.namaBarang && <span className='error' style={{color:"red"}}>
                            {errors.namaBarang}
                        </span>
                    }
        </div>
        <div className="form-grid">
            <label htmlFor="stok">Stok</label>
            <input type='number' 
                    id='stok' 
                    value={stok}
                    onChange={(e) => setStok(e.target.value)} 
                    required/>

                    {
                        errors.stok && <span className='error' style={{color:"red"}}>
                            {errors.stok}
                        </span>
                    }
        </div>
        <div className="form-grid">
            <label htmlFor="minStok">Min Stok</label>
            <input type='number' 
                    id='minStok' 
                    value={minStok}
                    onChange={(e) => setMinStok(e.target.value)} 
                    required/>

                    {
                        errors.minStok && <span className='error' style={{color:"red"}}>
                            {errors.minStok}
                        </span>
                    }
        </div>
        <div className="form-grid">
            <label htmlFor="harga">Harga</label>
            <input type='number' 
                    id='harga' 
                    value={harga}
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
                    value={jenisProduk}
                    onChange={(e) => setJenisProduk(e.target.value)}
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
    </div>
  )
}

export default EditProduk;
