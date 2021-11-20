
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
  const firstName=req.body.fname;
  const lastName=req.body.lname;
  const email=req.body.email;
 console.log(req.body.password);
  const data = {
   members:[
     {
       email_address:email,
       status:"subscribed",
       merge_fields:{
         FNAME:firstName,
         LNAME:lastName,
       }
     }
   ]
 };

const jsonData=JSON.stringify(data);

const url="https://us5.api.mailchimp.com/3.0/lists/42e86050d1"
const options = {
  method:"POST",
  auth :"yash@:f7b5b2653912723b6f148cde4e948540-us5",
}

const request = https.request(url,options,function(response){

if(response.statusCode===200){
res.sendFile(__dirname+"/success.html");
}
else{
res.sendFile(__dirname+"/failure.html");
}

response.on("data",function(data){
  console.log(JSON.parse(data));
});
});

request.write(jsonData);
request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
})


app.listen(process.env.PORT || 3000,function(){
  console.log("server is up");
});

//api key
// f7b5b2653912723b6f148cde4e948540-us5
//aud id
//42e86050d1
