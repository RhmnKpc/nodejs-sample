//login,register,forgotPassword
let jwt = require('jsonwebtoken');
let config = require('config');
const bcrypt = require('bcrypt');
var User = require('../../domain/models/User');

function login(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({ email: email }).then(user => {
        if (!user) {
            res.status(400)
                .json(failedLogin);
        } else {
            if (bcrypt.compareSync(password, user.password)) {
                res.status(200)
                    .json(successLogin(user));

            } else {
                res.status(400)
                    .json(failedLogin);
            }
        }
    });
}//login end

function register(req, res,roles) {
    let user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        roles:roles,
        updated_at: Date.now()
    });

    user.save(function (err) {
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

}//register end

function forgotPassword(req, res) {
    res.status(200).json({
        success: true,
        message: "To Soon"
    });
}//forgotPassword end

const failedLogin = {
    success: false,
    message: "Incorrect username or password"
}
function successLogin(user) {
    let token = jwt.sign({ id: user.id,roles:user.roles },
        config.secret, { expiresIn: config.expires });
    return {
        success: true,
        message: "Successfull",
        accessToken:token
    };
}

module.exports = {
    login, register, forgotPassword
}