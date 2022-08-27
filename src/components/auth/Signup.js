import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import Layout from "../../core/Layout"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css'
const Signup = () => {
  const navigate = useNavigate()
  return (
    <Layout>
      <ToastContainer />
      <h1>Signup</h1>
    </Layout>
  )
}

export default Signup