export interface Product {
    id: number;
    manufacturer: string;
    year: number;
    model: string;
}

export interface ProductDetailProps {
    product: Product;
    addToFavorites: (product: Product) => void;
}
