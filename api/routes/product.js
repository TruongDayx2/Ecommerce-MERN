const { verifyTokenAndAdmin } = require("./verifyToken");
const Product = require("../models/Product");

const router = require("express").Router()

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
		res.status(200).json({status:1,message:"Product added successfully",data:[savedProduct]})
    } catch (err) {
		res.status(500).json({status:0,message:err.message})

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
        if(productData){
			res.status(200).json({success:1,message:"",data:productData});
		}else{
			res.status(200).json({success:0,message:"No Data Found!"})
		}
    } catch (err) {
        res.status(500).json({status:0,message:err.message})
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
        } else if (qCategory === 'men' || qCategory ==='women') {
            proTemp = await Product.find({
                sex: {
                    $in: [qCategory],
                },
            });
            products = proTemp.filter(function(e){
                return e.inStock === true
            })
        }else if(qCategory){
            const qCatePath = qCategory.split("/")[0];
            const qCatePathPro = qCategory.split("/")[1];
            proTemp = await Product.find({
                category: {
                    $in: [qCatePathPro],
                },
            });
            products = proTemp.filter(function(e){
                return (e.sex === qCatePath && e.inStock === true)
            })
        }else {
            proTemp = await Product.find();
            products = proTemp.filter(function(e){
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
router.get("/admin/",async(req,res)=>{
    try{
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
  		if(sortByVal == 'name'){
  			sortByField = 'title'; 
  		}

        if(searchText !== ''){
            searchTextObj = {
                             $or : [
                                { title: { $regex: searchText, $options:'i' } },
                                { desc: { $regex: searchText, $options:'i' } }
                             ]
                          };

        }

        if(priceFilter !== ''){
            priceObject = 	{price: {$lte: priceFilter}};
        }

        filterObj = {
            $and : [							    
               searchTextObj,
               priceObject
            ]
        };

        sortObject[sortByField] = 1;  	

        const totalProducts = await Product.countDocuments(filterObj);
		const productData = await Product.find(filterObj).sort(sortObject).limit(itemPerPage).skip(itemPerPage * pageNum);
		
        let pageNumber = totalProducts/itemPerPage;
        let numOfPages = Number.isInteger(pageNumber) ? (pageNumber) : parseInt(pageNumber) +1

        if(productData){
			res.status(200).json({success:1,message:"", numOfPages ,data:productData});
		}else{
			res.status(201).json({success:0,message:"No Data Found!"})
		}

    }catch(err){
		res.status(500).json({status:0,message:err.message})
	}
})
module.exports = router