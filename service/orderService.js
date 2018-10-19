let Order = require("../model/order");
let productService = require("../service/productService");
let big = require("big.js");
let config = require("../config");

/**
 * 添加订单
 * @param order {productId: weewerwere,productName: wsdfdfd,productPrice: dfdfd,count: 3434}
 * @returns
 */
async function addOrder(order) {
    //1.根据商品id查找商品
    let product = await productService.getProductById(order.productId);
    if (!product) {
        throw Error(`未找到商品!`)
    }
    //2.判断库存是否足够
    if (product.stock < order.count) {
        throw Error(`库存不足!`)
    }
    //3.给order的productName,productPrice赋值
    order.productName = product.name;
    order.productPrice = product.price;
    //4.根据product的单价和order的数量计算订单的总价
    order.total = big(order.productPrice).times(order.count);
    //5.添加订单
    result = await Order.create(order);
    if (!result) {
        throw Error(`订单添加失败!`)
    }
    //6.减去produc库存
    let update = {stock: product.stock - order.count};
    await productService.updateProductById(order.productId, update);
}

/**
 * 分页查询
 * @param page Number
 * @returns [{order},{order}]
 */
async function getOrderByPage(page=1){
    let offset = config.PAGE_SIZE * (page -1);
    let result = await Order.find().limit(config.PAGE_SIZE).skip(offset);
    return result
}

/**
 * 根据订单id查询订单
 * @param id
 * @returns {order}
 */
async function getOrderById(id) {
     let result = await Order.findOne({_id: id});
     return result
}

module.exports = {
    addOrder,getOrderByPage,getOrderById
};