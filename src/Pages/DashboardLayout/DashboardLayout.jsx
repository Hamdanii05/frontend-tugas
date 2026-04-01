import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import MyNavbar from "../../Components/MyNavbar/MyNavbar.jsx"
import "./DashboardLayout.css"
import {Outlet} from "react-router-dom"
import { useState } from "react";

const DashboardLayout = () => {
    const [search, setSearch] = useState("");
  return (
    <div className='dashboard-layout'>
      <Sidebar />

      <div className='dashboard-main'>
        <MyNavbar search={search} setSearch={setSearch}/>
        <main className="dashboard-content">
            <Outlet context={search}/>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout;
