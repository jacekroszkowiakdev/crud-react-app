import "./ProductCrudControl.styles.css";
import React, { useEffect, useState, useCallback } from "react";
import { Product } from "../../model/model";

export const ProductCrudControl: React.FC<{
    productsDBPort: number;
}> = ({ productsDBPort }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [updatedProductData, setUpdatedProductData] =
        useState<Partial<Product> | null>(null);
    const [submittedProduct, setSubmittedProduct] = useState<Product | null>(
        null
    );

    const handleEdit = (id: string) => {
        const productToEdit = products.find(
            (product) => product.modelId === id
        );
        setUpdatedProductData(productToEdit ? { ...productToEdit } : null);
    };

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(
                `http://localhost:${productsDBPort}/api/products`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProducts(data);
            console.log("fetched data: ", data);
        } catch (error) {
            console.error("Error fetching product data:", error.message);
        }
    }, [productsDBPort]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const submitEditedProductData = async () => {
        try {
            const response = await fetch(
                `http://localhost:${productsDBPort}/api/products/update/${
                    updatedProductData?.modelId || ""
                }`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        updatedProduct: updatedProductData,
                    }),
                }
            );

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(
                    `Failed to update product. Status: ${response.status}. ${errorMessage}`
                );
            }

            // Refresh the data after successful update
            fetchData();
            setSubmittedProduct(
                updatedProductData
                    ? {
                          modelId: updatedProductData.modelId || "",
                          bikeModel: updatedProductData.bikeModel || "",
                          manufacturer: updatedProductData.manufacturer || "",
                          year: updatedProductData.year || 0,
                      }
                    : null
            );
            setUpdatedProductData(null);
        } catch (error) {
            console.error("Error updating product:", error.message);
        }
    };

    const handleCloseEdit = () => {
        setUpdatedProductData(null);
        setSubmittedProduct(null);
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(
                `http://localhost:${productsDBPort}/api/products/delete/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(
                    `Failed to delete product. Status: ${response.status}. ${errorMessage}`
                );
            }
            fetchData();
        } catch (error) {
            console.error("Error deleting product:", error.message);
        }
    };

    return (
        <div className="edit-delete-products">
            {products.map((product) => (
                <div
                    className={`product-card ${
                        updatedProductData?.modelId === product.modelId
                            ? "editing"
                            : ""
                    }`}
                    key={product.modelId}
                >
                    <div className="product-image-container">
                        <img
                            className="product-image"
                            src={`../../public/images/${product.bikeModel}.jpg`}
                            alt={`image of ${product.manufacturer} ${product.bikeModel}`}
                        />
                    </div>
                    <div className="product-card-content">
                        <h2>{product.manufacturer}</h2>
                        <p>
                            {product.bikeModel} ({product.year})
                        </p>
                        <span>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Incidunt, voluptatum laudantium
                        </span>
                    </div>
                    {updatedProductData &&
                    updatedProductData.modelId === product.modelId ? (
                        <div>
                            <div className="user-input">
                                <label>Manufacturer:</label>
                                <input
                                    type="text"
                                    value={updatedProductData.manufacturer}
                                    onChange={(e) =>
                                        setUpdatedProductData({
                                            ...updatedProductData,
                                            manufacturer: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="user-input">
                                <label>Year:</label>
                                <input
                                    type="number"
                                    value={updatedProductData.year || ""}
                                    onChange={(e) =>
                                        setUpdatedProductData({
                                            ...updatedProductData,
                                            year: Number(e.target.value),
                                        })
                                    }
                                />
                            </div>

                            <div className="user-input">
                                <label>Model:</label>
                                <input
                                    type="text"
                                    value={updatedProductData.bikeModel}
                                    onChange={(e) =>
                                        setUpdatedProductData({
                                            ...updatedProductData,
                                            bikeModel: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <button onClick={submitEditedProductData}>
                                Submit
                            </button>
                            <button onClick={handleCloseEdit}>Close</button>
                        </div>
                    ) : (
                        <div>
                            <button
                                className="edit-button"
                                onClick={() => handleEdit(product.modelId)}
                            >
                                Edit
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(product.modelId)}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ))}
            {submittedProduct && (
                <div>
                    <h4>Product successfully updated!</h4>
                    <h5>Manufacturer: {submittedProduct.manufacturer}</h5>
                    <h5>Year of Production: {submittedProduct.year}</h5>
                    <h5>Model: {submittedProduct.bikeModel}</h5>
                    <button onClick={handleCloseEdit}>Close</button>
                </div>
            )}
        </div>
    );
};
