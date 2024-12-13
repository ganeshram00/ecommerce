import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MeProfile } from "./redux/slice/userSlicer";
import Header from "./Components/layout/Header";
import Footer from "./Components/layout/Footer";
import ProtectedRoute from "./Components/Route/ProtectedRoute";
import AdminRoute from "./Components/Route/AdminRoute";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import UserOptions from './Components/layout/UserOptions'
import Products from './Components/Products/Products'
import ProductsDetails from './Components/Products/ProductsDetails'
import Search from './Components/Products/Search'
import Loader from './Components/Loader/Loader'
// Component imports
import Home from "./Components/Home/Home";
import Register from "./Components/users/Register";
import Profile from "./Components/users/Profile";
import ProfileUpdate from "./Components/users/ProfileUpdate";
import UpdatePassword from "./Components/users/UpdatePassword";
import ForgotPassword from "./Components/users/ForgotPassword";
import ResetPassword from "./Components/users/ResetPassword";
import Cart from "./Components/cart/Cart";
import Shipping from "./Components/cart/Shipping";
import ConfirmOrder from "./Components/cart/ConfirmOrder";
import Payment from "./Components/cart/Payment";
import Success from "./Components/cart/Success";
import MeOrder from "./Components/order/MeOrder";
import SingleOrder from "./Components/order/SingleOrder";
import Dashboard from "./Components/admin/Dashboard";
import AllProducts from "./Components/admin/AllProducts";
import AddProducts from "./Components/admin/AddProducts";
import AllOrderAdmin from "./Components/admin/AllOrderAdmin";
import Process from "./Components/admin/Process";
import AllUsers from "./Components/admin/AllUsers";
import UpdateUserRoles from "./Components/admin/UpdatUserRoles";
import AllReviews from "./Components/admin/AllReviews";
import  { Toaster } from 'react-hot-toast';
import axios from "axios";
import NotFound from "./Components/layout/NotFound";
import UpdateProducts from "./Components/admin/UpdateProducts";
import ScrollToTop from "./Components/ScrollToTop";
import About from "./Components/other/About";
import Contact from "./Components/other/Contact";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, users } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
      dispatch(MeProfile());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      async function getStripeApiKey() {
        const { data } = await axios.get("http://localhost:4000/payment/stripeapikey");
        setStripeApiKey(data.stripeApiKey);
      }
      getStripeApiKey();
    }
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      {isAuthenticated && <UserOptions users={users} />}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductsDetails />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Routes */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update"
          element={
            <ProtectedRoute>
              <ProfileUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/forgot"
          element={<ForgotPassword />}
        />
        <Route
          path="/password/reset/:token"
          element={<ResetPassword />}
        />

        <Route
          path="/Register/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MeOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <SingleOrder />
            </ProtectedRoute>
          }
        />
        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <ProtectedRoute>
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
        )}

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AllProducts />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products/create"
          element={
            <AdminRoute>
              <AddProducts />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AllOrderAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/process/:id"
          element={
            <AdminRoute>
              <Process />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AllUsers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/updateRole/:id"
          element={
            <AdminRoute>
              <UpdateUserRoles />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <AdminRoute>
              <AllReviews />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products/edit/:id"
          element={
            <AdminRoute>
              <UpdateProducts />
            </AdminRoute>
          }
        />

        <Route path="*" element={<NotFound />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
