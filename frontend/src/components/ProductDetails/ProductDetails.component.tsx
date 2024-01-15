import React from "react";
import "./ProductDetails.styles.css";
import { ProductDetailProps } from "../../model/model";

export const ProductDetails: React.FC<ProductDetailProps> = ({
    product,
    addToFavorites,
}) => {
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Incidunt, voluptatum laudantium
                </span>
            </div>
            <button
                className="addToFavorites-button"
                onClick={() => addToFavorites(product)}
            >
                favorite
            </button>
        </div>
    );
};
