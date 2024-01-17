import React, { FormEvent } from "react";
import { useState } from "react";
import { Product } from "../../model/model";
import "./ProductForm.styles.css";

export const ProductForm: React.FC<{ products: Product[] }> = ({
    products,
}) => {
    const [newProduct, setNewProduct] = useState<Product | object>({});

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        setNewProduct((_prevProduct) => ({
            id: "11",
            manufacturer: data.get("manufacturer"),
            year: Number(data.get("year")),
            model: data.get("model"),
        }));

        // const testUploadData: Product = {
        //     id: "11",
        //     manufacturer: "TEST_PAYLOAD",
        //     year: 2022,
        //     model: "TEST_PAYLOAD",
        // };

        // CLEAN UP AFTER THE WORK ON POST IS FINISHED:
        console.log("data: ", data);
        console.log("newProduct: ", JSON.stringify(newProduct));
        console.log("products updated: ", products);

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
