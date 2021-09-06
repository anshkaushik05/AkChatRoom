// Initialisation
const NameBtn = document.getElementsByClassName('nameBtn')[0];


function connect(name,ServerList){
    
    const sendBtn= document.getElementsByClassName('sendBtn')[0];
    var socket=io('http://localhost:3000/');//this connects with the server. Function without link(default) try to connect with host.
    
    socket.emit('UserConnected',name);
    document.getElementsByClassName('Name')[0].style.display='none';
    ServerList.innerHTML +=`<div class="listMember"> You (${name}) connected </div>`;

    sendBtn.addEventListener('click',()=>{

    //add ur own msg in dom and emit
    var msg= document.getElementById('msg').value;
    if(msg!='')
    {
        socket.emit('message',msg);
        document.getElementsByClassName('allmsg')[0].innerHTML +=   `<div class="msg posLeft">
                                                                        <div class="nameMsg">${name} (Me)</div>
                                                                        <div > <pre> ${msg}</pre></div>
                                                                    </div>`;
        document.getElementById('msg').value='';                                   
    }

    
});

    socket.on('SomebodyJoined',(name)=>{
        ServerList.innerHTML +=`<div class="listMember"> ${name} connected </div>`;
    })
    
    //somebody sent a msg and dom is populated accordingly
    socket.on('msgSent',res=>{
        document.getElementsByClassName('allmsg')[0].innerHTML +=   `<div class="msg posRight">
                                                                        <div class="nameMsg">${res.name}</div>
                                                                        <div > <pre> ${res.msg}</pre></div>
                                                                    </div>`;
    })
    
    //update Server list Dom
    socket.on('disconnected',(name)=>{
        ServerList.innerHTML +=`<div class="listMember"> ${name} disconnected </div>`;
    })
}


NameBtn.addEventListener('click',()=>{
    var name= document.getElementById('UserName').value;
    if(name!=''){

        var ServerList =document.getElementsByClassName('joinedName')[0];
        ServerList.innerHTML +=`<div class="listMember"> using name: ${name}  </div>`;
        connect(name,ServerList);
    }
    else{
        var ServerList =document.getElementsByClassName('joinedName')[0];
        ServerList.innerHTML +=`<div class="listMember"> Please use a Valid name </div>`;
    }
})


