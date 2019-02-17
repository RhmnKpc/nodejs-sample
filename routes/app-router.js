let router = require('express').Router();
let jwtTokenFillter = require('../security/filter/JwtTokenFilter');
var home = require('../api/controller/HomeController');
var ProductController = require('../api/controller/ProductController');
const { check, validationResult } = require('express-validator/check');

router.use(jwtTokenFillter.doFilter);

router.route('/home')
    .get(home.home);

router.get('/products', ProductController.productList);

router.post('/products', [
    check('name').not().isEmpty()
]
    , (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return ProductController.createProduct(req, res, next);
    });

router.put('/products/:productId/', [
    check('name').not().isEmpty()
]
    , (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return ProductController.updateProductById(req, res, next);
    });

router.route('/products/:productId/')
    .get(ProductController.getProductById)
    .delete(ProductController.deleteProductById);


module.exports = router;