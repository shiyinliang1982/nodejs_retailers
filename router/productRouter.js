let router = require("express").Router();
let productService = require("../service/productService");

/**
 * 添加商品
 * url : post ,http://localhost:8080/product
 * @param product {name: wfsdfsd,id: 23423sfere}
 * @returns
 */
router.post("/", async (request, response) => {
    await productService.addProduct(request.body);
    response.success()
});

/**
 * 删除商品
 * url : delete ,http://localhost:8080/product?id=????
 * @param id ObjectId
 * @returns
 */
router.delete("/", async (request, response) => {
    let id = request.query.id;
    await productService.deleteProductById(id);
    response.success()
});

/**
 * 更新商品
 * url : put ,http://localhost:8080/product?id=????
 * @param id ObjectId
 * @param product {name: wfsdfsd,id: 23423sfere}
 * @returns
 */
router.put("/", async (request, response) => {
    let id = request.query.id;
    await productService.updateProductById(id,request.body);
    response.success()
});

/**
 * 分页查询数据
 * url : get ,http://localhost:8080/product?page=??
 * @param page Number
 * @returns [{name:asd},{_id: 12312312}]
 */
router.get("/", async (request, response) => {
    let page = request.query.page;
    let result = await productService.getProductsByPage(page);
    response.success(result)
});

module.exports = router;