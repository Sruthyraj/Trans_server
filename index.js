const express = require("express");
const session = require('express-session');
const dataService = require("./service/data.services")
const app = express();

app.use(express.json())

app.use(session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false,
}));

const logMiddleware = ((req, res, next) => {
    console.log(req.body);
    next();
});

const authMiddleware = ((req, res, next) => {
    if (!(req.session.cUser)) {
        return res.json({
            status: false,
            statusCode: 422,
            message: "pls login"
        })

    }
    else {
        next();
    }
});

app.use(logMiddleware);


app.get('/', (req, res) => {
    res.send("GET")
})
app.post('/', (req, res) => {

    res.send("POST")
})
app.post('/register', (req, res) => {
    // console.log(req.body);
    const result = dataService.register(req.body.acno, req.body.user, req.body.password);
    console.log(res.status(result.statusCode).json(result));
})
app.post('/login', (req, res) => {
    // console.log(req.body);
    const result = dataService.login(req, req.body.acno, req.body.password);
    console.log(res.status(result.statusCode).json(result));
})

app.post('/deposit',authMiddleware, (req, res) => {
    console.log(req.session.cUser);
    // console.log(req.body);
    const result = dataService.deposit(req, req.body.acno, req.body.amount, req.body.password);
    console.log(res.status(result.statusCode).json(result));
})
app.post('/withdraw',authMiddleware, (req, res) => {
    // console.log(req.body);
    const result = dataService.withdraw(req, req.body.acno, req.body.amount, req.body.password);
    console.log(res.status(result.statusCode).json(result));
})


app.delete('/', (req, res) => {
    res.send("delete")
})

app.listen(3000, () => {
    console.log("running");
})
