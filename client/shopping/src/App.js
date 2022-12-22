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

const App = () => {
  const user = true
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Home/>} />
        <Route path="/products/:category" element={<ProductList/>} />
        <Route path="/product/:id" element={<Product/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login/>} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register/>} /> 
      </Routes>
    </Router>
  )
}

export default App;
