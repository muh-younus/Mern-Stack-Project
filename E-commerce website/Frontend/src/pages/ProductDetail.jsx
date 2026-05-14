import {useEffect, useState} from 'react';
import api from "../api/axios";
import { useParams } from "react-router-dom";
export default function ProductDetail(){
    const {id}= useParams();
    console.log("id",id)
    const [product, setProduct] = useState({});

    const loadProduct = async ()=>{
        const res = await api.get("/products/");
        const findProduct = res.data.find((p) => p._id === id);
        console.log("findProduct",findProduct)
        setProduct(findProduct);
    }
    useEffect(()=>{
        loadProduct();
    },[])
    if(!product){
        return <div>Loading...</div>
    }

    return(

        <div className="p-6 max-w-3xl mx-auto">
            <img src={product.image} alt={product.title} className="w-64 h-64 object-contain mb-4"/>
            <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
            <p className="text-gray-700 mt-2">{product.description}</p>
            <p className="text-xl font-semibold mt-4">${product.price}</p>

            <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-6"
            >Add to Cart</button>


            
            
           
        </div>
    )
}