// Importing Modules and creating required variables and objects.
const express=require('express');//express module imported
const app=express();//Created app, to use various functions of express
const path=require('path');//Imported path to change views path 
const http=require('http');//imported http to create server //installation not required 
const server=http.createServer(app);//created server by passing app to request listener function so that all requests are handeled by express app

// Setting Paths for views and static
//views 
app.set('view engine','ejs');//setting view engine as ejs
app.set('views',path.join(__dirname,"views"));//setting views folder path as __dirname/views . here __dirname stands for path of index.js
//static
app.use(express.static(path.join(__dirname,"static")));//seting static folder path 
//Some other setup for API and POST Request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Web sockets 
const {Server}=require('socket.io');//imported socket.io to use web sockets in creation of realtime responses
const io = new Server(server);//Craeted new instance of socket.io to listen events 


//GET POST Requests
app.get('/',(req,res)=>{//request,response
    res.render('index.ejs');//render this for above get request
})

// Sockets
io.on('connection',(socket)=>{//listen on the connection event for incoming sockets
    // console.log("Some User's Web Socket connection established");
    var users={};
    socket.on('UserConnected',name=>{//recieved event when someone joinned
        users[socket.id] = name;//map name according to id's for record
        socket.broadcast.emit('SomebodyJoined',name);// emitting event to others
        // console.log(name);
    })

    socket.on('message',msg=>{//when someone types a msg, this event is emitted
        socket.broadcast.emit('msgSent',{msg: msg,name : users[socket.id]});// emitting event to others
        // console.log(msg);
    })
    socket.on('disconnect',()=>{//event when some one disconnect or reload the page
        socket.broadcast.emit('disconnected',users[socket.id]);// emitting event to others
        delete users[socket.id];//deleting records of user
        // console.log("Someone Disconnected");
    })
})


// Listen 
const port=3000;
server.listen(port, () => {//to host a website
    console.log(`Hosted at http://localhost:${port}/`);
  });
