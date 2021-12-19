
const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/reactDB" , {

    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
} , (err) =>{

    (err) ? console.log(err) : console.log('success')}
     );
