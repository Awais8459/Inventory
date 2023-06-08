const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


const crudTask = require('./crud_task');
app.use(crudTask);


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
