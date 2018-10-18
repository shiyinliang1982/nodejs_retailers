let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "分类名称必填"],
        unique: true
    },
    created:{
        type:Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('category', schema);