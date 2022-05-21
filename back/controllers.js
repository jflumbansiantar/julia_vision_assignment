const { decryptPassword, tokenGenerator, tokenVerifier } = require("./helpers");

const fs = require('fs');

let rawdata = fs.readFileSync('user.json');
let user = JSON.parse(rawdata);

class controller {
    static async Login(req, res, next) {
        try {
            const { username, password } = req.body;

            if (user.username !== username) {
                res.status(404).json({
                    status: 404,
                    message: `User not found`,
                });
            }
            if (decryptPassword(password, user.password)) {
                const token = tokenGenerator(user);

                res.status(200).json({
                    status: 200,
                    message: "Successfully logged in!",
                    username: user.username,
                    token: token,
                });
            }
        } catch (error) {
            next(error);
        }
    };

    static async Public(req, res, next) {
        try {
            res.status(200).json({
                status: 200,
                message: "Public Area!",
            });
        } catch (error) {
            next(error);
        }
    };

    static async Private(req, res, next) {
        try {
            const { token } = req.headers;

            if(!token) {
                res.status(404).json({
                    status: 404,
                    message: "Token is not found!",
                });
            } else {
                const decoded = tokenVerifier(token);

                if (decoded.username === user.username) {
                    res.status(200).json({
                        status: 200,
                        message: "Token is decoded",
                        data: decoded
                    });            
                } else {
                    res.status(403).json({
                        status: 403,
                        message: "Unauthorized",
                    }); 
                }
            }
        } catch (error) {
            next(error);
        }
    };
}
module.exports = controller