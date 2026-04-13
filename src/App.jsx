import { Route, Routes } from 'react-router-dom';
import './App.css'
import MyNavbar from './Components/MyNavbar/MyNavbar'
import Sidebar from './Components/Sidebar/Sidebar'
import Kategori from './Pages/Kategori/Kategori';
import DashboardLayout from './Pages/DashboardLayout/DashboardLayout';
import Produk from './Pages/Produk/Produk';
import Pesanan from './Pages/Pesanan/Pesanan';
import Pelanggan from './Pages/Pelanggan/Pelanggan';
import Kartu from './Pages/Kartu/Kartu';
import Users from './Pages/Users/Users';
import History from './Pages/History/History';
import AddKategori from './Pages/Kategori/AddKategori';
import EditKategori from './Pages/Kategori/EditKategori';
import AddProduk from './Pages/Produk/AddProduk';
import AddPesanan from './Pages/Pesanan/AddPesanan';
import AddPelanggan from './Pages/Pelanggan/AddPelanggan';
import AddKartu from './Pages/Kartu/AddKartu';
import EditKartu from './Pages/Kartu/EditKartu';
import EditProduk from './Pages/Produk/EditProduk';
import EditPelanggan from './Pages/Pelanggan/EditPelanggan';
import EditPesanan from './Pages/Pesanan/EditPesanan';
import Login from './Pages/Login/Login'
import LandingPage from './Pages/LandingPage/CTA';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<DashboardLayout />}>
      
      <Route index element={<h1>Dashboard</h1>}/>

      {/*Pesanan*/}
      <Route path='/dashboard/pesanan' element={<Pesanan/>}/>
      <Route path='/dashboard/pesanan/add' element={<AddPesanan/>}/>
      <Route path='/dashboard/pesanan/edit/:uuid' element={<EditPesanan/>}/>

      {/*Produk*/}
      <Route path='/dashboard/produk' element={<Produk/>}/>
      <Route path='/dashboard/produk/add' element={<AddProduk/>}/>
      <Route path='/dashboard/produk/edit/:uuid' element={<EditProduk/>}/>

      {/*Jenis Produk*/}
      <Route path='/dashboard/kategori' element={<Kategori/>}/>
      <Route path='/dashboard/kategori/add' element={<AddKategori />}/>
      <Route path='/dashboard/kategori/edit/:uuid' element={<EditKategori/>}/>


      {/*Pelanggan*/}
      <Route path='/dashboard/pelanggan' element={<Pelanggan/>}/>
      <Route path='/dashboard/pelanggan/add' element={<AddPelanggan/>}/>
      <Route path='/dashboard/pelanggan/edit/:uuid' element={<EditPelanggan/>}/>

      {/*kartu*/}
      <Route path='/dashboard/kartu' element={<Kartu/>}/>
      <Route path='/dashboard/kartu/add' element={<AddKartu/>}/>
      <Route path='/dashboard/kartu/edit/:uuid' element={<EditKartu/>}/>

      {/*users*/}
      <Route path='/dashboard/users' element={<Users/>}/>

      {/*history*/}
      <Route path='/dashboard/history' element={<History/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App;
