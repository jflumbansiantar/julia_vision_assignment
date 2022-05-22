const { decryptPassword, tokenGenerator, tokenVerifier } = require("./helpers");

const fs = require('fs');

let rawdata = fs.readFileSync('user.json');
let user = JSON.parse(rawdata);

class controller {
    static async Login(req, res, next) {
        const { username, password } = req.body;
        try {

            if(username == undefined || password == undefined)  res.status(400).json({ status: 400, message: `Bad request`});
            
            user.forEach(data => {
                if (data.username !== username) {
                    res.status(404).json({
                        status: 404,
                        message: `User not found`,
                    });
                }

                if (decryptPassword(password, data.password)) {
                    const token = tokenGenerator(user);
    
                    res.status(200).json({
                        status: 200,
                        message: "Successfully logged in!",
                        username: data.username,
                        token: token,
                    });
                }
            })
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: `Internal Server Error`,
            });
        }
    };

    static async Public(req, res, next) {
        try {
            res.status(200).json({
                status: 200,
                message: "Public Area!",
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: `Internal Server Error`,
            });
        }
    };

    static async Private(req, res, next) {
        const { token } = req.headers;
        try {

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
            res.status(500).json({
                status: 500,
                message: `Internal Server Error`,
            });
        }
    };
}
module.exports = controller