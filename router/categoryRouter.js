let categoryService = require("../service/categoryService");
let router = require("express").Router();

/**
 * 添加分类
 * url : post , http://localhost:8080/category/
 * @param category {name: "手机"}
 * @returns
 */
router.post("/", async (request, response) => {
    await categoryService.addCategory(request.body);
    response.success()
});

/**
 * 删除分类
 * url : delete , http://localhost:8080/category?name=手机
 * @param name String
 * @returns
 */
router.delete("/", async (request, response) => {
    await categoryService.deleteCategory(request.query.name);
    response.success()
});

/**
 * 更新分类
 * url : put , http://localhost:8080/category?name=手机
 * @param name String
 * @param category {name: "手机"}
 * @returns
 */
router.put("/", async (request, response) => {
    let name = request.query.name;
    await categoryService.updateCategory(name, request.body);
    response.success()
});

/**
 * 分页查询
 * url : put , http://localhost:8080/category?page=2
 * @param page Number
 * @returns [{name: "手表"},{name: "电视"}]
 */
router.get("/", async (request, response) => {
    let page = request.query.page;
    let result = await categoryService.getCategorysByPage(page);
    response.success(result)
});

module.exports=router;