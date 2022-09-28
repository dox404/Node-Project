const express=require('express')
const path=require('path')
const app=express()
const hbs=require('hbs')
const User=require('./models/register-model')
require('./db/mongo')


const partial_path = path.join(__dirname, '../templates/partials')
const template_path = path.join(__dirname, '../templates/views')

//setting view engine
app.set('view engine', 'hbs')
app.set('views', template_path)

// registering partial path
hbs.registerPartials(partial_path)

//setting static files
app.use('/public',express.static('public'))


//using the pathsToAdd
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render("home")
})
app.get('/about', (req, res) => {
    res.render("about")
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})


app.post('/register',async(req,res)=>{
    try{
        // console.log(req.body.fname)
        // res.send(req.body.fname)
       const data=new User({
        Firstname:req.body.fname,
        Lastname:req.body.lname,
        Email:req.body.email,
        PhoneNumber:req.body.phone,
        Gender:req.body.gender,
        Password:req.body.password
       }) 
       const registered=await data.save()
       res.status(201).render('home')
      
    }catch(e){
        res.status(400).send(e)
        console.log(e)
    }

    
})


app.get('/register', (req, res)=>{
    res.render('regis')
})
app.listen(3000,()=>{
    console.log('server is started on port 3000')

})