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
  // const body=
  // console.log('req.body',req.body.products[0])

  try {
    const user = await Cart.findOne({ userId: userId })
    if (user) {
      // console.log('jghgjh',(req.body.products[0].productId))
      const array=user.products
      // console.log('co user',array)
      const existItem = array.find(item=>item.productId.toString() === req.body.products[0].productId)
      // console.log('123',existItem)
      if (existItem){
        // k.products
        // console.log('co ton tai')
        // console.log('exist',existItem)
        if (existItem.size === req.body.products[0].size 
            && existItem.color === req.body.products[0].color 
          ){
            console.log('first')
          }else{
            console.log('222222')
            user.products.push(req.body.products[0])
          }
      }else{
        user.products.push(req.body.products[0])
      }

      // console.log('first',user)
      const update=await user.save()
		  res.status(200).json({status:1,message:"Product added successfully",data:[update]})

      // console.log('update',update)
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
  // try {
  //   const updatedCart = await Cart.findByIdAndUpdate(
  //     req.params.id,
  //     {
  //       $set: req.body,
  //     },
  //     { new: true }
  //   );
  //   res.status(200).json(updatedCart);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
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
    const cart = await Cart.findOne({ userId: req.params.id });
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