const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require('./routes/Routes')
const errorHandler = require('./middleware/ErrorHandling')
// const fileUpload = require("express-fileupload")
// const path = require('path')



const app = express();
dotenv.config();
app.use(express.json());
// app.use(fileUpload({}))
// app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)
app.use(errorHandler)  
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err)); 

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});