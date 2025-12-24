const jwt = require('jsonwebtoken');
module.exports.tokenVerify =
  (roles = []) =>
  (req, res, next) => {
    try {
      const authToken = req.headers;
      const authHeader = authToken.authorization;
      const token = authHeader.split(' ')[1];
      if (!token) {
        return res.status(403).json({ message: 'authentication failed .!' });
      }
      const key = 'cmnksacnksncksdv';
      jwt.verify(token, key, (error, user) => {
        if (error) {
          console.log(error);
          return res.status(403).json({ message: 'authentication failed .!' });
        }
        console.log(user);
        if (roles.length && !roles.includes(user.role)) {
          return res.status(403).json({ message: 'Forbidden ' });
        }
      });

      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
