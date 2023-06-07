import Product from "./pages/product/Product";
import Home from "./pages/Home"
import ProductList from "./pages/product/ProductList";
import Register from "./pages/Login-Register/Register";
import Login from "./pages/Login-Register/Login";
import Cart from "./pages/cart/Cart";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
  Navigate
} from "react-router-dom"
import { useSelector } from "react-redux";
import Order from "./pages/Orders/Order";

const App = () => {
  const user = useSelector((state)=>state.user.currentUser)
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Home/>} />
        <Route path="/products/:category" element={<ProductList/>} />
        <Route path="/products/:category/:catePath" element={<ProductList/>} />
        <Route path="/product/:id" element={<Product/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/order" element={<Order/>} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login/>} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register/>} /> 
      </Routes>
    </Router>
  )
}

export default App;
