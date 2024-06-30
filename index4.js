import express from "express";
import bodyparser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 300;
var authorized=false;

app.use(bodyparser.urlencoded({extended:true}));

function checkpwd(req,res,next){
  const password=req.body["password"];
  if(password=="ILOVEPROGRAM"){
    authorized=true;
  }
  next();
}
app.use(checkpwd);

app.get("/",(req,res)=>{
  res.sendFile(__dirname + "/index.html");
});

app.post("/check",(req,res)=>{
  if(authorized){
    res.sendFile(__dirname + "/secret.html")
  }else{
    res.sendFile(__dirname + "/index.html")
  }
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
