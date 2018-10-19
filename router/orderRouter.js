let orderService = require("../service/orderService");
let router = require("express").Router();

/**
 * 添加订单
 * url : post , http://localhost:8080/order
 * @param order {productId: weewerwere,productName: wsdfdfd,productPrice: dfdfd,count: 3434}
 * @returns
 */
router.post("/", async (request, response) => {
    await orderService.addOrder(request.body);
    response.success()
});

/**
 * 分页查询
 * url : get , http://localhost:8080/order?page=**
 * @param page Number
 * @returns [{order},{order}]
 */
router.get("/",async (request, response)=>{
    let result = await orderService.getOrderByPage(request.query.page);
    response.success(result)
});

/**
 * 根据订单id查询订单
 * url : get , http://localhost:8080/order?id=***
 * @param id
 * @returns {order}
 */
router.get("/id",async (request, response)=>{
    let result = await orderService.getOrderById(request.query.id);
    response.success(result)
});

module.exports = router;

