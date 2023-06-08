import React, { useState } from 'react'
import '../login-jwt/register.css'
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: ""
  })

  const generateError = (err) => {
    toast.error(err, {
      position: "bottom-right",
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`http://localhost:4000/register`, {
        ...values,
      }, {
        withCredentials: true,
      });
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/")
        }
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <div>
        <h2>Registration Form</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Username:</label>
            <input type="text" placeholder="Enter your username" name="email" onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" placeholder="Enter your password" name="password" onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })} />
          </div>
          <button type="submit">Register</button>
        </form>
        <p>If already registered, Login <Link to="/login">here</Link>.</p>
      </div>
      <ToastContainer />
    </div>
  )
}