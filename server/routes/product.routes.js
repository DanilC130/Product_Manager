const products = require('../controllers/product.controller');


module.exports = (app) => {
    app.get("/api/products/", products.findAllProducts);
    app.get("/api/products/random", products.findRandomProduct);
    app.get("/api/products/:id", products.findOneProductById);
    app.post("/api/products/", products.createNewProduct);
    app.put("/api/products/:id", products.findProductAndUpdate);
    app.delete("/api/products/:id", products.findOneProductAndDelete);
}