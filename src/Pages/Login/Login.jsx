import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {NavLink, replace, useNavigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        username,
        password
      }
    );
      const token = response.data.token;
      localStorage.setItem("token", token);

      const decoded = (token);
     
    if (decoded.role === "jwtDecodepelanggan") {
      navigate("/")
    }else {
      navigate("/dashboard")
    }
      console.log(response);
     
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response);
      
    }

  }

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        if (decoded.role == "pelanggan") {
          navigate("/", {replace : true})
        }else {
          navigate("/dashboard", {replace : true})
        }
      }
    }, [])


  return (
    <div className='login-page'>
      <div className="login-card">
        <div className="login-logo">
            <NavLink>
                <div className="login-logo-icon"></div>
            </NavLink>
            <h2>PeTIK Niaga</h2>
            <p>Login</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}  className="login-form">
        <div className="login-field">
        <label htmlFor="username">Username</label>
        <input 
          type="text" 
          placeholder='Masukkan username' 
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
          autoFocus
          />
        </div>
        
        <div className="login-field">
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          autoComplete="current-password"
          placeholder='Masukkan password' 
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          />
        </div>

        <button type='submit' className="btn-login">Masuk</button>
      </form>
    </div>
  )
}

export default Login
