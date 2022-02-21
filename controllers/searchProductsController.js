const Product = require('../models/Product');
const User = require("../models/User");

const searchProductsController = async (req,res) => {

    let r = []

    try{
        const products = await Product.find({'category' : req.body.category})

        for (let product of products){
            const user = await User.findById(product._user_id, 'firstname lastname')

            r.push({product_info : product, user_info : user})
        }
        return res.status(200).json({
            err : false,
            r
        })
    }catch (e) {
        return res.status(500).json({
            err : true,
            msg : e.message
        })
    }


    // Product.find({'category' : req.body.category}, (e, d) => {
    //     if (e){
    //         return res.status(404).json({
    //             err : true,
    //             msg : e
    //         })
    //     }else{
    //         let resp = []
    //         d.forEach((item, i)=> {
    //             User.findById(item._user_id, 'firstname lastname', (error,adventure) => {
    //                 if (error){
    //                     return res.status(500).json({
    //                         err : true,
    //                         msg : error.message
    //                     })
    //                 }else{
    //                     const {firstname,lastname} = adventure
    //                     console.log({
    //                         product_info : item,
    //                         user_info : {firstname,lastname}
    //                     })
    //                     resp[i] = {product_info : item, user_info : {firstname,lastname}}
    //                 }
    //             })
    //         })
    //
    //         return res.status(200).json({
    //             err : false,
    //             products : resp
    //         })
    //
    //     }
    //
    // })
}

module.exports = searchProductsController