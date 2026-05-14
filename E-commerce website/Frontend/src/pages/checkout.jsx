import {useState, useEffect} from "react";
import api from "../api/axios.jsx";


const Checkout = ()=>{

    const userId = localStorage.getItem("userId")
    const [cart, setCart] = useState(null)
    const [address, setAddress] = useState([])

    useEffect(()=>{

        api.get("/cart/${userId}").then((res)=>setCart((res.data)))
        api.get("/address/${userId}").then((res)=>setAddress((res.data)))
    },[])
}