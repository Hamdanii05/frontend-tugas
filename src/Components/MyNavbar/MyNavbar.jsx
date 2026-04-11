import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import "./MyNavbar.css"
const MyNavbar = ({search, setSearch}) => {

   const navigate = useNavigate();

  const [username, setUsername] = useState("");


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login")
  };

  const getUserLogin = () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
      console.log(decoded);
      
    } catch (error) {
      console.log(error.response);
      
    }
  }
  useEffect(() => {
    getUserLogin();
  }, [])
  
  return (
<ul className="navbar">
  <li className="search-box">
    <div className="search-wrapper">
      <span className="icon">🔍</span>
      <input 
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  </li>
  <li>{username}</li>

  <li className="profile">
    <img src="https://picsum.photos/100/100" alt="profile" />
  </li>
   <li>
      <button className="logout" onClick={handleLogout}>Logout</button>
    </li>
</ul>
  )
}

export default MyNavbar
