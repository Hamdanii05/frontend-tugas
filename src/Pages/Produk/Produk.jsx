import { useEffect, useState } from "react"
import {NavLink, useOutletContext, useNavigate} from "react-router-dom"
import axios from "axios"
import Card from "../../Components/Card/Card";



const Produk = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const search = useOutletContext();
    const [jenisProduk, setJenisProduk] = useState([]);

    useEffect(() => {
        getProductCategories();
        getJenisProduk();
    },[])

    const getProductCategories = async() => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_API_URL}/produk`,
            );
            // console.log(products);
            setProducts(result.data.data)
        } catch (error) {
            console.log(error);
            
        }
    }
        const getJenisProduk = async () => {
        try {
            const result = await axios.get(
            `${import.meta.env.VITE_API_URL}/jenis-produk`
            );
            setJenisProduk(result.data.data);
        }   catch (error) {
            console.log(error);
        }
    };

    const getNamaJenis = (id) => {
        const found = jenisProduk.find((j) => j.id === id);
            return found ? found.nama : "-";
    };

    const filteredData = products.filter((product) => {
        return product.nama_barang?.toLowerCase().includes(search.toLowerCase());
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
            await axios.delete(`${import.meta.env.VITE_API_URL}/produk/${uuid}`)
            getProductCategories()
        } catch (error) {
            console.log(error);
            
        }
            
    }
    const handleEdit = (uuid) => {
        navigate(`/dashboard/produk/edit/${uuid}`);
    }

  return (
    <div>
      <div className='kategori-header'>
        <h3>Daftar Produk</h3>
        <NavLink to="/dashboard/produk/add">Tambah Produk</NavLink>
      </div>

      <div className="table-wrapper">
            <table border={1}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama_barang</th>
                        <th>Stok</th>
                        <th>Min_stok</th>
                        <th>Harga</th>
                        <th>jenis produk</th>
                        <th>Gambar</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                {
                    paginatedData.map((product, index) => (
                    <tr key={index}>    
                        <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                        <td>{product.nama_barang}</td>
                        <td>
                           {product.stok}
                        </td>
                        <td>{product.min_stok}</td>
                        <td>{product.harga}</td>
                        <td>{getNamaJenis(product.jenis_produk_id)}</td>
                        <td>
                            <img src={product.url} alt="gambar" width={120} />
                        </td>
                        <td>
                            <button onClick={() => handleEdit(product.uuid)}>Edit</button>
                            <button onClick={() => handleDelete(product.uuid)}>Delete</button>
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

export default Produk;