const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

// router.post("/", verifyToken, async (req, res) => {
// const newCart = new Cart(req.body);

// try {
//   const savedCart = await newCart.save();
//   res.status(200).json(savedCart);
// } catch (err) {
//   res.status(500).json(err);
// }
// });

//UPDATE
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

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.find().populate("products.productId","title price img")
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