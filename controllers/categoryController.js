import categoryModel from "../models/categoryModel.js";


class CategotyController{
    static getAllCategories= async (req,res) =>{
        try{
            const fetchAllCategories = await categoryModel.find({})
            return res.status(200).json(fetchAllCategories)
        }catch(error){
            return res.status(404).json({message: error.message})
        }
    }
    static addNewCategory = async (req,res) =>{
        const {title}= req.body;
        try{
            if(title){
                const newCategory = new categoryModel({
                    title,
                })
                const savedCategory = await newCategory.save()
                if(savedCategory){
                    return res.status(200).json({message: "category added successfully"})
                }
            }else{
                return res.status(400).json({message: "all fields are required"});
            }
        }catch(error){
            return res.status(404).json({message: error.message})
        }
    }

}

export default CategotyController