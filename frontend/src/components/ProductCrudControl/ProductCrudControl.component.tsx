// import "./ProductCrudControl.styles.css";
// import React, { useEffect, useState } from "react";
// import { Product } from "../../model/model";

// export const ProductCrudControl: React.FC<{
//     productsDBPort: number;
// }> = ({ productsDBPort }) => {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [updatedProductData, setUpdatedProductData] =
//         useState<Partial<Product> | null>(null);
//     const [submittedProduct, setSubmittedProduct] = useState<Product | null>(
//         null
//     );

//     const handleEdit = (id: string) => {
//         const productToEdit = products.find((product) => product.id === id);
//         setUpdatedProductData(productToEdit ? { ...productToEdit } : null);
//     };

//     const submitEditedProductData = async () => {
//         try {
//             const response = await fetch(
//                 `http://localhost:${productsDBPort}/api/products/update/${
//                     updatedProductData?.id || ""
//                 }`,
//                 {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         updatedProduct: updatedProductData,
//                     }),
//                 }
//             );

//             if (!response.ok) {
//                 const errorMessage = await response.text();
//                 throw new Error(
//                     `Failed to update product. Status: ${response.status}. ${errorMessage}`
//                 );
//             }
//             fetchData();
//             setSubmittedProduct(
//                 updatedProductData
//                     ? {
//                           id: updatedProductData.id || "",
//                           manufacturer: updatedProductData.manufacturer || "",
//                           year: updatedProductData.year || 0,
//                           model: updatedProductData.model || "",
//                       }
//                     : null
//             );
//             setUpdatedProductData(null);
//         } catch (error) {
//             console.error("Error updating product:", error.message);
//         }
//     };

//     const handleCloseEdit = () => {
//         setUpdatedProductData(null);
//         setSubmittedProduct(null);
//     };

//     async function fetchData() {
//         const response = await fetch(
//             `http://localhost:${productsDBPort}/api/products`
//         );
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setProducts(data);
//         console.log("fetched data: ", data);
//     }

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleDelete = async (id: string) => {
//         try {
//             const response = await fetch(
//                 `http://localhost:${productsDBPort}/api/products/delete/${id}`,
//                 {
//                     method: "DELETE",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );
//             if (!response.ok) {
//                 const errorMessage = await response.text();
//                 throw new Error(
//                     `Failed to delete product. Status: ${response.status}. ${errorMessage}`
//                 );
//             }
//             fetchData();
//         } catch (error) {
//             console.error("Error deleting product:", error.message);
//         }
//     };

//     return (
//         <div className="edit-delete-products">
//             {products.map((product) => (
//                 <div className="product-card" key={product.id}>
//                     <div className="product-image-container">
//                         <img
//                             className="product-image"
//                             src={`../../public/images/${product.model}.jpg`}
//                             alt={`image of ${product.manufacturer} ${product.model}`}
//                         />
//                     </div>
//                     <div className="product-card-content">
//                         <h2>{product.manufacturer}</h2>
//                         <p>
//                             {product.model} ({product.year})
//                         </p>
//                         <span>
//                             Lorem ipsum dolor sit amet consectetur adipisicing
//                             elit. Incidunt, voluptatum laudantium
//                         </span>
//                     </div>
//                     {updatedProductData &&
//                     updatedProductData.id === product.id ? (
//                         <div>
//                             <div className="user-input">
//                                 <label>Manufacturer:</label>
//                                 <input
//                                     type="text"
//                                     value={updatedProductData.manufacturer}
//                                     onChange={(e) =>
//                                         setUpdatedProductData({
//                                             ...updatedProductData,
//                                             manufacturer: e.target.value,
//                                         })
//                                     }
//                                 />
//                             </div>

//                             <div className="user-input">
//                                 <label>Year:</label>
//                                 <input
//                                     type="number"
//                                     value={updatedProductData.year || ""}
//                                     onChange={(e) =>
//                                         setUpdatedProductData({
//                                             ...updatedProductData,
//                                             year: Number(e.target.value),
//                                         })
//                                     }
//                                 />
//                             </div>

//                             <div className="user-input">
//                                 <label>Model:</label>
//                                 <input
//                                     type="text"
//                                     value={updatedProductData.model}
//                                     onChange={(e) =>
//                                         setUpdatedProductData({
//                                             ...updatedProductData,
//                                             model: e.target.value,
//                                         })
//                                     }
//                                 />
//                             </div>

//                             <button onClick={submitEditedProductData}>
//                                 Submit
//                             </button>
//                             <button onClick={handleCloseEdit}>Close</button>
//                         </div>
//                     ) : (
//                         <div>
//                             <button
//                                 className="crud-button"
//                                 onClick={() => handleEdit(product.id)}
//                             >
//                                 Edit
//                             </button>
//                             <button
//                                 className="crud-button"
//                                 onClick={() => handleDelete(product.id)}
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             ))}
//             {submittedProduct && (
//                 <div>
//                     <h4>Product successfully updated!</h4>
//                     <h5>Manufacturer: {submittedProduct.manufacturer}</h5>
//                     <h5>Year of Production: {submittedProduct.year}</h5>
//                     <h5>Model: {submittedProduct.model}</h5>
//                     <button onClick={handleCloseEdit}>Close</button>
//                 </div>
//             )}
//         </div>
//         // <div className="edit-delete-products">
//         //     {products.map((product) => {
//         //         return (
//         //             <div className="product-card" key={product.id}>
//         //                 <div className="product-image-container">
//         //                     <img
//         //                         className="product-image"
//         //                         src={`../../public/images/${product.model}.jpg`}
//         //                         alt={`image of ${product.manufacturer} ${product.model}`}
//         //                     />
//         //                 </div>
//         //                 <div className="product-card-content">
//         //                     <h2>{product.manufacturer}</h2>
//         //                     <p>
//         //                         {product.model} ({product.year})
//         //                     </p>
//         //                     <span>
//         //                         Lorem ipsum dolor sit amet consectetur
//         //                         adipisicing elit. Incidunt, voluptatum
//         //                         laudantium
//         //                     </span>
//         //                 </div>
//         //                 <button
//         //                     className="addToFavorites-button"
//         //                     onClick={() => handleEdit}
//         //                 >
//         //                     Edit
//         //                 </button>
//         //                 <button
//         //                     className="addToFavorites-button"
//         //                     onClick={() => handleDelete(product.id)}
//         //                 >
//         //                     Delete
//         //                 </button>
//         //             </div>
//         //         );
//         //     })}
//         // </div>
//     );
// };

import "./ProductCrudControl.styles.css";
import React, { useEffect, useState } from "react";
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
        const productToEdit = products.find((product) => product.id === id);
        setUpdatedProductData(productToEdit ? { ...productToEdit } : null);
    };

    const submitEditedProductData = async () => {
        try {
            const response = await fetch(
                `http://localhost:${productsDBPort}/api/products/update/${
                    updatedProductData?.id || ""
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
                          id: updatedProductData.id || "",
                          manufacturer: updatedProductData.manufacturer || "",
                          year: updatedProductData.year || 0,
                          model: updatedProductData.model || "",
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

    useEffect(() => {
        fetchData();
    }, []);

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
                        updatedProductData?.id === product.id ? "editing" : ""
                    }`}
                    key={product.id}
                >
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
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Incidunt, voluptatum laudantium
                        </span>
                    </div>
                    {updatedProductData &&
                    updatedProductData.id === product.id ? (
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
                                    value={updatedProductData.model}
                                    onChange={(e) =>
                                        setUpdatedProductData({
                                            ...updatedProductData,
                                            model: e.target.value,
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
                                onClick={() => handleEdit(product.id)}
                            >
                                Edit
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(product.id)}
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
                    <h5>Model: {submittedProduct.model}</h5>
                    <button onClick={handleCloseEdit}>Close</button>
                </div>
            )}
        </div>
    );
};
