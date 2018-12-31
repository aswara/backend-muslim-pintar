const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Category = require('../../models/category')

router.get('/', (req, res, next) => {
	Category.find()
		.exec()
		.then(docs => {
			res.status(200).json(docs)
		})
		.catch(err => {
			res.status(500).json({error: err})
		})
	
})


router.post('/', (req, res, next) => {
	const category = new Category({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name
	})
	category
		.save()
		.then(result => {
			res.status(201).json({
				message: 'Success add category',
				data : category
			})
		})
		.catch(err => {
			res.status(500).json({
				error: err
			})
		})
})

router.get("/:id", (req, res, next) =>{
	const id = req.params.id
	Category.findById(id)
		.exec()
		.then(doc => {
			if (doc) {
				res.status(200).json(doc)
			} else {
				res.status(404).json({message: 'No valid entry found for provided ID'})
			}
		})
		.catch(err =>{
			res.status(500).json({error : err})
		})
})

router.patch("/:id", (req, res, next) => {
	const id = req.params.id
	const newData = {
		name : req.body.name
	}

	Category.update(
		{_id: id },
		{ $set: newData  })
		.exec()
		.then(result => {
			res.status(200).json({
				message: "Success update",
				data : {
					_id : id,
					name : req.body.name
				}
			});
		})
		.catch(err => {
			res.status(500).json({
				message: "Failed update",
				error : err
			})
		})
})

router.delete("/:id", (req, res, next) => {
	const id = req.params.id
	Category.remove({ _id: id })
		.exec()
		.then(result => {
			res.status(200).json({
				message: "Success delete",
			});
		})
		.catch(err => {
			res.status(500).json({
				message: "Failed delete",
				error : err
			})
		})
})

module.exports = router