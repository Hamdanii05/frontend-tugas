import { useEffect, useState } from "react"
import {NavLink, useOutletContext,useNavigate} from "react-router-dom"
import axiosInstance from "../../Utils/axiosInstance";
import Card from "../../Components/Card/Card";



const Pesanan = () => {
      const navigate = useNavigate();
    const [pesanan, setPesanan] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const search = useOutletContext();
    const [customer, setCustomer] = useState([]);

    useEffect(() => {
        getPesanan();
        getCustomer();
    },[])

    const getPesanan = async() => {
        try {
            const result = await axiosInstance.get(
                `${import.meta.env.VITE_API_URL}/pesanan`,
            );
            // console.log(pesanan);
            setPesanan(result.data.data)
        } catch (error) {
            console.log(error);
            
        }
    }

    const getCustomer = async () => {
        try {
            const result = await axiosInstance.get(
            `${import.meta.env.VITE_API_URL}/pelanggan`
            );
            setCustomer(result.data.data);
        }   catch (error) {
            console.log(error);
        }
    };

    const getPelanggan = (id) => {
        const found = customer.find((j) => j.id === id);
            return found ? found.nama : "-";
    };

    const filteredData = pesanan.filter((pesan) => {
        return pesan.tanggal?.toLowerCase().includes(search.toLowerCase());
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
            await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/pesanan/${uuid}`)
            getPesanan()
        } catch (error) {
            console.log(error);
            
        }
            
    }

    const handleEdit = (uuid) => {
        navigate(`/dashboard/pesanan/edit/${uuid}`);
    }
  return (
    <div>
      <div className='kategori-header'>
        <h3>Daftar Pesanan</h3>
        <NavLink to="/dashboard/pesanan/add">Tambah Pesanan</NavLink>
      </div>

      <div className="table-wrapper">
            <table border={1}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>Total</th>
                        <th>Pelanggan</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                {
                    paginatedData.map((pesan, index) => (
                    <tr key={index}>    
                        <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                        <td>{pesan.tanggal}</td>
                        <td>
                           {pesan.total}
                        </td>
                        <td>{getPelanggan(pesan.pelanggan_id)}</td>
                        <td>
                            <button onClick={() => handleEdit(pesan.uuid)}>Edit</button>
                            <button onClick={() => handleDelete(pesan.uuid)}>Delete</button>
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

export default Pesanan;