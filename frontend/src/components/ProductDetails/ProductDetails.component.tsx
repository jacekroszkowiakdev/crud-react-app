import React from "react";
import "./ProductDetails.styles.css";
import { ProductDetailProps } from "../../model/Product.model";

export const ProductDetails: React.FC<ProductDetailProps> = ({
    product,
    addToFavorites,
}) => {
    return (
        <div className="product-card" key={product.modelId}>
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
                    {product.bikeModel} {product.year}
                </p>
                <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Incidunt, voluptatum laudantium
                </span>
            </div>
            <button
                className="addToFavorites-button"
                onClick={() => addToFavorites(product)}
            >
                <span>❤️️</span>
            </button>
        </div>
    );
};
