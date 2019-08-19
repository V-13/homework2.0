const Express=require('express');
var app = new Express();
var bodyParser=require('body-parser');

app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(Express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(rq,rs)=>{
    rs.render('index',{title:"MY website"});
});
app.get('/login',(rq,rs)=>{
    rs.render('login')
});
app.get('/reg',(rq,rs)=>{
    rs.render('reg')
});
app.post('/read',(rq,rs)=>{
    var items=rq.body
    rs.render('read',{item:items});
    var name=rq.body.n; //n = names's input name
    var pass=rq.body.p; //p=password's input name
    var array=rq.body;
    console.log(name);
    console.log(pass);
    console.log(array);
});
app.listen( process.env.PORT||3001);
