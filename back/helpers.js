const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRound = 10;
const secretKey = "komodo";

const encryptPassword = (password) => bcrypt.hash(password, saltRound);
const decryptPassword = (password, userPassword) =>
  bcrypt.compare(password, userPassword);

  
  const tokenGenerator = (user) => {
      const { username } = user;
      
      return jwt.sign(
            {
              username,
            },
            secretKey
            );
        };
        
        const tokenVerifier = (token) => {
            return jwt.verify(token, secretKey);
        };
        
module.exports = {
    encryptPassword,
    decryptPassword,
    tokenGenerator,
    tokenVerifier,
};
