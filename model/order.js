const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    //商品id
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "商品id必填"]
    },
    //商品名称
    productName:{
        type: String,
        required:[true, "商品名字必填"]
    },
    //商品价格
    productPrice: {
        type: String,
        required: [true, "商品价格必填"]
    },
    //商品数量
    count: {
        type: Number,
        required: [true, "商品数量必填"],
        min:[1, "商品数量不能小于1"]
    },
    //商品总价
    total:{
        type: String
    },
    //订单状态: unpay success cancel
    status: {
        type: String,
        default:"unpay"
    },
    //订单创建时间
    created: {
        type:Date,
        default: Date.now(),
    },
    //订单支付时间
    payTime: {
        type: Date
    },
    //订单取消时间
    cancelTime: Date
});

module.exports = mongoose.model('order', schema);