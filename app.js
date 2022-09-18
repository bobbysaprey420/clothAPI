const express           =   require('express');
const app               =   express();
const db                =   require("./config")
const cors              =   require("cors");
const bodyParser        =   require('body-parser');
const fileUpload = require('express-fileupload');

let corsOptions = {
    origin: '*',
    methods: "GET, POST, PUT, PATCH, DELETE",
}

const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const clothRoutes = require('./routes/cloth');

const PORT = process.env.PORT || 3000;
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

app.use('/',registerRoutes);
app.use('/',loginRoutes)
app.use('/cloth',clothRoutes)

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

app.listen(PORT,()=>{
    console.log(`app running at port ${PORT}`);
})