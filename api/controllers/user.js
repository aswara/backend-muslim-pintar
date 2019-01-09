const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require('../../models/user');

const createToken = (id) => {
	return jwt.sign({
		id: id
	}, process.env.JWT_SECRET);
};

exports.register = (req, res) => {
	const { name, email, password } = req.body;
	User.find({ email })
	.exec()
	.then(user => {
		if (user.length >=1) {
			return res.status(409).json({message: "Email exists"});
		} else {
			bcrypt.hash(password, 10, (err, hash) =>{
				if (err) {
					return res.status(500).json({
						error: "Auth failed"
					});
				} else {
					new User({
						name,
						email,
						password: hash
					})
					.save()
					.then(result => {
		            	res.status(201).json({
		              		message: "User created",
		            	});
		          	})
		          	.catch(err => {
		            	res.status(500).json({
		              		error: err
		            	});
		          	});
				}
			});
		}
	})
};

exports.login = (req, res) => {
	const { email, password } = req.body;
  	User.find({ email })
    .exec()
    .then(user => {
     	if (user.length < 1) {
        	return res.status(401).json({
          		message: "Auth failed"
        	});
     	}
      	bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
         	return res.status(401).json({
            	message: "Auth failed"
          	});
        }
        if (result) {
        	const { name, email, photo, _id } = user[0];
          	const token = createToken(user[0].id);
          	return res.status(200).json({
            	token: token,
            	user: {
            		_id,
            		name,
            		email,
            		photo,
            	},
          	});
        }
        res.status(401).json({
         	message: "Auth failed"
        	});
      	});
    })
    .catch(err => {
      	res.status(500).json({
        error: err
     	});
    });
};

exports.profile = (req, res) => {
	const id = req.user.id;
	User.findById(id)
	.exec()
	.then(docs => {
		res.status(200).json(docs)
	})
	.catch(err => {
		res.status(500).json({error: err})
	})
}

//add point
exports.true = (req, res) => {
	const id = req.user.id;
	User.findById(id)
	.exec()
	.then(docs => {
		const point = Number(docs.point) + 10;
		User.updateOne({ _id: id}, { point })
		.then(result => {
			res.status(200).json({
				point,
				message: 'Success add point',
			})
		})
		.catch(err => {
			res.status(500).json({error: err})
		})
	})
	.catch(err => {
		res.status(500).json({error: err})
	})
}


//reduce point
exports.false = (req, res) => {
	const id = req.user.id;
	User.findById(id)
	.exec()
	.then(docs => {
		const point = Number(docs.point) - 10;
		User.updateOne({ _id: id}, { point })
		.then(result => {
			res.status(200).json({
				point,
				message: 'Success reduce point',
			})
		})
		.catch(err => {
			res.status(500).json({error: err})
		})
	})
	.catch(err => {
		res.status(500).json({error: err})
	})
}

//get level
const factor = 100;
function setLevel(point, currentLevel) {
	if (point < 0 && currentLevel != 0) return currentLevel -= 1; 
	if ((currentLevel * factor) <= point && point < (factor * (currentLevel + 1))) return currentLevel;
	return currentLevel += 1;
}

function getNewPoint(point, newLevel) {
	if (point < 0) return point += (factor * (newLevel + 1));
 	return point %= 100;
}

exports.level = (req, res) => {
	const id = req.user.id;
	User.findById(id)
	.exec()
	.then(docs => {
		const point = Number(docs.point);
		const currentLevel = Number(docs.level);
		const level = setLevel(point, currentLevel);
		const newPoint = getNewPoint(point, level);
		const treshold =  factor * (level + 1);

		res.status(200).json({
			level,
			newPoint,
			treshold
		});

	})
	.catch(err => {
		res.status(500).json({error: err})
	})
}