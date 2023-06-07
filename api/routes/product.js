const { verifyTokenAndAdmin } = require("./verifyToken");
const Product = require("../models/Product");
const fs = require('fs');
const { google } = require('googleapis');

const router = require("express").Router()

//CREATE
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

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    let data = req.body;

    const filePath = process.env.PATH_FILE_UPLOAD + data.img.split("\\")[2];
    
    try {
        const response = await drive.files.create({
            requestBody: {
                name: filePath, //This can be name of your choice
                mimeType: 'image/jpeg',
                parents: ['1k-VOEN1iRBjNx3UyQP6xgycRTn4SkOtN'],
            },
            media: {
                mimeType: 'image/jpeg',body: fs.createReadStream(filePath),
                
            },
        });
        pathDriver = 'https://drive.google.com/uc?export=view&id=' + response.data.id;
        data.img = pathDriver;
        let newProduct = new Product(data);
        const savedProduct = await newProduct.save();
        res.status(200).json({ status: 1, message: "Product added successfully", data: [savedProduct] })

        console.log(response.data);
        }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
    

});

// Upload Image to Drive
router.post("/upload", verifyTokenAndAdmin, async (req, res) => {
    const filePath = req.body.filePath;
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

        console.log(response.data);

        res.status(200).json({ fileId: response.data.id });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});
//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
    try {
        const productData = await Product.findById(req.params.id);
        if (productData) {
            res.status(200).json({ success: 1, message: "", data: productData });
        } else {
            res.status(200).json({ success: 0, message: "No Data Found!" })
        }
    } catch (err) {
        res.status(500).json({ status: 0, message: err.message })
    }
});


//GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        let proTemp
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory === 'men' || qCategory === 'women') {
            proTemp = await Product.find({
                sex: {
                    $in: [qCategory],
                },
            });
            products = proTemp.filter(function (e) {
                return e.inStock === true
            })
        } else if (qCategory) {
            const qCatePath = qCategory.split("/")[0];
            const qCatePathPro = qCategory.split("/")[1];
            proTemp = await Product.find({
                category: {
                    $in: [qCatePathPro],
                },
            });
            products = proTemp.filter(function (e) {
                return (e.sex === qCatePath && e.inStock === true)
            })
        } else {
            proTemp = await Product.find();
            products = proTemp.filter(function (e) {
                return e.inStock === true
            })
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

// ADMIN
// Get PRODUCT
router.get("/admin/", async (req, res) => {
    try {
        const itemPerPage = parseInt(req.query.limit || "10"); //Products per page
        const pageNum = parseInt(req.query.page || "0"); //Products page number
        const sortByVal = (req.query.sortBy || "_id"); //Products sort by
        const searchText = (req.query.searchText || ""); //Products search text
        const priceFilter = (req.query.price || ""); //Products search text

        let sortObject = {};
        let filterObj = {};
        let searchTextObj = {};
        let priceObject = {};
        sortByField = sortByVal;
        if (sortByVal == 'name') {
            sortByField = 'title';
        }

        if (searchText !== '') {
            searchTextObj = {
                $or: [
                    { title: { $regex: searchText, $options: 'i' } },
                    { desc: { $regex: searchText, $options: 'i' } }
                ]
            };

        }

        if (priceFilter !== '') {
            priceObject = { price: { $lte: priceFilter } };
        }

        filterObj = {
            $and: [
                searchTextObj,
                priceObject
            ]
        };

        sortObject[sortByField] = 1;

        const totalProducts = await Product.countDocuments(filterObj);
        const productData = await Product.find(filterObj).sort(sortObject).limit(itemPerPage).skip(itemPerPage * pageNum);

        let pageNumber = totalProducts / itemPerPage;
        let numOfPages = Number.isInteger(pageNumber) ? (pageNumber) : parseInt(pageNumber) + 1

        if (productData) {
            res.status(200).json({ success: 1, message: "", numOfPages, data: productData });
        } else {
            res.status(201).json({ success: 0, message: "No Data Found!" })
        }

    } catch (err) {
        res.status(500).json({ status: 0, message: err.message })
    }
})

// Total Products
router.get("/TotalProducts", async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        res.status(200).json(totalProducts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get ALL PRODUCTS
router.get("/admin/all/Productss", async (req, res) => {
    try {
        const productData = await Product.find();
        if (productData) {
            res.status(200).json({ success: 1, message: "", data: productData });
        } else {
            
            res.status(200).json({ success: 0, message: "No Data Found!" })
        }
    } catch (err) {
        res.status(500).json({ status: 0, message: err.message })
    }
});


module.exports = router