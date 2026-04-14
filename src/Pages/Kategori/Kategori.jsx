import { useEffect, useState } from "react"
import {NavLink, useOutletContext, useNavigate} from "react-router-dom"
import axiosInstance from "../../Utils/axiosInstance";
import Card from "../../Components/Card/Card";
import "./Kategori.css"


const Kategori = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const search = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        getProductCategories();
    },[])

    const getProductCategories = async() => {
        try {
            const result = await axiosInstance.get(
                `${import.meta.env.VITE_API_URL}/jenis-produk`,
            );
            // console.log(categories);
            setCategories(result.data.data)
        } catch (error) {
            console.log(error);
            
        }
    }

    const filteredData = categories.filter((category) => {
        return category.nama?.toLowerCase().includes(search.toLowerCase());
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
            await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/jenis-produk/${uuid}`)
            getProductCategories()
        } catch (error) {
            console.log(error);
            
        }
            
    }

    const handleEdit = (uuid) => {
        navigate(`/dashboard/kategori/edit/${uuid}`);
    }
  return (
    <div>
      <div className='kategori-header'>
        <h3>Daftar Kategori</h3>
        <NavLink to="/dashboard/kategori/add">Tambah Kategori</NavLink>
      </div>

      <div className="table-wrapper">
            <table border={1}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Gambar</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                {
                    paginatedData.map((category, index) => (
                    <tr key={index}>    
                        <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                        <td>{category.nama}</td>
                        <td>
                            <img src={category.url} alt="gambar" width={120} />
                        </td>
                        <td>
                            <button onClick={() => handleEdit(category.uuid)}>Edit</button>
                            <button onClick={() => handleDelete(category.uuid)}>Delete</button>
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

export default Kategori;