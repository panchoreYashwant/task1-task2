var mongoClient = require("mongodb").MongoClient;
var express = require("express");
var url = "mongodb://127.0.0.1:27017";
var app = express();
var cors = require("cors");
var cron = require("node-cron")

app.use(cors())
var bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({
    extended : true
}));



                        app.get("/getUser", function(req, res){
                            mongoClient.connect(url, function(err, clientObj){
                                if(!err) {
                                    var database = clientObj.db("ckndb");
                                    database.collection("task").find().toArray(function (err, documents){
                                        if(!err) {
                                            res.send(documents);
                                            console.log("Get User")
                                        }
                                    })
                                }
                            })
                        });

                        app.post("/addUser",function(req,res){
                            mongoClient.connect(url,function(err,clientObj){
                                if(!err){
                                
                                    var db = clientObj.db("ckndb");
                                   console.log(req.body.name)
                                    db.collection("task").insertOne(req.body,
                                    function(err,result){debugger
                                        if(!err){
                                        console.log("User Inserted ")
                                        res.send('User inserted')
                                        }else{
                                            res.send(err.message)
                                        }

                                    })
                                    
                                }
                            })
                        })


                        app.delete("/deleteUser/:id",function(req,res){
                            mongoClient.connect(url,function(err,clientObj){
                                if(!err){
                                    var db = clientObj.db("ckndb");
                                    var Id = req.params.id;
                                    console.log(Id)
                                    db.collection("task").deleteOne({"_id": ObjectId(Id)}).then(function(result,err){
                                        if(!err){
                                            console.log("User Delete")
                                            res.send("USer Delete")
                                        }else{
                                            console.log("Delete Method Not Working")
                                            res.send("Delete Method Not Working")
                                        }
                                    })
                                }
                            })
                        })


                        app.put("/updateUser/:id",function(req,res){
                            mongoClient.connect(url,function(err,clientObj){
                                if(!err){
                                    var Id = req.params.id;
                                    var db = clientObj.db("ckndb");
                                    console.log(req.body)
                                    db.collection("task").updateOne({"_id":new ObjectId(Id)},{$set:req.body}).then(resp=>{
                                        console.log("update User ById update")
                                        res.send("updateUSer ById update")
                                    },err=>{
                                        console.log("Not Change Border")
                                        res.send("Not Change Border")
                                    })
                                }
                            })
                        })

                        app.put("/updateAssign/:id",function(req,res){
                            mongoClient.connect(url,function(err,clientObj){
                                if(!err){
                                    var Id = req.params.id;
                                    var db = clientObj.db("ckndb");
                                    console.log(req.body)
                                    db.collection("task").updateOne({"_id":new ObjectId(Id)},{$set:req.body}).then(resp=>{
                                        console.log("work assign")
                                        res.send("work assign")
                                    },err=>{
                                        console.log("work")
                                        res.send("Not Change Bordework ")
                                    })
                                }
                            })
                        })

                        app.post("/loginUser",function(req,res){
                            mongoClient.connect(url,function(err,clientObj){
                                if(!err){
                                
                                    var db = clientObj.db("ckndb");
                                   console.log(req.body)
                                    db.collection("task").findOne(req.body,
                                    function(err,result){debugger
                                        if(!err){
                                        console.log("User Inserted ")
                                        res.send(result)
                                        console.log(result);
                                        }else{
                                            res.send(err.message)
                                        }

                                    })
                                    
                                }
                            })
                        })

                        app.get("/getCity", function(req, res){
                            mongoClient.connect(url, function(err, clientObj){
                                if(!err) {
                                    console.log(req.body)
                                    var database = clientObj.db("ckndb");
                                    database.collection("city").find(req.body).toArray(function (err, documents){
                                        if(!err) {
                                            res.send(documents);
                                            console.log("Get City")
                                        }
                                    })
                                }
                            })
                        });

                        app.post("/postCity",function(req,res){
                            mongoClient.connect(url,function(err,clientObj){
                                if(!err){
                                
                                    var db = clientObj.db("ckndb");
                                   console.log(req.body.name)
                                    db.collection("city").insertOne(req.body,
                                    function(err,result){debugger
                                        if(!err){
                                        console.log("city Inserted ")
                                        res.send('city inserted')
                                        }else{
                                            res.send(err.message)
                                        }

                                    })
                                    
                                }
                            })
                        })

                        app.get("/getDataByCity/:cityName", function(req, res){
                            mongoClient.connect(url, function(err, clientObj){
                                console.log(req.body)
                                const cityName = req.params.cityName;
                                
                                if(!err) {
                                    var database = clientObj.db("ckndb");
                                    database.collection("city").find({city: cityName}).toArray(function (err, documents){
                                        if(!err) {
                                            res.send(documents);
                                            console.log(documents);
                                            console.log("Get City")
                                        }
                                    })
                                }
                            })
                        });
                        
                        


                        app.listen(1111);
                        console.log("Server Started: http://127.0.0.1:1111");