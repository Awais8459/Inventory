const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use(cookieParser())
app.use(express.json());


const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


const productRoutes = require('./Routes/productRoutes');
app.use(productRoutes);

// app.use(cors({
//     origin: "http://localhost:3000",
//     method: ["GET", "POST"],
//     credentials: true,
// }));


const AuthRoutes = require('./Routes/AuthRoutes');
app.use( AuthRoutes);


const port = 4000;

// Connect to MongoDB
mongoose.connect("mongodb+srv://iamuser:iamuser@crudtask.7g1bgtp.mongodb.net/products?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("MongoDB connection error: ", error);
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});