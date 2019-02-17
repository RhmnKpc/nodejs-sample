let router = require('express').Router();
const AuthControlller = require('../api/controller/AuthControlller');
const { check, validationResult } = require('express-validator/check');
var User = require('../domain/models/User');

router.post('/login', [
    check('email').isEmail(),
    check('password').not().isEmpty()
]
    , (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return AuthControlller.login(req, res);
    });

router.post('/register', [
    check('email').isEmail().custom(value => {
        return User.findOne({ email: value }).then(user => {
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        })
    }),
    check('password').isLength({ min: 6 }),
    check('firstName').not().isEmpty(),
    check('lastName').not().isEmpty()

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    AuthControlller.register(req, res,"USER");
});

router.route('/forgotPassword')
    .post(AuthControlller.forgotPassword);


module.exports = router;