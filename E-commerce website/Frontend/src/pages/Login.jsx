import {useState} from "react"
import {useNavigate} from "react-router"
import api from "../api/axios.js"

export default function Login(){
    const [form, setForm] = useState({
        email: "",
        password:""
    })

    const [msge, setMsge] = useState("")
    const navigate=useNavigate();

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

   const  handleSubmit = async(e)=>{
 
    e.preventDefault();
    try{
        const res = await api.post("/auth/login", form)
        console.log("login res", res)
        //save token to local Storage
        console.log(localStorage.setItem("token",res.data.token))
       localStorage.setItem("userId",res.data.user.id)
        setMsge("user login successfully")
        //Redirect to home page after 1 second
        setTimeout(()=>{
            navigate("/");
        },1000)
    }catch(error){
        setMsge(error.response?.data?.message || "An error Occurred")
    }
    }
    

    return(
 <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">
          Login To Your Account
          </h2>
          {/* Show messages */}
          {msge && (
            <div className="mb-4 text-center text-sm text-blue-600 font-medium">
              {msge}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Sign In 
            </button>
          </form>
        </div>
      </div>
    </>
    )
}