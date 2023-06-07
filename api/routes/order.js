const Order = require("../models/Order");
const nodemailer = require('nodemailer')
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
// const { getCart, updateCart, createOrder } = require('../controllers/cartController');
// const { processPayment, sendConfirmationEmail } = require('../services/paymentService');
// const { sendError } = require('../utils/errorHandler');

// // Route POST /api/checkout
// // Checkout giỏ hàng
// router.post('/checkout', verifyToken, async (req, res) => {
//   try {
//     const { userId } = req;
//     const cart = await getCart(userId);
//     if (!cart || cart.products.length === 0) {
//       return res.status(400).json({ error: 'Cart is empty' });
//     }
//     for (const product of cart.products) {
//       const { productId, quantity, size, color } = product;

//       // Kiểm tra số lượng tồn kho của sản phẩm
//       if (quantity > productId.stock) {
//         return res.status(400).json({ error: 'Product is out of stock' });
//       }

//       // Cập nhật số lượng sản phẩm trong giỏ hàng
//       await updateCart(userId, productId, quantity, size, color);
//     }

//     // Xử lý thanh toán
//     const paymentResult = await processPayment(req.body.paymentInfo);

//     // Kiểm tra kết quả thanh toán
//     if (!paymentResult.success) {
//       return res.status(400).json({ error: 'Payment failed' });
//     }

//     // Tạo đơn hàng mới
//     const order = await createOrder(userId, cart.products, paymentResult);

//     // Gửi email xác nhận đơn hàng
//     await sendConfirmationEmail(order);

//     // Xóa giỏ hàng sau khi checkout thành công
//     await clearCart(userId);

//     // Trả về kết quả thành công
//     return res.status(200).json({ success: true, order });
//   } catch (error) {
//     // Xử lý lỗi nếu có
//     sendError(res, error);
//   }
// });

// //CREATE
// router.post("/", verifyToken, async (req, res) => {
//   const newOrder = new Order(req.body);

//   try {
//     const savedOrder = await newOrder.save();
//     res.status(200).json(savedOrder);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ORDER BY ID
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("userId", "lastname name email")
      .populate("products.productId", "title price img");
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});




// //GET ALL

router.get("/all/all", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "lastname name email").
      populate("products.productId", "title price");
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
    const orderData = await Order.find(filterObj).populate("userId", "lastname name email")
      .populate("products.productId", "title price img").sort(sortObject).limit(itemPerPage).skip(itemPerPage * pageNum);
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
      {
        $match: {
          createdAt: { $gte: previousMonth }, ...(productId && {
            products: { $elemMatch: { productId } }
          })
        }
      },
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

//delivered
router.post("/:id/:status", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: { status: req.params.status },
      },
      { new: true }
    );
    const order = await Order.findById(req.params.id).populate("userId", "lastname name email").
      populate("products.productId", "title price img");
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: 'nguyennguyentrung01@gmail.com',
        pass: 'eawjkfqfeiuhxpxb'
      },
    });


    console.log('order:', order);

// productTemplate
const productTemplate = (product) => {
  return `
    <div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px 10px;background-color: rgba(255,255,255,0);" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

          <!--[if (mso)|(IE)]><td align="center" width="400" style="width: 400px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
          <div class="u-col u-col-66p67" style="max-width: 320px;min-width: 100px;display: table-cell;vertical-align: top;">
            <div style="height: 100%;width: 100% !important;">
              <!--[if (!mso)&(!IE)]><!-->
              <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                <!--<![endif]-->

                <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:28px 20px 20px;font-family:'Lato',sans-serif;" align="left">

                        <div style="font-size: 14px; color: #333333; line-height: 140%; text-align: left; word-wrap: break-word;">
                          <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px;">${product.productId.title}</span></p>
                          <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px; color: #17c297;">Quantity : ${product.quantity} x ${product.productId.price}</span></p>
                        </div>

                      </td>
                    </tr>
                  </tbody>
                </table>

                <!--[if (!mso)&(!IE)]><!-->
              </div><!--<![endif]-->
            </div>
          </div>
          <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
          <div class="u-col u-col-33p33" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
            <div style="height: 100%;width: 100% !important;">
              <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                  <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 20px 20px;font-family:'Lato',sans-serif;" align="left">

                        <div style="font-size: 14px; color: #333333; line-height: 120%; text-align: left; word-wrap: break-word;">
                          <p style="font-size: 14px; line-height: 120%;"><span style="font-size: 24px; line-height: 28.8px;"><strong><span style="line-height: 28.8px; font-size: 24px;">$${product.quantity * product.productId.price}</span></strong></span></p>
                        </div>

                      </td>
                    </tr>
                  </tbody>
                </table>

                <!--[if (!mso)&(!IE)]><!-->
              </div><!--<![endif]-->
            </div>
          </div>
          <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
  `;
}


let color = '#17c297';
if (req.params.status != 'Delivered') { 
  color = '#c11818';
}
    await transporter.sendMail({
      from: 'nguyennguyentrung01@gmail.com',
      to: order.userId.email,
      subject: 'YOUR ORDER HAS BEEN ' + req.params.status.toUpperCase(),
      html: `
      <!DOCTYPE HTML
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office">
      
      <head>
        <!--[if gte mso 9]>
            <xml>
              <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
        <title></title>
      
        <style type="text/css">
          @media only screen and (min-width: 620px) {
            .u-row {
              width: 600px !important;
            }
      
            .u-row .u-col {
              vertical-align: top;
            }
      
            .u-row .u-col-33p33 {
              width: 199.98px !important;
            }
      
            .u-row .u-col-50 {
              width: 300px !important;
            }
      
            .u-row .u-col-66p67 {
              width: 400.02px !important;
            }
      
            .u-row .u-col-100 {
              width: 600px !important;
            }
      
          }
      
          @media (max-width: 620px) {
            .u-row-container {
              max-width: 100% !important;
              padding-left: 0px !important;
              padding-right: 0px !important;
            }
      
            .u-row .u-col {
              min-width: 320px !important;
              max-width: 100% !important;
              display: block !important;
            }
      
            .u-row {
              width: 100% !important;
            }
      
            .u-col {
              width: 100% !important;
            }
      
            .u-col>div {
              margin: 0 auto;
            }
          }
      
          body {
            margin: 0;
            padding: 0;
          }
      
          table,
          tr,
          td {
            vertical-align: top;
            border-collapse: collapse;
          }
      
          p {
            margin: 0;
          }
      
          .ie-container table,
          .mso-container table {
            table-layout: fixed;
          }
      
          * {
            line-height: inherit;
          }
      
          a[x-apple-data-detectors='true'] {
            color: inherit !important;
            text-decoration: none !important;
          }
      
          table,
          td {
            color: #000000;
          }
        </style>
      
      
      
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css">
        <!--<![endif]-->
      
      </head>
      
      <body class="clean-body u_body"
        style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #707070;color: #000000">
        <!--[if IE]><div class="ie-container"><![endif]-->
        <!--[if mso]><div class="mso-container"><![endif]-->
        <table
          style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #707070;width:100%"
          cellpadding="0" cellspacing="0">
          <tbody>
            <tr style="vertical-align: top">
              <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #707070;"><![endif]-->
      
      
                <div class="u-row-container" style="padding: 29px 10px 0px;background-color: rgba(255,255,255,0)">
                  <div class="u-row"
                    style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #17c297;">
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 29px 10px 0px;background-color: rgba(255,255,255,0);" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #17c297;"><![endif]-->
      
                      <!--[if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div class="u-col u-col-33p33"
                        style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                            <!--<![endif]-->
      
                            <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
                              width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:20px;font-family:'Lato',sans-serif;"
                                    align="left">
      
                                    
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <!--[if (!mso)&(!IE)]><!-->
                          </div><!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]><td align="center" width="400" style="width: 400px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div class="u-col u-col-66p67"
                        style="max-width: 320px;min-width: 400px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                            <!--<![endif]-->
      
      
      
                            <!--[if (!mso)&(!IE)]><!-->
                          </div><!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
      
      
      
                <div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
                  <div class="u-row"
                    style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f5f5f5;">
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px 10px;background-color: rgba(255,255,255,0);" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f5f5f5;"><![endif]-->
      
                      <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div class="u-col u-col-50"
                        style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                            <!--<![endif]-->
      
                            <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
                              width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:35px 20px 10px;font-family:'Lato',sans-serif;"
                                    align="left">
      
                                    <div style="font-size: 14px; line-height: 120%; text-align: left; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 120%;"><span
                                          style="font-size: 24px; line-height: 28.8px; color: ${color};"><strong>Shipping
                                            Address</strong></span></p>
                                    </div>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
                              width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:10px 20px 30px;font-family:'Lato',sans-serif;"
                                    align="left">
      
                                    <div
                                      style="font-size: 14px; color: #757575; line-height: 160%; text-align: left; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 160%;"><span
                                          style="font-size: 14px; line-height: 22.4px;">Name:${order.userId.lastname} ${order.userId.name}</span></p>
                                      <p style="font-size: 14px; line-height: 160%;"><span
                                          style="font-size: 14px; line-height: 22.4px;">${order.address}</span></p>
                                      <p style="font-size: 14px; line-height: 160%;"><span
                                          style="font-size: 14px; line-height: 22.4px;">Town</span></p>
                                      <p style="font-size: 14px; line-height: 160%;"><span
                                          style="font-size: 14px; line-height: 22.4px;"></span></p>
                                    </div>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <!--[if (!mso)&(!IE)]><!-->
                          </div><!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div class="u-col u-col-50"
                        style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                            <!--<![endif]-->
      
                            <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
                              width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:35px 20px 10px;font-family:'Lato',sans-serif;"
                                    align="left">
      
                                    <div
                                      style="font-size: 14px; color: #333333; line-height: 120%; text-align: left; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 120%;"><strong><span
                                            style="font-size: 24px; line-height: 28.8px;">ID Number</span></strong></p>
                                    </div>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
                              width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:10px 20px 30px;font-family:'Lato',sans-serif;"
                                    align="left">
      
                                    <div
                                      style="font-size: 14px; color: #333333; line-height: 120%; text-align: left; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 120%;"><span
                                          style="font-size: 20px; line-height: 24px;"><strong>${order._id}</strong></span></p>
                                    </div>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <!--[if (!mso)&(!IE)]><!-->
                          </div><!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
      
      
      
                <div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
                  <div class="u-row"
                    style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px 10px;background-color: rgba(255,255,255,0);" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
                      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div class="u-col u-col-100"
                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                            <!--<![endif]-->
      
                            <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
                              width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:30px 20px 20px;font-family:'Lato',sans-serif;"
                                    align="left">
      
                                    <div
                                      style="font-size: 14px; color: #333333; line-height: 120%; text-align: left; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 120%;"><strong><span
                                            style="font-size: 24px; line-height: 28.8px;">Purchesed Items</span></strong></p>
                                    </div>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
                              width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Lato',sans-serif;"
                                    align="left">
      
                                    <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                      style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #e3e3e3;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td
                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                            <span>&#160;</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <!--[if (!mso)&(!IE)]><!-->
                          </div><!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
      
                ${order.products.map(product => {
                  return productTemplate(product);
                }).join('')
              }

                <div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
                  <div class="u-row"
                    style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px 10px;background-color: rgba(255,255,255,0);" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
                      <!--[if (mso)|(IE)]><td align="center" width="400" style="width: 400px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div class="u-col u-col-66p67"
                        style="max-width: 320px;min-width: 400px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                            <!--<![endif]-->
      
                            <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
                              width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:28px 20px 20px;font-family:'Lato',sans-serif;"
                                    align="left">
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <!--[if (!mso)&(!IE)]><!-->
                          </div><!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div class="u-col u-col-33p33"
                        style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                            <!--<![endif]-->
      
                            <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
                              width="100%" border="0">
                            </table>
      
                            <!--[if (!mso)&(!IE)]><!-->
                          </div><!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
      
      
      
                <div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
                  <div class="u-row"
                    style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px 10px;background-color: rgba(255,255,255,0);" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
                      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div class="u-col u-col-100"
                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                            <!--<![endif]-->
      
                            <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
                              width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Lato',sans-serif;"
                                    align="left">
      
                                    <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                      style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #e3e3e3;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td
                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                            <span>&#160;</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <!--[if (!mso)&(!IE)]><!-->
                          </div><!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
      
      
      
                <div class="u-row-container" style="padding: 0px 10px;background-color: rgba(255,255,255,0)">
                  <div class="u-row"
                    style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px 10px;background-color: rgba(255,255,255,0);" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
                      <!--[if (mso)|(IE)]><td align="center" width="400" style="width: 400px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div class="u-col u-col-66p67"
                        style="max-width: 320px;min-width: 400px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                            <!--<![endif]-->
      
                            <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
                              width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:28px 20px 25px;font-family:'Lato',sans-serif;"
                                    align="left">
      
                                    <div
                                      style="font-size: 14px; color: #333333; line-height: 140%; text-align: left; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 140%;"><span
                                          style="font-size: 24px; line-height: 33.6px;"><strong><span
                                              style="line-height: 33.6px; font-size: 24px;">Grand Total</span></strong></span>
                                      </p>
                                      <p style="font-size: 14px; line-height: 140%;"><span
                                          
                                    </div>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div><!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div class="u-col u-col-33p33"
                        style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                            <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
                              width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:35px 20px 20px;font-family:'Lato',sans-serif;"
                                    align="left">
                                    <div
                                      style="font-size: 14px; color: #333333; line-height: 120%; text-align: left; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 120%;"><strong><span
                                            style="font-size: 30px; line-height: 36px;">$${order.amount}</span></strong></p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <!--[if (!mso)&(!IE)]><!-->
                          </div><!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
                <div class="u-row-container" style="padding: 0px 10px 20px;background-color: rgba(255,255,255,0)">
                  <div class="u-row"
                    style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #17c297;">
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px 10px 20px;background-color: rgba(255,255,255,0);" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #17c297;"><![endif]-->
                      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div class="u-col u-col-100"
                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;">
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                            <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
                              width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:30px 20px;font-family:'Lato',sans-serif;"
                                    align="left">
                                    <div
                                      style="font-size: 14px; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
                                      <p style="font-size: 14px; line-height: 140%;">77 Shop</p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="u-row-container" style="padding: 30px;background-color: #f0f0f0">
                  <div class="u-row"
                    style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 30px;background-color: #f0f0f0;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div class="u-col u-col-100"
                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;">
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                      
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
      
      </html>
      `
    }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Email sent: ' + data.response);
        res.status(200).json({ success: 1, message: "Order has been updated...", data: updatedOrder });
      }
    });
    
  } catch (err) {
    console.log('err', err);
    res.status(500).json({ success: 0, message: err });
  }
});

// total orders
router.get('/totalOrders', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.status(200).json({ success: 1, message: "Total orders...", data: totalOrders });
  } catch (err) {
    console.log('err', err);
    res.status(500).json({ success: 0, message: err });
  }
});

// total orders
router.get('/totalOrders', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.status(200).json({ success: 1, message: "Total orders...", data: totalOrders });
  } catch (err) {
    console.log('err', err);
    res.status(500).json({ success: 0, message: err });
  }
});



// total amount all orders
router.get('/totalPayment', async (req, res) => {
  try {
    const totalAmount = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);
    res.status(200).json({ success: 1, message: "Total amount...", data: totalAmount.pop().totalAmount });
  } catch (err) {
    console.log('err', err);
    res.status(500).json({ success: 0, message: err });
  }
});




module.exports = router;