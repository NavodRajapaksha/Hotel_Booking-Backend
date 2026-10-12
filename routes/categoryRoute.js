import express from 'express'
import { 
    createCategory, 
    deleteCategory, 
    getAllCategories, 
    getCategoryByName, 
    updateCategory } from '../controllers/categoryController.js'

const CategoryRouter = express.Router()

CategoryRouter.post("/", createCategory)
CategoryRouter.delete("/:name", deleteCategory)
CategoryRouter.get("/", getAllCategories)
CategoryRouter.get("/:name", getCategoryByName)
CategoryRouter.put("/:name", updateCategory)

export default CategoryRouter;