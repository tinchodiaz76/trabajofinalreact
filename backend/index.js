/**
 * tiene:
 * add (agrega al files)
 * list (files)
 * 
 * le falta:
 * add image (quizás solo una ruta?)
 * edit (para no agregar sino modificar)
 */

var port = 3100;
var express = require("express");
var fs = require("fs");
var app = express();
var memory = null;
var cors = require("cors");

app.use(express.json());
app.use(cors());

try{
    memory = fs.readFileSync("memory.json");
} catch(e){
    if(e.code && e.code=="ENOENT"){
      memory = "{}";
    }
}
if(memory){
   memory = JSON.parse(memory);
}
if(!memory.items){
    memory.items = [];
}
if(!memory.users){
    memory.users = [];
}

app.set("memory",memory);

//var router = express.router();
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/manual.html");
});
app.get("/files",function(req,res){
    res.send(JSON.stringify({files:req.app.get("memory").items}));
});
app.get("/item",function(req,res){
    let item = req.app.get("memory").items.find(req.query && (item=>item.id == req.query.id));
    res.send(item);
});
app.post("/add",async function(req,res){
    var item = req.body;
    item.id = "item_"+(memory.items.length+1);
    memory.items.push(req.body);
    var result = await saveMemory(req.app.get("memory"));
    if(result){
        res.send("ok");
    } else {
        res.send("error");
    }
});
app.post("/edit",async function(req,res){
    var item = req.body;
    memory.items = memory.items.map((memoryItem)=>{
        if(memoryItem.id == item.id){
            return item;
        } else {
            return memoryItem;
        }
    });
    var result = await saveMemory(req.app.get("memory"));
    if(result){
        res.send("ok");
    } else {
        res.send("error");
    }
});

app.post("/register",async function(req,res){
    let userExists = req.app.get("memory").users.find((user)=>user.user == req.body.user);
    if(userExists){
        res.send("user exists");
        return;
    }
    var user = req.body;
    user.id = "user_"+(memory.users.length+1);
    memory.users.push(user);
    var result = await saveMemory(req.app.get("memory"));
    if(result){
        res.send("ok");
    } else {
        res.send("error");
    }
});

app.post("/login",async function(req,res){
   let users = req.app.get("memory").users;
   let userLogged = false;
   for(var iUser in users){
       if(users[iUser].user == req.body.user && users[iUser].password == req.body.password){
            //users[iUser].sessionToken = "saraza" //log token here
            res.send("ok");
            userLogged = true;
            return
       }
   }
   if(!userLogged) res.send("error");
});

function saveMemory(memory){
    app.set("memory",memory);
    return new Promise(function(resolve,reject){
        fs.writeFile("memory.json",JSON.stringify(memory),function(err){
            if(err){
                resolve(false);
            } else {
                resolve(true);
            }     
        })
    })
}

app.listen(port);
console.log("Inventario en puerto "+port);