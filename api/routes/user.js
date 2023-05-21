const User = require("../models/User")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const CryptoJS = require("crypto-js")

const router = require("express").Router()

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString()
  }

  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true })
    res.status(200).json(updateUser)
  } catch (err) {
    res.status(500).json(err)
  }
})




// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json("User has been deleted...")
  } catch (err) {
    res.status(500).json(err)
  }
})

// GET
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const userFind = await User.findById(req.params.id)
    const { password, ...others } = userFind._doc
    res.status(200).json(others)
  } catch (err) {
    res.status(500).json(err)
  }
});

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE
router.post("/create", verifyTokenAndAdmin, async (req, res) => {

  
  console.log('req.body', req.body);
  const userByEmail = await User.findOne({ email: req.body.email });
  const userByUsername = await User.findOne({ username: req.body.username });

  console.log('userByEmail', userByEmail);
  console.log('userByUsername', userByUsername);

  if (userByEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }
  if (userByUsername) {
    return res.status(400).json({ message: "Username already exists" });
  }
  const newUser = new User(
    {
      lastName: req.body.lastName,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
      isAdmin: req.body.isAdmin,
      img: req.body.img
    }
  )
    try {
      const savedUser = await newUser.save()
      res.status(200).json(savedUser)
    } catch (err) {
      res.status(500).json(err)
    }
  })

// GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new
  try {
    const user = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find()

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

// GET ONE
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, ...others } = user._doc
    if(user){
			res.status(200).json({success:1,message:"",data:others});
		}else{
			res.status(200).json({success:0,message:"No Data Found!"})
		}
    } catch (err) {ss
        res.status(500).json({status:0,message:err.message})
    }
})


// ADMIN
// Get USER
// /users/admin?page=${pageNum}&limit=${usersPerPage}&sortBy=${sortBy}&searchText=${searchText}`
router.get("/admin/", async (req, res) => {
  try {
    const itemPerPage = parseInt(req.query.limit || ""); //Users per page
    const pageNum = parseInt(req.query.page || "0"); //Users page number
    let sortByVal = (req.query.sortBy || "_id"); //Users sort by
    let searchText = (req.query.searchText || ""); //Users search text

    if (sortByVal == 'undefined' || searchText == 'undefined') {
      sortByVal = 'name';
      searchText = '';
    }

    let sortObject = {};
    let filterObj = {};
    let searchTextObj = {};
    sortByField = sortByVal;



    if (searchText !== '') {
      searchTextObj = {
        $or: [
          { name: { $regex: searchText, $options: 'i' } },
          { lastname: { $regex: searchText, $options: 'i' } },
          { email: { $regex: searchText, $options: 'i' } }
        ]
      };
    }

    filterObj = {
      $and: [
        searchTextObj
      ]
    };

    sortObject[sortByField] = 1;

    const totalUsers = await User.countDocuments(filterObj);
    console.log(totalUsers);
    const usertData = await User.find(filterObj).sort(sortObject).limit(itemPerPage).skip(itemPerPage * pageNum);
    let pageNumber = totalUsers / itemPerPage;
    let numOfPages = Number.isInteger(pageNumber) ? (pageNumber) : parseInt(pageNumber) + 1

    if (usertData) {
      res.status(200).json({ success: 1, message: "", numOfPages, data: usertData });
    } else {
      res.status(201).json({ success: 0, message: "No Data Found!" })
    }

  } catch (err) {
    res.status(500).json({ status: 0, message: err.message })
  }
})

module.exports = router