const mongoose = require ('mongoose')


const CartSchema = new mongoose.Schema({

UserID:{
       type:String,
       required:true,
       unique:true
},
Product:[{
    ProductId:{
    type:String,
    },
    quantity:{
        type:number,
        default:1
        }
}],


date:{
    type:Date,
    default:Date.now
}

})
module.exports= mongoose.model('Cart',Cartchema)