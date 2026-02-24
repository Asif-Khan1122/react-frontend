import axios from "axios";
import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import "./HomePage.css";
import { ProductGrid } from "./ProductsGrid";
import { Link } from "react-router-dom";

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getHomeData = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getHomeData();
  }, []);

  return (
    <>
      <Header cart={cart} />
      <nav
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          padding: "10px 20px",
        }}
      >
        <Link to='/'>Home</Link>
        <Link to='/orders'>Orders</Link>
        <Link to='/checkout'>Checkout</Link>
      </nav>

      <div className='home-page'>
        <ProductGrid products={products} />
      </div>
    </>
  );
}
