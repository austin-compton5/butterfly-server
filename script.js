const express = require('express')
const parser =  require('body-parser')
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors')

const app = express()
app.use(parser.json())
app.use(cors())
const database = {
     users : [
        {
            name: "John",
            email: "sample@gmail.com",
            id: 123,
            hobby: "skiing",
            started: new Date,
            password: "dogs",
            entries: 0
        },
        {
            name: "Aaron",
            email: "test@gmail.com",
            id: 1234,
            hobby: "skating",
            started: new Date,
            password: "******",
            entries: 0
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: "john@gmail.com"
        }
    ]
}

app.get('/', (req, res)=>{
    res.send(database.users)
})

app.post('/signin', (req, res) => {
    for(let i in database.users){
        if(database.users[i].email === req.body.email && database.users[i].password === req.body.password){
            res.send(database.users[i])
        }
    }
    res.status(400).send('user is not registered')
})

app.post('/register', (req, res)=> {
    const {name, id, email, hobby, password} = req.body
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash)
    });
    database.users.push({
        name: name,
        id: id,
        email: email,
        hobby: hobby,
        started: new Date,
        entries: 0,
        password: password,
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params
    let found = false
    let users = database.users
    for(let i in users){
        if(users[i].id == id){
            found = true
            return res.json(users[i])
        }
    }
    if(!found){
        res.status(400).json('user not found')
    }
})

app.put('/images', (req, res) => {
    const {id} = req.body 
    let found = false
    let users = database.users
    for(let i in users){
        if(users[i].id == id){
            found = true
            users[i].entries++
            return res.json(users[i].entries)
        }
    }
    if(!found){
        res.status(400).json('user not found')
    }
})


app.listen(3000, ()=>{
    console.log('app is running on port 3000')
})

