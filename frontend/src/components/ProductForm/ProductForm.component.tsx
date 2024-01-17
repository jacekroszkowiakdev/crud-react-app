import React, { FormEvent } from "react";
import { useState, useEffect } from "react";
import { Product } from "../../model/model";
import "./ProductForm.styles.css";

export const ProductForm: React.FC<{ productsDBPort: number }> = ({
    productsDBPort,
}) => {
    const [newProduct, setNewProduct] = useState<Product | object>({});
    const [products, setProducts] = useState<Product[]>([]);

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
            console.log("fetched data: ", data);
        }
        fetchData();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setNewProduct((_prevProduct) => ({
            id: (products.length + 1).toString(),
            manufacturer: data.get("manufacturer"),
            year: Number(data.get("year")),
            model: data.get("model"),
        }));

        try {
            const response = await fetch(
                "http://localhost:3000/api/products/add",
                {
                    method: "POST",
                    mode: "cors",
                    body: JSON.stringify({ newProduct }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            );

            const json = await response.json();
            console.log(json.newProduct);
        } catch (error) {
            console.error("Error posting data:", error);
        }
    };

    return (
        <div className="create-product">
            <h3>Add New Product</h3>
            <form onSubmit={handleSubmit}>
                <div className="user-input">
                    <label>Manufacturer:</label>
                    <input
                        required
                        type="text"
                        name="manufacturer"
                        placeholder=" manufacturer"
                    />
                </div>

                <div className="user-input">
                    <label>Year:</label>
                    <input
                        required
                        type="number"
                        name="year"
                        placeholder="year of production"
                    />
                </div>

                <div className="user-input">
                    <label>Model:</label>
                    <input
                        required
                        type="text"
                        name="model"
                        placeholder="model"
                    />
                </div>

                <button>Submit</button>
            </form>
        </div>
    );
};
