export interface Product {
    id: string;
    manufacturer: string;
    year: number;
    model: string;
}

export interface ProductDetailProps {
    product: Product;
    addToFavorites: (product: Product) => void;
}
