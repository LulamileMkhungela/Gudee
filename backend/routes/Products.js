const express = require('express');

const router = express.Router();
const ProductCopy = require('../models/Product')

//add products to the database or CREATE
router.post('/products', async (req,res)=>{

    const newProduct=  await new  ProductCopy({

        title:req.body.title,
        img:req.body.img,
        categories:req.body.categories,
        price :req.body.price
     
    });
    
   

try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
    
} catch (error) {
    res.status(500).json(error);
}



})


//PRODUCTS
router.get('/find/:id', async(req,res)=>{
    try {
const products= await ProductCopy.findById(req.params.id);
req.status(200).json(products);
    }
    catch (error) {
        res.status(500).json(error);
    }


})







 //Get All  Products 
 router.get('/', async(req,res)=>{
  const qNew = req.query.new;
  const  qCategory = req.query.category;

  try {
      let products;
      if(qNew){
          products = await ProductCopy.find().sort({createdAt:-1}).limit(5);
      }
      else if(qCategory) {
          products= await ProductCopy.find({categories:{$in:[qCategory],
        },
        });
    }
        else
        {
            products= await ProductCopy.find();
        }
    
        res.status(200).json(products);
      
    
    
} 
catch (error) {
    res.status(500).json(error);
}



 })
















module.exports = router