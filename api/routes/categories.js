const express = require('express')
const router = express.Router()

const CategoriesController = require('../controllers/categories')


router.get( '/', CategoriesController.get_all )

router.post('/', CategoriesController.create_category )

router.get("/:id", CategoriesController.get_category )

router.put("/:id", CategoriesController.update_category )

router.delete("/:id", CategoriesController.delete_category )

module.exports = router