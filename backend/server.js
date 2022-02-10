
const authProduct= require('./routes/Products');


const express = require('express');
const app = express();
  const mongoose = require('mongoose');
const dotenv =require('dotenv');
 //const errorHandler = require('./middleware/error');

 const fileUppload =require('express-fileupload');

app.use("/",fileUppload({useTempFiles:true}))





//  app.use("/api/auth/register", (req,res)=>{

//   res.send('molapo');
//    });

 const PORT= process.env.PORT || 5000;

// const routesUrls = require('./routes/routes')
// const routesUSer = require('./routes/userLogin')
//  const routesFacebook = require('./routes/auth')
//   const passport = require('passport')
//   const path = require('path')

  // const multer = require('multer')
  // const storage =multer.diskStorage({
  //   destination: (req,file, cb)=>{
  //     cb(null,'../images')
  //   },
  //   __filename: (req,file,cd)=>{
  //     console.log(file)
  //     cb(null, Date.now + path.extname(file.originalname))
  //   }
  // })

// //   const cookieSession = require('cookie-session')
// const upload = multer({storage:storage})
// const cors =require('cors')
// app.get("/upload", (request,response)=>{
//   response.render("upload")
// })
// app.get("/upload",upload.single('image'), (request,response)=>{
//   response.send("image is uploaded")
// })

 
dotenv.config();


mongoose.connect(process.env.DATABASE_ACCESS, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => {
  console.log('Database connected successfully')
})
.catch(err => {
  console.log(err)
})

app.use(express.json());

// app.use(passport.initialize());
//   app.use(passport.session());

// app.use(
//     cookieSession({ name: "session", keys: ["molapo"], maxAge: 24 * 60 * 60 * 100 })
//   );

// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
// }));


app.use("/api/auth/",require("./routes/auth"));
//app.use("/app/",require("./routes/routes"))
  app.use("/api/",require("./routes/private"));
  app.use('/user', require('./routes/userRouter'));
  app.use("/api/",authProduct);
// app.use("/api/",require("./routes/upload"));

// Error handler should be the last piece of middleware
//app.use(errorHandler)

// app.use('/app',routesUrls)
// app.use('/app',routesUSer)
//  app.use('/auth',routesFacebook)
const server= app.listen(PORT, ()=>console.log(`server is up and running on port ${PORT}`));

 process.on("unhandledRejection",(err,promise)=>{
 console.log(`Logged Error:${err}`);
 server.close(()=>process.exit(1));

 });