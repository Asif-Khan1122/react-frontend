import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { HomePage } from "./pages/Home/HomePage.jsx";
import { CheckoutPage } from "./pages/checkout/CheckoutPage.jsx";
import { OrdersPage } from "./pages/orders/OrdersPages.jsx";

import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/cart-items?expand=product`);
      setCart(response.data);
    };
    fetchData();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path='checkout' element={<CheckoutPage cart={cart} />} />
      <Route path='orders' element={<OrdersPage cart={cart} />} />
    </Routes>
  );
}

export default App;
