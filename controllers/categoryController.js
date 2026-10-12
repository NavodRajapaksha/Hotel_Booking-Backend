import Category from "../models/category.js";

export function createCategory(req, res){

    if(req.user == null){
        res.status(401).json({ 
            message: "Unauthorized" 
        })
        return
    }
    if(req.user.role !== "admin"){
        res.status(403).json({ 
            message: "Forbidden" 
        })
        return
    }
    const newCategory = new Category(req.body)
    newCategory.save().then(
        (result)=>{
            res.status(201).json({
                message: "Category created successfully",
                result: result
            })
        }
    ).catch(
        (err)=>{
            res.status(500).json({
                message: "Error creating category",
                error: err
            })
        }
    )
        
}

// Delete category by name
export function deleteCategory(req, res) {
    if(req.user == null){
        res.status(401).json({ 
            message: "Unauthorized" 
        })
        return
    }
    if(req.user.role !== "admin"){
        res.status(403).json({ 
            message: "Forbidden" 
        })
        return
    }
    const name = req.params.name
    Category.findOneAndDelete({ name: name }).then(
        (result)=>{
            if(!result){
                res.status(404).json({
                    message: "Category not found"
                })
                return
            }
            res.status(200).json({
                message: "Category deleted successfully",
                result: result
            })
        }
    ).catch(
        (err)=>{
            res.status(500).json({
                message: "Error deleting category",
                error: err
            })
        }
    )
}

export function getAllCategories(req, res) {
    Category.find().then(
        (result)=>{
            res.status(200).json(
                {
                    categories: result
                }
            )
        }
    ).catch(
        (err)=>{
            res.status(500).json({
                message: "Error fetching categories",
                error: err
            })
        }
    )
}

export function getCategoryByName(req, res) {
    const name = req.params.name
    Category.findOne({ name: name }).then(
        (result)=>{
            if(!result){
                res.status(404).json({
                    message: "Category not found"
                })
                return
            } else {
                res.status(200).json({
                    category: result
                })
            }   
        }   
    ).catch(
        (err)=>{
            res.status(500).json({
                message: "Error fetching category",
                error: err
            })
        }
    )
}

export function updateCategory(req, res) {
    if(!isAdminValid(req)){
        res.status(403).json({
            message: "Forbidden"
        })
        return
    }

    const name = req.params.name;

    Category.updateOne({ name: name }, req.body).then(
        ()=>{
            res.status(200).json({
                message: "Category updated successfully"
            })
        }
    ).catch(
        (err)=>{
            res.status(500).json({
                message: "Error updating category",
                error: err
            })
        }
    )
}

function isAdminValid(req){
    if(req.user == null){
        return false
    }
    if(req.user.role !== "admin"){
        res.status(403).json({ 
            message: "Forbidden" 
        })
        return false
    }
    return true
}