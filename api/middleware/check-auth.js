const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

module.exports = (req, res, next) => {
	try {
		const authHeader = req.get('Authorization');
		const token = authHeader.split(' ')[1];
		const decoded = jwt.verify(token, jwtConfig.secret);
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({
			message: 'Auth failed'
		});
	}
};