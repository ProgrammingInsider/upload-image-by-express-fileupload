import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload';
const app = express();

// Folders
import conn from './Db/db.js';
import router from './routes/route.js'



app.use(cors())
app.use(fileUpload({
   useTempFiles:true,
   createParentPath:true
}))
app.use(express.json()); 
app.use(express.urlencoded({extended:true}))

app.use("/",router)

app.listen(5000,()=>{
   console.log("Server is running on port 5000");
});