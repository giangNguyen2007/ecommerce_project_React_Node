import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/HomePage/Home';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/Register&Login/Login';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import CartPage from './pages/Cart/CartPage';
import SingleProductPage from './pages/SingleProductPage/SingleProductPage';
import Register from './pages/Register&Login/Register';
import Footer from './components/Footer/Footer';
import SearchPage from './pages/SearchPage/SearchPage';

function App() {
  return (
    <div className="App">
            <Router> 
              <Navbar />
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} /> 
                  <Route path="/list/:category" element={<CategoryPage />} />
                  <Route path="/product/:id" element={<SingleProductPage />} />
                  <Route path="/product/search/:query" element={<SearchPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/register" element={<Register />} />
                  {/* <Route path="/payment-success" element={<PaymentSuccess />} /> */}
              </Routes>
              <Footer />
            </Router>
    </div>
  );
}

export default App;
