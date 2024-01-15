import React, { useState } from "react";
import "./ProductCrudControl.styles.css";
import { Product } from "../../model/model";

export const ProductCrudControl: React.FC<{ products: Product[] }> = ({
    products,
}) => {
    const [newProduct, setNewProduct] = useState({
        manufacturer: "",
        year: "",
        model: "",
    });

    const handleAddProduct = () => {
        fetch("/api/products/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        })
            .then((response) => response.json())
            .then((data) => {
                // setProducts([...products, data]);
                setNewProduct({ manufacturer: "", model: "", year: "" });
            })
            .catch((error) => console.error("Error adding product:", error));
    };

    return (
        <div>
            <h2>Add New Product</h2>
            <div>
                <label>Manufacturer:</label>
                <input
                    type="text"
                    value={newProduct.manufacturer}
                    onChange={(e) =>
                        setNewProduct({
                            ...newProduct,
                            manufacturer: e.target.value,
                        })
                    }
                />
            </div>
            <div>
                <label>Year:</label>
                <input
                    type="text"
                    value={newProduct.year}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, year: e.target.value })
                    }
                />
            </div>
            <div>
                <label>Model:</label>
                <input
                    type="text"
                    value={newProduct.model}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, model: e.target.value })
                    }
                />
            </div>
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};
