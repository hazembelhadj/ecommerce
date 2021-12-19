

const userRouter = require( './routers/userRouter.js');
const express = require ('express')
const bodyParser = require ("body-parser")
const mongoose = require ("mongoose");
const dotenv = require('dotenv')
const db = require ( './test/database.js')
dotenv.config();


const shortid = require('shortid');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Product = mongoose.model (
    "products" , 
    new mongoose.Schema ({
        _id: { type: String, default: shortid.generate},
        image: { 
            type: String,
            required: true
        },
        title: { type: String , required : true},
        description: { type: String ,required: true},
        price: { type: Number , required: true},
        availableSizes: [String],
        
    }) 
)
app.use('/api/users', userRouter);

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.post("/api/products",async (req, res) => {
  let newProduct = new Product({
      image: req.body.image,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      availableSizes: req.body.availableSizes,

  });
   await newProduct.save()
 .then ((res) => { console.log(res);
 
}).catch(err => {console.log(err)}) 
res.send (newProduct)});

app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

const Order = mongoose.model(
  "order",
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: shortid.generate,
      },
      email: {type: String, required:true},
      name: {type: String, required:true},

      address: {type: String, required: true},
      total: {type: Number },
      cartItems: [
        {
          _id: { type: String},
          title: { type: String},
          price: { type: Number},
          count:{ type: Number},
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

app.post("/api/orders", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.address ||
    !req.body.total ||
    !req.body.cartItems
  ) {
    return res.send({ message: "Data is required." });
  }
  let newOrder = new Order({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    total: req.body.total,
    cartItems: req.body.cartItems,

});
 await newOrder.save()
.then ((res) => { console.log(res);

}).catch(err => {console.log(err)}) 
res.send (newOrder)
  
 
});
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

    const port = process.env.PORT || 5000;
    app.listen(port , () => console.log ("server at http://localhost:5000"));
    
