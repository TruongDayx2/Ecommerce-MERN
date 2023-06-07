import { BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import Products from "./components/pages/product/Products";
import AddProduct from "./components/pages/product/AddProduct";
import EditProduct from "./components/pages/product/EditProduct";
import Orders from "./components/pages/order/Orders";
import EditOrder from "./components/pages/order/EditOrder";
import Users from "./components/pages/user/Users";
import NotFound from "./components/pages/NotFound";
import AuthRoute from "./AuthRoute";
import PrivateRouter from "./PrivateRouter";
import Toast from "./components/LoadingError/Toast";
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import AddUser from "./components/pages/user/AddUser";
import EditUser from "./components/pages/user/EditUser";
import ForgotPassword from "./components/pages/ForgotPass";

function App() {
  return (
    <>
      <Toast/>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={Dashboard} exact />
          <AuthRoute path="/login" component={Login} />
          <AuthRoute path="/forgotpassword" component={ForgotPassword} />
          <AuthRoute path="/register" component={Register} />
          <PrivateRouter path="/dashboard" component={Dashboard} />
          <PrivateRouter path="/products" component={Products} />
          <PrivateRouter path="/product/add" component={AddProduct} />
          <PrivateRouter path="/product/edit/:id" component={EditProduct} />
          <PrivateRouter path="/orders" component={Orders} />
          <PrivateRouter path="/order/edit/:id" component={EditOrder} />
          <PrivateRouter path="/users/add" component={AddUser} />
          <PrivateRouter path="/users/edit/:id" component={EditUser} />
          <PrivateRouter path="/users" component={Users} />
          <PrivateRouter path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
