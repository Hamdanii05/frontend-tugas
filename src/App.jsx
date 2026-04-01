import { Route, Routes } from 'react-router-dom';
import './App.css'
import MyNavbar from './Components/MyNavbar/MyNavbar'
import Sidebar from './Components/Sidebar/Sidebar'
import Kategori from './Pages/Kategori/Kategori';
import DashboardLayout from './Pages/DashboardLayout/DashboardLayout';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<h1>Hello World</h1>}/>
      <Route path='/dashboard' element={<DashboardLayout />}>
      
      <Route index element={<h1>Dashboard</h1>}/>

      {/*Pesanan*/}
      <Route path='/dashboard/pesanan' element={<h1>Pesanan</h1>}/>

      {/*Produk*/}
      <Route path='/dashboard/produk' element={<h1>Produk</h1>}/>
      <Route path='/dashboard/produk/add' element={<h1>Tambah Produk</h1>}/>
      <Route path='/dashboard/produk/edit' element={<h1>Edit Produk</h1>}/>

      {/*Jenis Produk*/}
      <Route path='/dashboard/kategori' element={<Kategori/>}/>

      {/*Pelanggan*/}
      <Route path='/dashboard/pelanggan' element={<h1>Pelanggan</h1>}/>

      {/*kartu*/}
      <Route path='/dashboard/kartu' element={<h1>Kartu</h1>}/>

      {/*users*/}
      <Route path='/dashboard/users' element={<h1>Users</h1>}/>

      {/*history*/}
      <Route path='/dashboard/history' element={<h1>History</h1>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App;
