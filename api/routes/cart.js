const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// UPDATE

router.post("/update/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await Cart.findOne({ userId: req.params.id })
    if (user){
      // if (user.productId.length())
      if (user.products.length === req.body.length){
        for (i in req.body){
          if ((user.products[i]._id).toString() === req.body[i]._id){
            user.products[i].quantity = req.body[i].quantity
          }
        }
        const updatedCart=await user.save()
        res.status(200).json(updatedCart);
      }
      
      
    }
    
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});
// UPDATE Cart Order

router.post("/updateOrder/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await Cart.findOne({ userId: req.params.id })
    if (user){
      
        console.log('update khi order')
        console.log('1111111111111111111',user.products)
        console.log('2222222222222222222',req.body)
        const filteredFile = user.products.filter((obj) => {
          return req.body.some((newObj) => newObj._id !== obj._id.toString());
        });
        console.log('filteredFile',filteredFile)
        user.products = filteredFile;
        const savedCart = await user.save();
        res.status(200).json(savedCart);
      
      
      
    }
    
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

//DELETE
router.post("/delete/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await Cart.findOne({ userId: req.params.id })
    if (user){
      for(i in req.body){
        console.log('=====')
        console.log(req.body[i])
        for(j in user.products){
          if(req.body[i]===(user.products[j]._id).toString()){
            console.log(user.products[j])
            user.products.splice(j, 1);
            break
          }
        }
      }
      console.log('=========================')
      // console.log(user)
      const updatedCart=await user.save()
      res.status(200).json(updatedCart);
      
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE && UPDATE
router.post("/", verifyToken, async (req, res) => {
  const userId = req.body.userId

  try {
    const user = await Cart.findOne({ userId: userId })
    if (user) {
      const array=user.products
      const existItem = array.find(
        item=>
          item.productId.toString() === req.body.products[0].productId
          && item.size === req.body.products[0].size
          && item.color === req.body.products[0].color
        )
      if (existItem){
        console.log('co ton tai',existItem)

      }else{
        console.log('ko ton tai')
        user.products.push(req.body.products[0])
      }

      const update=await user.save()
		  res.status(200).json({status:1,message:"Product added successfully",data:[update]})

    } else {
      console.log('ko co user')
      const newCart = new Cart(req.body);

      try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (error) {

  }

});



//GET USER CART
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id }).find().populate("products.productId","title price img inStock size_color")
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;