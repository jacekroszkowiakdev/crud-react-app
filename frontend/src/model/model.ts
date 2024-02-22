export interface Product {
    modelId: string;
    bikeModel: string;
    manufacturer: string;
    year: number;
}

export interface ProductDetailProps {
    product: Product;
    addToFavorites: (product: Product) => void;
}
