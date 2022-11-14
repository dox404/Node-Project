// sahiba
const express = require('express')
const jwt = require('jsonwebtoken')
const path = require('path')
const app = express()
const hbs = require('hbs')
const User = require('./models/register-model')
require('./db/mongo')
const bcrypt = require('bcrypt')
const auth = require("./middleware/auth")
const CookieParser = require('cookie-parser')


const partial_path = path.join(__dirname, '../templates/partials')
const template_path = path.join(__dirname, '../templates/views')

//setting view engine
app.set('view engine', 'hbs')
app.set('views', template_path)

// registering partial path
hbs.registerPartials(partial_path)

//setting static files
app.use('/public', express.static('public'))


//using the pathsToAdd
app.use(express.json())
app.use(CookieParser())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render("home")
})
app.get('/about', (req, res) => {
    res.render("about")
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/contact', (req, res) => {
    // res.cookie('jwtc','mani')
    res.render('contact')
})
app.get('/feed', auth, (req, res) => {
    // console.log(`the cookie is ${req.cookies.jwt}`)



    res.render('feed')

})




app.post('/register', async (req, res) => {
    try {

        const data = new User({
            Firstname: req.body.fname,
            Lastname: req.body.lname,
            Email: req.body.email,
            PhoneNumber: req.body.phone,
            Gender: req.body.gender,
            Password: bcrypt.hashSync(req.body.password, 10)
        })
        const registered = await data.save()
        res.status(201).render('home')

    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }


})


app.post('/login', async (req, res) => {
    try {

        //getting the password and email from the login portal from the user
        const email = req.body.email
        const password = req.body.password

        // const hashpws=bcrypt.hashSync(req.body.password,10)
        // console.log(hashpws)



        //GETTING THE FULL DETAILS OF THE USER USING THE EMAIL
        const user = await User.findOne({ Email: email })
        // console.log(user)
        //compareing the passwords

        //sending the jwt token as cookie
        console.log(user)
        const storeLocal = (user) => {
            localStorage.setItem('userData', JSON.stringify(user))
        }

        if (bcrypt.compareSync(password, user.Password)) {

            const token = await user.generateAuthToken()

            console.log(token)

            res.cookie("jwt", token, {

                httpOnly: true,

                expires: new Date(Date.now() + 3600000)

            })
            // res.cookie("userData", user, {

            //     httpOnly: true,

            //     expires: new Date(Date.now() + 3600000)

            // })



            res.redirect('/feed');
            // res.send(user)



        } else {
            res.send('passwords are not matching')
        }




    } catch (error) {
        res.status(400).send("Invalid email")
        console.log(error)
    }
})



app.get('/register', (req, res) => {
    res.render('regis')
})
app.listen(3000, () => {
    console.log('server is started on port 3000')

})
