const express=require('express')
const path=require('path')
const app=express()
const hbs=require('hbs')


const partial_path = path.join(__dirname, '../templates/partials')
const template_path = path.join(__dirname, '../templates/views')

//setting view engine
app.set('view engine', 'hbs')
app.set('views', template_path)

// registering partial path
hbs.registerPartials(partial_path)

//setting static files
app.use('/public',express.static('public'))

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
app.get('/register', (req, res)=>{
    res.render('register')
})
app.listen(3000,()=>{
    console.log('server is started on port 3000')

})