const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    //商品名称
    name: {
        type: String,
        required:[true, "商品名字必填"],
        unique: true
    },
    //商品单价
    price: {
        type: String,
        required:[true, "商品价格必填"]
    },
    //库存
    stock: {
        type: Number,
        default: 0,
    },
    //商品分类
    category:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "分类id必填"]
    },
    //商品描述
    description:{
        type: String,
    },
    //是否上架
    isOnSale:{
        type: Boolean,
        default: true
    },
    //商品创建日期
    created:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('product', schema);