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

app.get('/',(req,res)=>{
    res.render('index.ejs');
})

io.on('connection',(socket)=>{//listen on the connection event for incoming sockets
    console.log("web socket connection established");
})

const port=3000;
server.listen(port, () => {
    console.log(`Hosted at http://localhost:${port}/`);
  });
