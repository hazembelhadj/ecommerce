const Product = require ('./test/model.js.js.js')
const db = require ( './test/database.js.js.js')

let newEvents = [

    new Product ({
        
        
        "image": "/images/dress2.jpg",
        "title": "Midi sundress with ruched front",
        "description": "This is for all the latest trends, no matter who you are, where you’re from and what you’re up to. Exclusive to ASOS, our universal brand is here for you, and comes in all our fit ranges: ASOS Curve, Tall, Petite and Maternity. Created by us, styled by you.",
        "availableSizes": ["X", "M", "L"],
        "price": 18.9
    })]
    newEvents.save( (err)=> {
    
             if(!err) {
                 console.log('record was added')
             } else {
                 console.log(err)
             }})