let User = require("../model/user");
let encryptUtil = require("../utils/encryptUtil");
let config = require("../config");

/**
 * 用户注册
 * @param user 格式 : {username:"zhangsan",password : "123"...}
 * @returns user 格式 : {username:"zhangsan",password : "123"...}
 */
async function regist(user) {
    //1.检查用户名是否存在
    let findResult = await User.findOne({username: user.username});
    if (findResult) {
        throw Error(`用户名${user.username}被占用`);
    }

    //2.对用户密码进行加密处理
    user.password = encryptUtil.md5Hmac(user.password, user.username);

    //3.将用户的等级改为普通商家
    user.role = 0;

    //4.注册用户
    user = await User.create(user);

    //5.隐藏用户密码
    user.password = "";

    return user;
}

/**
 * 用户登录
 * @param user 格式 : {username:"zhangsan",password : "123"}
 * @returns token 格式 : 6f65c4b3f77be3d45b826efbaf1ead32f57bcd4f971ec0db3133827b4d3751398554a6a34691dd67d0e54137779f9aee
 */
async function login(user) {
    //1.检查输入密码是否为空
    let password = user.password;
    if (!password || password.trim().length == 0) {
        throw Error("密码不能为空!")
    }

    //2.根据用户名和密码查找用户
    user.password = encryptUtil.md5Hmac(user.password, user.username);

    let loginResult = await User.findOne({username: user.username, password: user.password});

    //3.判断是否查找到用户
    if (!loginResult){
        throw Error("用户名或密码错误!")
    }

    //4.回写token
    let tokenData = {
        username: user.username,
        expire: Date.now() + config.TOKEN_EXPIRE
    };

    let token = encryptUtil.aesEncrypt(JSON.stringify(tokenData),config.TOKEN_KEY);

    return token;
}

/**
 * 根据用户名删除用户
 * @param username 格式 : String
 * @returns
 */
async function deleteUserByUsername(username){
    //1.根据用户名查询用户是否存在
    await isExistByUsername(username);

    //2.根据用户名删除用户
    let deleteResult = await User.deleteOne({username: username});

    if (deleteResult.n !== 1) {
        throw Errpr("删除失败!")
    }
}

/**
 * 根据用户名查找用户信息
 * @param username 格式 : String
 * @returns {Promise<*>}
 */
async function findUserByUsername(username){
    //1.根据用户名查询用户是否存在
    await isExistByUsername(username);

    let user= await User.findOne({username: username});
    user.password = "";
    return user;
}

/**
 * 检查用户名是否存在
 * @param username 格式 : String
 * @returns
 */
async function isExistByUsername(username){
    let findResult = await User.findOne({username: username});

    if (!findResult){
        throw Error(`用户${username}不存在!`)
    }
}

module.exports = {
    regist, login,deleteUserByUsername,findUserByUsername
}