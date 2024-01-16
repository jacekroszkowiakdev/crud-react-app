import React, { useState } from "react";
import "./ProductCrudControl.styles.css";
import { Product } from "../../model/model";

export const ProductCrudControl: React.FC<{ products: Product[] }> = ({
    products,
}) => {
    const [newProduct, setNewProduct] = useState<Product>({
        id: 0,
        manufacturer: "",
        year: 0,
        model: "",
    });

    const handleAddProduct = () => {
        // fetch("/api/products/add", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(newProduct),
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setNewProduct({ id: 0, manufacturer: "", model: "", year: 0 });
        //         data = newProduct;
        //     })
        //     .catch((error) => console.error("Error adding product:", error));
    };

    const handleEdit = () => {
        // fetch update
    };

    const handleDelete = () => {
        // fetch delete
    };

    return (
        <div>
            <div className="create-product">
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
                        type="number"
                        value={newProduct.year}
                        onChange={(e) =>
                            setNewProduct({
                                ...newProduct,
                                year: e.target.value,
                            })
                        }
                    />
                </div>
                <div>
                    <label>Model:</label>
                    <input
                        type="text"
                        value={newProduct.model}
                        onChange={(e) =>
                            setNewProduct({
                                ...newProduct,
                                model: e.target.value,
                            })
                        }
                    />
                </div>
                <button onClick={handleAddProduct}>Add Product</button>
            </div>

            <div className="edit-delete-products">
                {products.map((product) => {
                    return (
                        <div className="product-card" key={product.id}>
                            <div className="product-image-container">
                                <img
                                    className="product-image"
                                    src={`../../public/images/${product.model}.jpg`}
                                    alt={`image of ${product.manufacturer} ${product.model}`}
                                />
                            </div>
                            <div className="product-card-content">
                                <h2>{product.manufacturer}</h2>
                                <p>
                                    {product.model} ({product.year})
                                </p>
                                <span>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Incidunt, voluptatum
                                    laudantium
                                </span>
                            </div>
                            <button
                                className="addToFavorites-button"
                                onClick={() => handleEdit}
                            >
                                Edit
                            </button>
                            <button
                                className="addToFavorites-button"
                                onClick={() => handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
