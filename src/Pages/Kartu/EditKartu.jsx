import {useState} from 'react'
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios"
import { useEffect } from 'react';

const EditKartu = () => {
    const navigate = useNavigate();
    const [kode, setKode] = useState("");
    const [namaKartu, setNamaKartu] = useState("");
    const [diskon, setDiskon] = useState([]);
    const [iuran, setIuran] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const {uuid} = useParams();

    useEffect(() => {
        getCategoriesByUUID();
    }, []);
    
    const getCategoriesByUUID = async() => {
        setLoading(true);
        try {
            const categories = await axios.get(`${import.meta.env.VITE_API_URL}/kartu/${uuid}`);
            console.log(categories);
            setKode(categories.data.data.kode);
            setNamaKartu(categories.data.data.nama);
            setIuran(categories.data.data.iuran);
            setDiskon(categories.data.data.diskon);
        } catch (error) {
            console.log(error);
            
        }finally {
            setLoading(false);
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/kartu/${uuid}`,{
                kode,
                nama : namaKartu,
                diskon,
                iuran

            }
        );
        } catch (error) {
            console.log(error.response);
            
        }finally {
            setLoading(false);
        }
        navigate(-1);
    }

  return (
    <div>
            <div className="user-header">
        <h3>Edit Kartu</h3>
      </div>

      <form onSubmit={handleSubmit} className='form-wrapper'>
        <div className="form-grid">
            <label htmlFor="kode">Kode</label>
            <input type='text' 
                    id='kode' 
                    value={kode}
                    placeholder='Contoh: PPA'
                    onChange={(e) => setKode(e.target.value)} 
                    required/>

                    {
                        errors.kode && <span className='error' style={{color:"red"}}>
                            {errors.kode}
                        </span>
                    }
        </div>
        <div className="form-grid">
            <label htmlFor="nama">Nama Kartu</label>
            <input type='text' 
                    id='nama' 
                    value={namaKartu}
                    onChange={(e) => setNamaKartu(e.target.value)} 
                    required/>

                    {
                        errors.nama && <span className='error' style={{color:"red"}}>
                            {errors.nama}
                        </span>
                    }
        </div>
        <div className="form-grid">
            <label htmlFor="diskon">Diskon</label>
            <input type='number' 
                    id='diskon' 
                    value={diskon}
                    placeholder='Contoh: 1-100'
                    onChange={(e) => setDiskon(e.target.value)} 
                    required/>

                    {
                        errors.diskon && <span className='error' style={{color:"red"}}>
                            {errors.diskon}
                        </span>
                    }
        </div>
        <div className="form-grid">
            <label htmlFor="iuran">Iuran</label>
            <input type='number' 
                    id='iuran' 
                    value={iuran}
                    onChange={(e) => setIuran(e.target.value)} 
                    required/>

                    {
                        errors.iuran && <span className='error' style={{color:"red"}}>
                            {errors.iuran}
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

export default EditKartu;
