const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { options } = require("request");
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.post("/",function(req,res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    var data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields:{
                    FNAME : firstName,
                    LNAME : lastName
                }

            }

        ]
    };

    const jasonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/02feef44e5";

    const options = {
        method : "POST",
        auth : "aman:cf7d58533425e2fd482bd5b397e8cdc7-us14"
    }


    const request = https.request(url, options, function(response){
        console.log(request);
        if(response.statusCode==200){
            res.sendFile(__dirname+ "/success.html")
        }else{
            res.sendFile(__dirname+ "/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));

        })
    })
    request.write(jasonData);
    request.end();
})

app.post("/failure",function(req,res){
    res.redirect("/")
})

app.get("/",function(req,res){
     res.sendFile(__dirname+ "/signup.html")
})



app.listen(process.env.PORT || 3000,function(){
    console.log("the server is up and running at port 3000")
});


// cf7d58533425e2fd482bd5b397e8cdc7-us14
// 