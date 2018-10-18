let userService = require("../service/userService");
let router = require("express").Router();

/**
 * 用户注册
 * url post, http://localhost:8080/
 * @param user 格式 : {username:"zhangsan",password : "123"...}
 * @returns user 格式 : {username:"zhangsan",password : "123"...}
 */
router.post("/",async (request,response)=>{
    let user =await userService.regist(request.body);
    response.success(user)
});

/**
 * 用户登录
 * url : post, http://localhost:8080/login
 * @param user 格式 : {username:"zhangsan",password : "123"}
 * @returns token 格式 : 6f65c4b3f77be3d45b826efbaf1ead32f57bcd4f971ec0db3133827b4d3751398554a6a34691dd67d0e54137779f9aee
 */
router.post("/login",async (request,response)=>{
    let token = await userService.login(request.body);
    response.success(token)
});

/**
 * 根据用户名删除用户
 * url : delete, http://localhost:8080/
 * @param username 格式 : String
 * @returns
 */
router.delete("/:username",async (request,response)=>{
    await userService.deleteUserByUsername(request.params.username);
    response.success("用户删除成功!")
});

/**
 * 根据用户名查找用户信息
 * url : get, http://localhost:8080/
 * @param username 格式 : String
 * @returns {Promise<*>}
 */
router.get("/:username",async (request,response)=>{
    let user = await userService.findUserByUsername(request.params.username);
    response.success(user)
});

module.exports = router;