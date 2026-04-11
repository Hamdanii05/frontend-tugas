import { useEffect, useState } from "react"
import {NavLink, useOutletContext,useNavigate} from "react-router-dom"
import axios from "axios"
import Card from "../../Components/Card/Card";



const Kartu = () => {
    const navigate = useNavigate();
    const [kartu, setKartu] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const search = useOutletContext();

    useEffect(() => {
        getKartu();
    },[])

    const getKartu = async() => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_API_URL}/kartu`,
            );
            // console.log(kartu);
            setKartu(result.data.data)
        } catch (error) {
            console.log(error);
            
        }
    }

    const filteredData = kartu.filter((card) => {
        return card.kode?.toLowerCase().includes(search.toLowerCase());
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
            await axios.delete(`${import.meta.env.VITE_API_URL}/kartu/${uuid}`)
            getKartu()
        } catch (error) {
            console.log(error);
            
        }
            
    }
    const handleEdit = (uuid) => {
        navigate(`/dashboard/kartu/edit/${uuid}`);
    }

  return (
    <div>
      <div className='kategori-header'>
        <h3>Daftar Kartu</h3>
        <NavLink to="/dashboard/kartu/add">Tambah Kartu</NavLink>
      </div>

      <div className="table-wrapper">
            <table border={1}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Kode</th>
                        <th>Nama</th>
                        <th>Diskon</th>
                        <th>Iuran</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                {
                    paginatedData.map((card, index) => (
                    <tr key={index}>    
                        <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                        <td>{card.kode}</td>
                        <td>
                           {card.nama}
                        </td>
                        <td>{card.diskon}</td>
                        <td>{card.iuran}</td>
                        <td>
                            <button onClick={() => handleEdit(card.uuid)}>Edit</button>
                            <button onClick={() => handleDelete(card.uuid)}>Delete</button>
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

export default Kartu;