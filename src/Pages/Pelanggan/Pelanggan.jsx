import { useEffect, useState } from "react"
import {NavLink, useOutletContext, useNavigate} from "react-router-dom"
import axios from "axios"
import Card from "../../Components/Card/Card";



const Pelanggan = () => {
    const navigate = useNavigate();
    const [pelanggan, setPelanggan] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const search = useOutletContext();
    const [userList, setUserList] = useState([]);
    const [kartuList, setKartuList] = useState([]);

    useEffect(() => {
        getProductCategories();
        getKartu();
        getUsers();
    },[])

    const getProductCategories = async() => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_API_URL}/pelanggan`,
            );
            // console.log(pelanggan);
            setPelanggan(result.data.data)
        } catch (error) {
            console.log(error);
            
        }
    }
    const getUsers = async () => {
        try {
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        setUserList(result.data.data);
        } catch (error) {
        console.log(error);
        }
  };

    const getNamaPelanggan = (id) => {
        const found = userList.find((j) => j.id === id);
            return found ? found.username : "-";
    };

    const getKartu = async () => {
        try {
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/kartu`);
        setKartuList(result.data.data);
        } catch (error) {
        console.log(error);
        }
  };
    const getNamaKartu = (id) => {
        const found = kartuList.find((j) => j.id === id);
            return found ? found.nama : "-";
    };

    const filteredData = pelanggan.filter((planggan) => {
        return planggan.nama?.toLowerCase().includes(search.toLowerCase());
    });

    const ITEMS_PER_PAGE = 10;
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)

    const paginatedData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
    );
    
    useEffect(() => {
        setCurrentPage(1);
    }, [search])
    
    const handleDelete = async(uuid) => {
        const msg = window.confirm("Yakin ingin menghapus kategori ini?");
        if (!msg) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/pelanggan/${uuid}`)
            getProductCategories()
        } catch (error) {
            console.log(error);
            
        }
            
    }
    const handleEdit = (uuid) => {
        navigate(`/dashboard/pelanggan/edit/${uuid}`);
    }

  return (
    <div>
      <div className='kategori-header'>
        <h3>Daftar Pelanggan</h3>
        <NavLink to="/dashboard/pelanggan/add">Tambah Pelanggan</NavLink>
      </div>

      <div className="table-wrapper">
            <table border={1}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Gender</th>
                        <th>No hp</th>
                        <th>Alamat</th>
                        <th>Tgl lahir</th>
                        <th>User</th>
                        <th>Kartu</th>
                        <th>aksi</th>
                    </tr>
                </thead>
                <tbody>
                {
                    paginatedData.map((planggan, index) => (
                    <tr key={index}>    
                        <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                        <td>{planggan.nama}</td>
                        <td>
                           {planggan.gender}
                        </td>
                        <td>{planggan.no_hp}</td>
                        <td>{planggan.alamat}</td>
                        <td>{planggan.tgl_lahir}</td>
                        <td>{getNamaPelanggan(planggan.user_id)}</td>
                        <td>{getNamaKartu(planggan.kartu_id)}</td>
                        <td>
                            <button onClick={() => handleEdit(planggan.uuid)}>Edit</button>
                            <button onClick={() => handleDelete(planggan.uuid)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
      </div>
      {/*PAGINATION*/}
      {
        totalPages > 1 && (
            <div className="pagination">
                <button className="btn-page" 
                        disabled={currentPage === 1} 
                        onClick={() => setCurrentPage((p) => p - 1)}>
                    &laquo; prev
                </button>
                {
                    Array.from({length: totalPages}).map((_, i) => (
                        <button 
                        className="btn-page" 
                        disabled = {currentPage === i + 1}
                        key={i} 
                        onClick={() => setCurrentPage(i + 1)}>{i+1}</button>
                    ))
                }
                <button className="btn-page" 
                        disabled={currentPage === totalPages} 
                        onClick={() => setCurrentPage((p) => p + 1)}>
                    &raquo; prev
                </button>
            </div>
        )
      }
    </div>
  )
}

export default Pelanggan;