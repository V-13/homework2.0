const Express=require('express');
const Mongoose=require('mongoose');
var request =require('request');
var app = new Express();
var bodyParser=require('body-parser');

app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(Express.static(__dirname+"/public"));//public files css,images accessing
app.use(bodyParser.urlencoded({extended:true}));

Mongoose.connect("mongodb+srv://V-13:vivekfrancis@cluster0-bgs7t.mongodb.net/test?retryWrites=true&w=majority")

const StudentModel=Mongoose.model("studentdetails",{
    n:String,
    a:String,
    gender:String,
    district:String,
    dob:String,
    email:String,
    uname:String,
    upass:String,
    upass1:String
})

app.get('/',(rq,rs)=>{
    rs.render('index',{title:"MY website"});
});
app.get('/login',(rq,rs)=>{
    rs.render('login')
});
app.get('/reg',(rq,rs)=>{
    rs.render('reg')
});
app.post('/loginview',(rq,rs)=>{
    var items=rq.body
    rs.render('loginview',{item:items});
    var name=rq.body.n; //n = names's input name
    var pass=rq.body.p; //p= password's input name
    var array=rq.body;
    console.log(name);
    console.log(pass);
    console.log(array);
});


app.post('/read',(req,res)=>{
    //var items=req.body;
    //res.render('read',{item:items});

    var student = StudentModel(req.body);
    var result = student.save((error,data)=>{                          //api to send data to database
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send("<script>alert('Employee Successfully Inserted')</script>");
        }
    });

});


app.get('/studentall',(req,res)=>{

    var result = StudentModel.find((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);                                            //api recieve data from database
        }
        else
        {
            res.send(data);
        }
    });
});



const APIurl ="http://student-reg1.herokuapp.com/studentall"

 
    app.get('/viewstudents',(req,res)=>{

        request(APIurl,(error,response,body)=>{
            var data = JSON.parse(body);
            res.render('viewstudents',{data:data});
        });
    });
    

    app.get('/searchstudent',(req,res)=>{
        res.render('searchstudent');
    });


    app.get('/studentname',(req,res)=>{
        var item = req.query.n;
        //app.get('/emplyee/:id)
        //item=req.params.id;
        //var item = req.body.ename;
        //console.log(item);
        var result = StudentModel.find({n:item},(error,data)=>{
            if(error)
            {
                throw error;
                res.send(error);
            }
            else
            {
                res.send(data);
            }
        })
    
    });

    const APIurl2 ="http://student-reg1.herokuapp.com/studentname"
    app.post('/viewsinglestudent',(req,res)=>{

        var item = req.body.n;
    
        request(APIurl2+"/?n="+item,(error,response,body)=>{
            var data = JSON.parse(body);
            res.render('viewsingle',{data:data});
        })
    });

    app.get('/deletestudent',(req,res)=>{
        res.render('deletestudent');
    });

    app.get('/deleteAPI',(req,res)=>{
        var item= req.query.n;
    
        var result = StudentModel.deleteOne({n:item},(error,data)=>{
            if(error)
            {
                throw error;
                res.send(error);
            }
            else
            {
                res.send(data);
            }
        })
    })


    const APIurl3 = "http://student-reg1.herokuapp.com/deleteAPI"

    app.post('/studdelete',(req,res)=>{
        var item = req.body.n;
    
        request(APIurl3+"/?n="+item,(error,response,body)=>{
    
            res.send("<script>alert('student Deleted')</script><script>window.location.href='/deletestudent'</script>");
    
        })
    });


app.listen( process.env.PORT||3001);
