const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

//conversation
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

const ProductAPI = require('./routes/ProductAPI');
const authProduct = require('./routes/Products');
const fileRoutes = require('./routes/file-upload-routes');
const sellerRoutes = require('./routes/SellerRoutes');
const profileRoutes = require('./routes/ProfileRoutes');

const PORT = process.env.PORT || 5000;
const app = express();

require('./config/db')();
require('dotenv').config();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());
app.use(fileUpload({
  useTemplate: true
}));

app.use('/api', fileRoutes.routes);
app.use('/api', sellerRoutes.routes);
app.use('/api', profileRoutes.routes)

//chatconnection check

app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);


app.use("/api/auth/", require("./routes/auth"));
//app.use("/app/",require("./routes/routes"))
//app.use("/api/",require("./routes/private"));

app.use('/user', require('./routes/userRouter'));
//app.use("/api/",authProduct);
//app.use('/api/image', ProductAPI);

app.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`);
});