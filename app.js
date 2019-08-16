const Express=require('express');
var app = new Express();
app.set('view engine','ejs');
app.use(Express.static(__dirname+"/public"));
app.get('/',(rq,rs)=>{
    rs.render('index',{title:"MY website"});
});
app.get('/login',(rq,rs)=>{
    rs.render('login')
});
app.get('/reg',(rq,rs)=>{
    rs.render('reg')
});
app.listen( process.env.PORT||3001);
