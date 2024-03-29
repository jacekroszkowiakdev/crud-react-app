import "./ProductForm.styles.css";
import React, { FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../model/model";

export const ProductForm: React.FC<{
    productsDBPort: number;
    updateProductList: () => void;
}> = ({ productsDBPort, updateProductList }) => {
    let [newProduct, setNewProduct] = useState<Product>({
        id: "",
        manufacturer: "",
        year: 0,
        model: "",
    });
    const [products, setProducts] = useState<Product[]>([]);
    const [creationSuccess, setCreationSuccess] = useState<boolean>(false);

    const navigate = useNavigate();
    const handleNavigateHome = () => {
        navigate("/");
    };

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                `http://localhost:${productsDBPort}/api/products`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProducts(data);
        }
        fetchData();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        const submittedProduct: Product = {
            id: (products.length + 1).toString(),
            manufacturer: data.get("manufacturer") as string,
            year: Number(data.get("year")),
            model: data.get("model") as string,
        };

        newProduct = submittedProduct;
        console.log("newProduct reassigned: ", newProduct);

        try {
            const response = await fetch(
                `http://localhost:${productsDBPort}/api/products/add`,
                {
                    method: "POST",
                    mode: "cors",
                    body: JSON.stringify({ newProduct }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            updateProductList();
            setNewProduct(submittedProduct);
            setCreationSuccess(true);
        } catch (error) {
            console.error("Error posting data:", error);
        }
    };

    return (
        <div className="create-product">
            <button className="go-to-main" onClick={handleNavigateHome}>
                X
            </button>
            <div className="create-product-form"></div>
            <h3>Create new product</h3>
            {creationSuccess ? (
                <>
                    <p>Product successfully added to the database!</p>
                    <h5>Manufacturer: {newProduct.manufacturer}</h5>
                    <h5>Year of Production: {newProduct.year}</h5>
                    <h5>Model: {newProduct.model}</h5>
                    <button
                        className="go-home-button"
                        onClick={handleNavigateHome}
                    >
                        Return
                    </button>
                </>
            ) : (
                <form className="create-product-from" onSubmit={handleSubmit}>
                    <div className="user-input">
                        <input
                            required
                            type="text"
                            name="manufacturer"
                            placeholder=" manufacturer"
                        />
                    </div>

                    <div className="user-input">
                        <input
                            required
                            type="text"
                            name="year"
                            placeholder="year of production"
                        />
                    </div>

                    <div className="user-input">
                        <input
                            required
                            type="text"
                            name="model"
                            placeholder="model"
                        />
                    </div>

                    <button className="submit-button">Submit</button>
                </form>
            )}
        </div>
    );
};
