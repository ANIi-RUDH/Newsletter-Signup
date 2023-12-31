const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const firstName=req.body.fname;
  const secondName=req.body.lname;
  const eMail=req.body.mail;
  const data={
    members:[{
      emai_address:eMail,
      status:"subscribed",
      merge_fields:{
        FNAME:firstName,
        LNAME:secondName
      }
    }]
  };
  const jsonData=JSON.stringify(data);
  const url="https://us21.api.mailchimp.com/3.0/lists/d1da52b823";
  const options={
    method:"POST",
    auth:"anirudh:083eaed69cb97a3aba3f1571cd67dea2-us21"
  }
  const request= https.request(url,options,function(response){
    if(response.statuscode===200){
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
});

app.listen(process.env.PORT || 3000,()=>{
  console.log("--SERVER IS HOT--");
});
