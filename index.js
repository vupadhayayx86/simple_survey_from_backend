const express=require('express')
const app=express()
const mongoose=require('mongoose')
const user_route=require("./routes/users_route")
const cors=require('cors')



app.use(cors({
    origin:"https://surveyfrontend1.onrender.com/users",
    credentials:true,
}))

app.use((req, res, next) => {
  //header("Access-Control-Allow-Origin: http://origin.domain:port"); header("Access-Control-Allow-Credentials: true"); header("Access-Control-Allow-Methods: GET, POST"); header("Access-Control-Allow-Headers: Content-Type, *");
  
  res.header(
    "Access-Control-Allow-Credentials: true",
    "Access-Control-Allow-Origin:*",
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Methods: GET, POST",
    "Access-Control-Allow-Headers: Content-Type, *",
  );
  next();
});
app.use(express.json())
app.use("/users",user_route)


mongoose.connect("mongodb+srv://testuser:testuser123@cluster0.ynlelsn.mongodb.net/survey-data")
    .then(()=>console.log("Connection to mongoose server successfull"))
    .catch((error)=>console.log("Connection Failed",error))

app.listen(3000,()=>console.log("Backend server running on port 3000...."))