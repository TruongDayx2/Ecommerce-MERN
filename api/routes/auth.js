const router = require("express").Router()
const User = require('../models/User')
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken')

//REGISTER
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
        name:req.body.name,
        lastname:req.body.lastname
    })

    try {
        const savedUser = await newUser.save()
		res.status(201).json({success:1,message:"User registered successfully",data:[savedUser]});
    } catch (e) {
        res.status(500).json(e)
    }
})

//LOGIN
// router.post('/login', async (req, res) => {
//     console.log('req',req.body)
//     try {
//         const user = await User.findOne({ username: req.body.username })
//         !user && res.status(401).json('wrong credentials!')

//         const hashedPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET)
//         const pass = hashedPass.toString(CryptoJS.enc.Utf8)
//         pass !== req.body.password && res.status(401).json('wrong credentials!')

//         const accessToken = jwt.sign({
//             id: user._id,
//             isAdmin: user.isAdmin
//         }, process.env.JWT_SEC, { expiresIn: '3d' }
//         )

//         const { password, ...others } = user._doc
//         res.status(200).json({ ...others, accessToken })
//     } catch (e) {
//         res.status(500).json(e)
//     }
// })
router.post('/login', async (req, res) =>{
    console.log('req',req.body)
	const {email,password} = req.body;
    try{
        const user = await User.findOne({email:email});
        if(!user){
            console.log('user1',user)
			res.status(401).json({success:0,message:"Invalid Email or Password"});
		}else{
            console.log('user2')
			const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
			const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

            if(req.body.password!=originalPassword){
				res.status(401).json({success:0,message:"Invalid Email or Password"});
			}else{
				console.log("process.env.JWT_SECRET",process.env.JWT_SECRET)
				const accessToken = jwt.sign(
					{
						id:user._id,
						isAdmin: user.isAdmin				
					},
					process.env.JWT_SECRET,
					{expiresIn:"3d"}
				);

				const {password,...others} = user._doc;
				res.status(200).json({success:1,message:"",data:[{...others}],token:accessToken});
			}
        }
    }catch(err){
		res.status(500).json({status:0,message:err.message})
	}
})

module.exports = router