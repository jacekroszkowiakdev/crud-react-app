import "./ProductList.styles.css";
import React, { useEffect, useState } from "react";
import { Product } from "../../model/Product.model";
import { ProductDetails } from "../ProductDetails/ProductDetails.component";

export const ProductList: React.FC<{ products: Product[] }> = ({
    products,
}) => {
    const [uniqueManufacturers, setUniqueManufacturers] = useState<string[]>(
        []
    );
    const [uniqueModels, setUniqueModels] = useState<string[]>([]);
    const [uniqueYears, setUniqueYears] = useState<number[]>([]);
    const [sorted, setSorted] = useState<Product[]>([]);
    const [selectedFilterProperty, setSelectedFilterProperty] = useState<
        "" | keyof Product
    >("");
    const [filtered, setFiltered] = useState<Product[]>([]);
    const [favorites, setFavorites] = useState<Product[]>([]);
    const [renderFavorites, setRenderFavorites] = useState<boolean>(false);

    useEffect(() => {
        if (products) {
            const filteredAndSortedManufacturers = filterUniqueValues<string>(
                products,
                "manufacturer"
            ).sort((a, b) => a.localeCompare(b));

            setUniqueManufacturers(filteredAndSortedManufacturers);

            const filteredAndSortedModels = filterUniqueValues<string>(
                products,
                "bikeModel"
            ).sort((a, b) => a.localeCompare(b));

            setUniqueModels(filteredAndSortedModels);

            const filteredAndSortedYears = filterUniqueValues<number>(
                products,
                "year"
            );

            setUniqueYears(filteredAndSortedYears);
        }
    }, [products]);

    const addToFavorites = (product: Product) => {
        const favoriteProducts = [...favorites, product];
        setFavorites(favoriteProducts);
        localStorage.setItem("favorites", JSON.stringify(favoriteProducts));
    };

    const savedFavoriteProducts = localStorage.getItem("favorites");

    const handleShowFavorites = () => {
        if (favorites.length > 0) {
            setRenderFavorites(!renderFavorites);
        }
    };

    function filterUniqueValues<T>(
        products: Product[],
        productKey: keyof Product
    ): T[] {
        return [
            ...new Set(products.map((product) => product[productKey] as T)),
        ];
    }

    const handleSort = () => {
        const sortedProducts = products.toSorted((a, b) =>
            a.manufacturer.localeCompare(b.manufacturer)
        );
        setSorted(sortedProducts);
        setFiltered([]);
    };

    const handleFilter = (filterValue: string | number) => {
        // Check if the value is present in the object
        if (selectedFilterProperty === "") {
            return;
        }
        if (
            products.some(
                (item) => Object.values(item).includes(filterValue)
                // String(item[selectedFilterProperty]) === String(filterValue)
            )
        ) {
            const filteredProducts = products.filter(
                (item) => Object.values(item).includes(filterValue)
                // String(item[selectedFilterProperty]) === String(filterValue)
            );
            setFiltered(filteredProducts);
            setSorted([]);
        }
    };

    const handleFilterPropertyChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedFilterProperty(event.target.value as keyof Product);
    };

    return (
        <div className="products-section">
            <div className="check-bikes-or-favorites">
                {savedFavoriteProducts &&
                JSON.parse(savedFavoriteProducts).length > 0 ? (
                    <h3>
                        <button onClick={handleShowFavorites}>
                            Check your favorites
                        </button>
                    </h3>
                ) : (
                    <h3>Check The Bikes</h3>
                )}
            </div>

            <div className="products-display-options">
                <button onClick={handleSort}>sort products A - Z</button>

                <button onClick={() => handleFilter(selectedFilterProperty)}>
                    Filter by Model:
                </button>
                <label>
                    <select
                        value={selectedFilterProperty}
                        onChange={handleFilterPropertyChange}
                    >
                        <option value=""></option>
                        {uniqueModels.map((model) => (
                            <option key={model} value={model}>
                                {model}
                            </option>
                        ))}
                    </select>
                </label>
                <button onClick={() => handleFilter(selectedFilterProperty)}>
                    Filter by Manufacturer
                </button>
                <label>
                    <select
                        value={selectedFilterProperty}
                        onChange={handleFilterPropertyChange}
                    >
                        <option value=""></option>
                        {uniqueManufacturers.map((manufacturer) => (
                            <option key={manufacturer} value={manufacturer}>
                                {manufacturer}
                            </option>
                        ))}
                    </select>
                </label>
                {/* //double tilde to transform property into Number */}
                <button onClick={() => handleFilter(~~selectedFilterProperty)}>
                    Filter by Year of Production
                </button>
                <label>
                    <select
                        value={selectedFilterProperty}
                        onChange={handleFilterPropertyChange}
                    >
                        <option value=""></option>
                        {uniqueYears.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            {/* render the product stored in the favorites */}
            <div className="favorites-container">
                {renderFavorites &&
                    favorites.map((product) => (
                        <ProductDetails
                            key={product.modelId}
                            product={product}
                            addToFavorites={addToFavorites}
                        />
                    ))}
            </div>
            <div className="products-container">
                {filtered.map((product) => {
                    return (
                        <ProductDetails
                            product={product}
                            addToFavorites={addToFavorites}
                        />
                    );
                })}

                {sorted.map((product) => {
                    return (
                        <ProductDetails
                            product={product}
                            addToFavorites={addToFavorites}
                        />
                    );
                })}
            </div>
            {/* Render all products form the data base on page load */}
            {sorted.length === 0 && filtered.length === 0 && (
                <div className="products-container">
                    {products.map((product) => {
                        return (
                            <ProductDetails
                                product={product}
                                addToFavorites={addToFavorites}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};
