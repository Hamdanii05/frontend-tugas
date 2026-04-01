import { useState } from "react"

const MyNavbar = ({search, setSearch}) => {
  
  return (
   <ul>
    <li>
        <input 
         type='text' 
         name='search' 
         id='search' 
         value={search} 
         onChange={(e) => setSearch(e.target.value)} 
         />
    </li>
    <li>Profile</li>
    <li>Logout</li>
   </ul>
  )
}

export default MyNavbar
