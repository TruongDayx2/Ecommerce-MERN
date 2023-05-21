const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/all", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("userId","lastname name email")
    .populate("products.productId","title price img");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL LIMIT

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const itemPerPage = parseInt(req.query.page || "");
    const pageNum = parseInt(req.query.pageNum || "0");
    let sortByVal = req.query.sortBy || "_id";
    let searchText = req.query.searchText || "";

    if (sortByVal == "undefined" || searchText == "undefined") {
      sortByVal = "_id";
      searchText = "";
    }

    let sortObject = {};
    let filterObj = {};
    let searchTextObj = {};
    sortByField = sortByVal;

    if (searchText !== "") {
      searchTextObj = {
        $or: [
          { amount: { $regex: searchText, $options: "i" } },
          { status: { $regex: searchText, $options: "i" } },
          { createdAt: { $regex: searchText, $options: "i" } },
        ],
      };
    }

    filterObj = {
      $and: [searchTextObj],
    };

    sortObject[sortByField] = 1;
    const totalOrder = await Order.countDocuments(filterObj);
    const orderData = await Order.find(filterObj).populate("userId","lastname name email")
    .populate("products.productId","title price img").sort(sortObject).limit(itemPerPage).skip(itemPerPage * pageNum);
    let pageNumber = totalOrder / itemPerPage;
    let numOfPages = Number.isInteger(pageNumber) ? pageNumber : parseInt(pageNumber) + 1;

    if (orderData) {
      res.status(200).json({ success: 1, message: "", numOfPages, data: orderData });
    } else {
      res.status(201).json({ success: 0, message: "No Data Found!" });
    }
  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
});



// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth }, ...(productId && {
        products:{$elemMatch:{productId}}
      }) } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;