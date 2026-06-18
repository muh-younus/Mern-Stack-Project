import {useParams} from "react-router-dom";

export default function orderSuccess(){
    const {id} = useParams()

    const goHome = ()=>{
        window.location.href ="/"
    }
    return(

        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-center">
            <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="mb-4">Your order ID is</p>
            <p className="mt-4">
                <span className="font-semibold">{id}</span>
            </p>
           
            <button onClick={goHome} className="mt-6 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
             continue shopping
            </button>
        </div>
    );
}