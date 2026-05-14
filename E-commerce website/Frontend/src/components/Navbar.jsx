import { useState, useEffect } from "react";
import api from "../api/axios.js";
import {Link, useNavigate} from "react-router-dom"
 


export default function Navbar(){

    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const userId = localStorage.getItem("userId");

    useEffect(()=>{

        const loadCart = async()=>{
            if(!userId)return setCartCount(0);

            const res = await api.get(`/cart/${userId}`);
            const total = res.data.items.reduce(
                (sum,item)=>sum + item.quantity, 0
            );
            setCartCount(total);
        }
        loadCart();
        window.addEventListener("cartUpdated", loadCart);

        return()=>{
            window.removeEventListener("cartUpdated", loadCart);
        }

    },[userId])
    const handleLogout = ()=>{
        localStorage.clear();
        navigate('/login')
        setCartCount(0);
    }

    return(
        <nav
        className="flex justify-between p-4 shadow"
        >
     <Link to="/" className="font-bold text-xl">Younus's Store</Link>
        <div className="flex gap-4 items-center">
            <Link to="/cart" className="relative">
                Cart
                {cartCount > 0 && ( 
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                        {cartCount}
                    </span> 
                )}
            </Link>
            {
                !userId ?(
                    <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">signup</Link>
                    </>
                ):(
                    <button onClick={handleLogout}>Logout</button>
                )
            }
        </div>
        </nav>
    )
}
