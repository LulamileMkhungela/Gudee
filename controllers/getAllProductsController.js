const Product = require('../models/Product');
const User = require('../models/User');

const getAllProductsController = async (req,res) => {
    let r = []
    try{
        const products = await Product.find({})
        for (let product of products){
            const user = await User.findById(product._user_id, 'firstname lastname')
            const {firstname,lastname} = user;
            r.push({product_info : product, user_info : {firstname,lastname}})
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

    // Product.find({}, (error, data) => {
    //     // console.log(data)
    //     if (error){
    //         return res.status(404).json({
    //             err : true,
    //             msg : error
    //         })
    //     }else{
    //         let resp = []
    //         data.forEach((item,i) => {
    //             // console.log(item)
    //            User.findById(item._user_id, 'firstname lastname', (error, adventure) => {
    //                // console.log(adventure)
    //                 if (error) {
    //                     return res.status(500).json({
    //                         err: true,
    //                         msg: error.message
    //                     })
    //                 } else {
    //                     const {firstname, lastname} = adventure
    //                     r = {product_info : item, user_info : {firstname,lastname}}
    //
    //                 }
    //             })
    //         })
    //         return res.status(200).json({
    //             err : false,
    //             products : r
    //         })
    //     }
    // }).clone()

}

module.exports = getAllProductsController