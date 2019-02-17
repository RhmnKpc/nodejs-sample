var Product = require('../../domain/models/Product');

function productList(req, res, next) {
    getAll()
        .then(products => res.json(products))
        .catch(err => next(err));
}
function getProductById(req, res, next) {
    getById(req.params.productId)
        .then(product => res.json(product))
        .catch(err => next(err));
}

async function createProduct(req, res, next) {
    let product = new Product({
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        updated_at: Date.now()
    });

    product.save(function (err) {
        if (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Internal Error"
            });
        } else {
            res.status(201).json({
                success: true,
                message: "Successfull"
            });
        }
    });
}

async function updateProductById(req, res, next) {
    var newProduct={
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        updated_at: Date.now()
    }
    Product.findOneAndUpdate(req.params.productId, { $set: newProduct }, function (err, result) {
        if (err) {
            next(err);
        } else {
            res.status(200).json({
                message: "Successful"
            })
        }

    });
}
async function deleteProductById(req, res, next) {
    Product.findOneAndDelete(req.params.productId)
        .then(res.status(200).json({ message: "Successful" }))
        .catch(err => next(err));
}
async function getAll() {
    var productList = Product.find()
    return productList;
}
async function getById(id) {
    return Product.findById(id);
}

module.exports = {
    productList, getProductById, updateProductById, deleteProductById, createProduct
};