import "./App.css";
import React, { useEffect, useState } from "react";
import { ProductList } from "./components/ProductList/ProductsList.component";
import { Product } from "./model/model";

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const productsDBPort = import.meta.env.VITE_PRODUCTS_BACKEND_SERVER_PORT;

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                `http://localhost:${productsDBPort}/api/products`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProducts(data.products);
        }
        fetchData();
    }, []);

    return (
        <div className="app-container">
            <h2>Click the button to see the products</h2>
            <ProductList products={products} />
        </div>
    );
};

export default App;
