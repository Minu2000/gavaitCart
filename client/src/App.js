import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Viewproduct from './components/Products/Viewproduct'; 
// import Navbar from './components/Homepage/Navbar';
import Register from './components/Loginregister/Register';
import Login from './components/Loginregister/Login';
//import Sidebar from './components/Sidebar';
import Homepage from './components/Homepage/Homepage';
// import Checkout from './components/Checkout';
import Logout from './components/Loginregister/Logout';
import Search from './components/Products/Search';
import Payment from './components/Checkout/Payment';
import AddressForm from './components/Checkout/Address';
import ShipmentPage from './components/Checkout/Shippment';
import Checkout from './components/Checkout/Checkout';
import Wishlist from './components/Products/Wishlist';

function App() {
  const [isAuthenticated, setAuth] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/viewproducts" element={<Viewproduct />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/search" element={<Search />} />
        <Route path ="/match_credit_card" element ={<Payment />}/>
        {/* <Route path ="/bank" element ={<Bank/>}/> */}
        <Route path="/address" element={<AddressForm />} />
        <Route path="/shippment" element={<ShipmentPage />} />
        <Route path="/checkout" element={< Checkout/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
