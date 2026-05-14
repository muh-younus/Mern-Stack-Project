import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import EditProduct from "./admin/EditProduct";
import AddProduct from "./admin/AddProduct";
import ProductList from "./admin/ProductList";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/product/:id", element: <ProductDetail /> },
      {path: "/cart", element: <Cart />},

      //For admin routes
      { path: "/admin/products", element: <ProductList /> },
      { path: "/admin/products/add", element: <AddProduct /> },
      { path: "/admin/products/update/:id", element: <EditProduct /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
