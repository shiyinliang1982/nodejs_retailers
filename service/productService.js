let Product = require("../model/product");
let config = require("../config");

/**
 * 添加商品
 * @param product {name: wfsdfsd,id: 23423sfere}
 * @returns
 */
async function addProduct(product) {
    let result = await Product.findOne({_id: product.id});
    if (result) {
        throw Error(`id为${product.id}商品已存在!`)
    }
    result = await Product.create(product);
    if (!result){
        throw Error(`id为${product.id}商品添加失败!`)
    }
}

/**
 * 删除商品
 * @param id ObjectId
 * @returns
 */
async function deleteProductById(id) {
    let result = await Product.findOne({_id: id});
    if (!result){
        throw Error(`id为${id}商品不存在!`)
    }
    result = await Product.deleteOne({_id: id});
    if (!result){
        throw Error(`id为${id}商品删除失败!`)
    }
}

/**
 * 更新商品
 * @param id ObjectId
 * @param product {name: wfsdfsd,id: 23423sfere}
 * @returns
 */
async function updateProductById(id, product) {
    let result = await Product.findOne({_id:id});
    if (!result){
        throw Error(`id为${id}商品不存在!`)
    }
    result = await Product.updateOne({_id: id},product);
    if (!result){
        throw Error(`id为${id}商品更新失败!`)
    }
}

/**
 * 分页查询数据
 * @param page Number
 * @returns [{name:asd},{_id: 12312312}]
 */
async function getProductsByPage(page = 1) {
    let offset = config.PAGE_SIZE * (page - 1);
    let result = await Product.find().limit(config.PAGE_SIZE).skip(offset);
    return JSON.stringify(result)
}

module.exports = {
    addProduct,deleteProductById,updateProductById,getProductsByPage
};