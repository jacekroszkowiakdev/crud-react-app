import "./App.css";
import React, { useEffect, useState } from "react";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header.component";
import { Login } from "../src/components/Login/Login.component";
import { Footer } from "../src/components/Footer/Footer.component";
import { ProductList } from "./components/ProductList/ProductsList.component";
import { ProductCrudControl } from "./components/ProductCrudControl/ProductCrudControl.component";
import { ProductForm } from "./components/ProductForm/ProductForm.component";
import { Product } from "./model/Product.model";

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const productsBackendPort = import.meta.env
        .VITE_PRODUCTS_BACKEND_SERVER_PORT;

    async function fetchData() {
        const response = await fetch(
            `http://localhost:${productsBackendPort}/api/products`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const updateProductList = () => {
        fetchData();
    };

    return (
        <div className="app-container">
            <Header />
            <BrowserRouter>
                <div className="links">
                    <Link to="/">
                        <button>Main</button>
                    </Link>

                    <Link to="/edit-products">
                        <button>Manage Products Details</button>
                    </Link>

                    <Link to="/create-products">
                        <button>Create and add to DB</button>
                    </Link>

                    <Link to="/login">
                        <button>Sing In</button>
                    </Link>
                </div>

                <Routes>
                    <Route
                        path="/"
                        element={<ProductList products={products} />}
                    ></Route>
                    <Route
                        path="/login"
                        element={<Login backendPort={productsBackendPort} />}
                    ></Route>
                    <Route
                        path="/edit-products"
                        element={
                            <ProductCrudControl
                                backendPort={productsBackendPort}
                            />
                        }
                    ></Route>
                    <Route
                        path="/create-products"
                        element={
                            <ProductForm
                                backendPort={productsBackendPort}
                                updateProductList={updateProductList}
                            />
                        }
                    ></Route>
                </Routes>
            </BrowserRouter>

            <Footer />
        </div>
    );
};
export default App;
