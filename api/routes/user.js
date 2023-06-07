const User = require("../models/User")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const CryptoJS = require("crypto-js")
const fs = require('fs');
const { google } = require('googleapis');

const router = require("express").Router()

const CLIENT_ID = '1047127329094-rq6ml1brtcptbifvbdsgk2fjcr3fhdi2.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04xS1k9PMyP-OCgYIARAAGAQSNwF-L9IrPeL4G_LJwnJX-OfEtUphzMojjb3R2mJ6R38NnaPq--560AMM21FZekBhoKzGxqbIFoM';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});


// UPDATE
router.post("/update/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString()
  }

  let data = req.body;
  console.log('data',data);
  
  try {
    if (!data.img.includes('drive.google.com')) {
    const filePath = process.env.PATH_FILE_UPLOAD + data.img.split("\\")[2];
    const response = await drive.files.create({
      requestBody: {
        name: filePath, //This can be name of your choice
        mimeType: 'image/jpeg',
        parents: ['1k-VOEN1iRBjNx3UyQP6xgycRTn4SkOtN'],
      },
      media: {
        mimeType: 'image/jpeg',
        body: fs.createReadStream(filePath),
      },
    });

   
    pathDriver = 'https://drive.google.com/uc?export=view&id=' + response.data.id;
    req.body.img = pathDriver;
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true })
    res.status(200).json(updateUser)
  } else {
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true })
    res.status(200).json(updateUser)
  }
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

  console.log('req.body',req.body);
  const userByEmail = await User.findOne({ email: req.body.email });
  if (userByEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const newUser = new User(
    {
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
      isAdmin: req.body.isAdmin,
      img: req.body.img
    }
  )
console.log('newUser',newUser);
  const filePath = process.env.PATH_FILE_UPLOAD + req.body.img.split("\\")[2];
  try {
    const response = await drive.files.create({
      requestBody: {
        name: filePath, //This can be name of your choice
        mimeType: 'image/jpeg',
        parents: ['1k-VOEN1iRBjNx3UyQP6xgycRTn4SkOtN'],
      },
      media: {
        mimeType: 'image/jpeg',
        body: fs.createReadStream(filePath),
      },
    });
    pathDriver = 'https://drive.google.com/uc?export=view&id=' + response.data.id;
    newUser.img = pathDriver;
    const savedUser = await newUser.save()
    res.status(200).json({ success: 1, message: "User registered successfully", data: [savedUser] });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
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

// total users
router.get("/totalUsers", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    if (totalUsers) {
      res.status(200).json({ success: 1, message: "", data: totalUsers });
    } else {
      res.status(201).json({ success: 0, message: "No Data Found!" })

    }
  } catch (err) {
    res.status(500).json({ status: 0, message: err.message })
  }
})



// get all users
router.get("/allUsers/users", async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(200).json({ success: 1, message: "", data: users });
    } else {
      res.status(201).json({ success: 0, message: "No Data Found!" })

    }
  } catch (err) {
    res.status(500).json({ status: 0, message: err.message })
  }
})

module.exports = router