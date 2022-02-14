const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


const ProductAPI = require('./routes/ProductAPI');
const authProduct= require('./routes/Products');
const fileRoutes = require('./routes/file-upload-routes');
const SellerRoutes = require('./routes/SellerRoutes');

const PORT= process.env.PORT || 5000;
const app = express();

require('./config/db')();
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', fileRoutes.routes);
app.use('/api', SellerRoutes.routes);
//app.use("/api/auth/",require("./routes/auth"));
//app.use("/app/",require("./routes/routes"))
//app.use("/api/",require("./routes/private"));
app.use('/user', require('./routes/userRouter'));
//app.use("/api/",authProduct);
//app.use('/api/image', ProductAPI);

app.listen(PORT, ()=>  {
  console.log(`server is up and running on port ${PORT}`);
});

/*process.on("unhandledRejection",(err,promise)=>{
  console.log(`Logged Error:${err}`);
  app.close(()=>process.exit(1));
});*/