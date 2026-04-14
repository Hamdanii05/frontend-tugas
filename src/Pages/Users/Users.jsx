import { useEffect, useState } from "react"
import {NavLink, useOutletContext} from "react-router-dom"
import axiosInstance from "../../Utils/axiosInstance";
import Card from "../../Components/Card/Card";



const Users = () => {
    const [player, setPlayer] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const search = useOutletContext();

    useEffect(() => {
        getPlayer();
    },[])

    const getPlayer = async() => {
        try {
            const result = await axiosInstance.get(
                `${import.meta.env.VITE_API_URL}/users`,
            );
            // console.log(player);
            setPlayer(result.data.data)
        } catch (error) {
            console.log(error);
            
        }
    }

    const filteredData = player.filter((user) => {
        return user.uuid?.toLowerCase().includes(search.toLowerCase());
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
            await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/users/${uuid}`)
            getPlayer()
        } catch (error) {
            console.log(error);
            
        }
            
    }

  return (
    <div>
      <div className='kategori-header'>
        <h3>Daftar Users</h3>
        {/* <NavLink to="/dashboard/kategori/add">Tambah Users</NavLink> */}
      </div>

      <div className="table-wrapper">
            <table border={1}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Gambar</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                {
                    paginatedData.map((user, index) => (
                    <tr key={index}>    
                        <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                        <td>
                           {user.username}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.status}</td>
                        <td>{user.gambar}</td>
                        <td>
                            <button>Edit</button>
                            <button onClick={() => handleDelete(user.uuid)}>Delete</button>
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

export default Users;