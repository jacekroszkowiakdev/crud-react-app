import { createServer } from "http";
import { parse } from "url";
import { readFile, writeFile } from "fs/promises";

const PORT = process.env.PORT || 3000;

const readProducts = async () => {
    try {
        const data = await readFile("./api/db/products.json", "utf-8");
        const jsonData = JSON.parse(data);
        const products = jsonData.products;

        return products;
    } catch (error) {
        console.error("Error reading file:", error.message);
        throw new Error("Internal Server Error");
    }
};

const writeProducts = async (data) => {
    if (Object.keys(data).length === 0) {
        return console.error(
            "Error writing products to file: data object is empty"
        );
    }

    try {
        await writeFile(
            "./api/db/products.json",
            JSON.stringify({ products: data })
        );
    } catch (error) {
        console.error("Error writing products to file:", error.message);
        throw new Error("Internal Server Error");
    }
};

const server = createServer(async (req, res) => {
    const { pathname } = parse(req.url, true);

    if (pathname === "/api/products" && req.method === "GET") {
        try {
            const products = await readProducts();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(products));
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: error.message }));
        }
    } else if (pathname === "/api/products/add" && req.method === "POST") {
        try {
            let products = await readProducts();
            let data = "";

            req.on("data", (chunk) => {
                data += chunk;
            });

            req.on("end", async () => {
                const newProduct = JSON.parse(data).newProduct;

                if (!newProduct) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(
                        JSON.stringify({
                            error: "Invalid data format. Missing data in request body.",
                        })
                    );
                    return;
                }

                products.push(newProduct);
                await writeProducts(products);

                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ newProduct }));
            });
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: error.message }));
        }
    } else if (
        pathname.startsWith("/api/products/delete/") &&
        req.method === "DELETE"
    ) {
        try {
            const idToDelete = pathname.split("/").pop();

            if (!idToDelete) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(
                    JSON.stringify({
                        error: "Invalid data format. Missing product ID in request params.",
                    })
                );
                return;
            }

            let products = await readProducts();
            const indexToDelete = products.findIndex(
                (product) => product.id === idToDelete
            );

            if (indexToDelete === -1) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(
                    JSON.stringify({
                        error: "Product not found. Cannot delete non-existent product.",
                    })
                );
                return;
            }

            products.splice(indexToDelete, 1);
            await writeProducts(products);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify({
                    message: `Product with ID ${idToDelete} has been successfully deleted.`,
                })
            );
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: error.message }));
        }
    } else if (
        pathname.startsWith("/api/products/update/") &&
        req.method === "PUT"
    ) {
        try {
            const idToUpdate = pathname.split("/").pop();
            let data = "";

            req.on("data", (chunk) => {
                data += chunk;
            });

            req.on("end", async () => {
                const updatedProductData = JSON.parse(data).updatedProduct;

                if (!idToUpdate || !updatedProductData) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(
                        JSON.stringify({
                            error: "Invalid data format. Missing product ID or updated data in request.",
                        })
                    );
                    return;
                }

                let products = await readProducts();
                const indexToUpdate = products.findIndex(
                    (product) => product.id === idToUpdate
                );

                if (indexToUpdate === -1) {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(
                        JSON.stringify({
                            error: "Product not found. Cannot update non-existent product.",
                        })
                    );
                    return;
                }

                products[indexToUpdate] = {
                    ...products[indexToUpdate],
                    ...updatedProductData,
                };

                await writeProducts(products);

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                    JSON.stringify({
                        message: `Product with ID ${idToUpdate} has been successfully updated.`,
                        updatedProduct: products[indexToUpdate],
                    })
                );
            });
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: error.message }));
        }
    } else {
        // Handle other routes or methods
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Not Found" }));
    }
});

server.listen(PORT, () => {
    console.log(`DB 'products' running on PORT ${PORT}!`);
});
