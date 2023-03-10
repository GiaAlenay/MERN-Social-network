import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer";
import helmet from "helmet"
import path from "path"
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/post.js";
import routes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRouter from "./routes/post.js";

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename);
dotenv.config()
const app=express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use("/assets",express.static(path.join(__dirname, 'public/assets')))

//file storage

const storage=multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,"public/assets")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload=multer({storage})

app.post("/auth/register", upload.single("picture"),register)
app.post("/posts",upload.single("picture"),createPost)


app.use("/auth", routes)
app.use("/users",userRoutes)
app.use("/posts",postRouter)

const PORT=process.env.PORT || 6001

mongoose.connect('mongodb://localhost/prototype',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    app.listen(PORT,()=>console.log(`Server Port: ${PORT}`))

}).catch((e)=>{
    console.log(`${e} did not connection`)
})