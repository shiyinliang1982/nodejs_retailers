const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    //用户名
    username: {
        type: String,
        required: [true, "用户名必填!"]
    },
    //密码
    password: {
        type: String,
        required: [true, "密码必填!"]
    },
    //用户年龄
    age: {
        type: Number,
        min: [0, "年龄不能小于0!"],
        max: [120, "年龄不能大于120!"]
    },
    //用户等级 0 : 普通商家, 10 : VIP用户, 100 : 管理员
    role: {
        type: Number,
        default: 0
    },
    //创建日期
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("users", schema);