const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require('../../models/admin');

const createToken = (id) => {
	return jwt.sign({
		id: id
	}, process.env.JWT_SECRET);
};

exports.profile = (req, res) => {
	const id = req.user.id;
	Admin.findById(id)
	.exec()
	.then(docs => {
		res.status(200).json(docs)
	})
	.catch(err => {
		res.status(500).json({error: err})
	})
};

exports.register = (req, res) => {
	const { username, password } = req.body;
	Admin.find({ username })
	.exec()
	.then(user => {
		if (user.length >=1) {
			return res.status(409).json({message: "Username exists"});
		} else {
			bcrypt.hash(password, 10, (err, hash) =>{
				if (err) {
					return res.status(500).json({
						error: "Auth failed"
					});
				} else {
					new Admin({
						username,
						password: hash
					})
					.save()
					.then(result => {
		            	res.status(201).json({
		              		message: "Admin created",
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
	const { username, password } = req.body;
  	Admin.find({ username })
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
        	const { username, _id } = user[0];
          	const token = createToken(user[0].id);
          	return res.status(200).json({
            	token: token,
            	user: {
            		_id,
            		username
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