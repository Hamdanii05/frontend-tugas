import { useEffect, useState } from "react"
import {NavLink, useOutletContext} from "react-router-dom"
import axios from "axios"
import Card from "../../Components/Card/Card";



const History = () => {
    const [riwayat, setRiwayat] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const search = useOutletContext();

    useEffect(() => {
        getRiwayat();
    },[])

    const getRiwayat = async() => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_API_URL}/history`,
            );
            // console.log(riwayat);
            setRiwayat(result.data.data)
        } catch (error) {
            console.log(error);
            
        }
    }

    const filteredData = riwayat.filter((historia) => {
        return historia.action?.toLowerCase().includes(search.toLowerCase());
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
            await axios.delete(`${import.meta.env.VITE_API_URL}/history/${uuid}`)
            getRiwayat()
        } catch (error) {
            console.log(error);
            
        }
            
    }

  return (
    <div>
      <div className='kategori-header'>
        <h3>Daftar History</h3>
        {/* <NavLink to="/dashboard/kategori/add">Tambah History</NavLink> */}
      </div>

      <div className="table-wrapper">
            <table border={1}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>user_id</th>
                        <th>Action</th>
                        <th>Table</th>
                        <th>Value</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                {
                    paginatedData.map((historia, index) => (
                    <tr key={index}>    
                        <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                        <td>{historia.user_id}</td>
                        <td>
                           {historia.action}
                        </td>
                        <td>{historia.table}</td>
                        <td>{historia.value}</td>
                        <td>
                            <button>Edit</button>
                            <button onClick={() => handleDelete(historia.uuid)}>Delete</button>
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

export default History;