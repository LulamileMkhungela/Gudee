const dotenv = require('dotenv');
dotenv.config();

const productsData = require('./data/data');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_ACCESS, ()=>console.log("database connected succssfully"));

const Product = require('./models/Product');


const importData = async ()=>{
    try {
        await Product.deleteMany({});

        await Product.insertMany(productsData);
        console.log("Data import success");
        process.exit();
        
    } catch (error) {
     console.error("error with data import");
     process.exit(1);  
    }
    importData();
};
