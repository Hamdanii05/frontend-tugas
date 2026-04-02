import { useState } from "react"
import "./MyNavbar.css"
const MyNavbar = ({search, setSearch}) => {
  
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

  <li className="profile">
    <img src="https://picsum.photos/100/100" alt="profile" />
  </li>
</ul>
  )
}

export default MyNavbar
