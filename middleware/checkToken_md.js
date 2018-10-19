let encryptUtil = require("../utils/encryptUtil");
let config = require("../config");
let userService = require("../service/userService");

function isExclude(request) {
    //1.设置不需要token验证的地址,正则表达式
    let urls = [
        /.*\/user\/regist/,
        /.*\/user\/login/
    ];
    //2.旗帜变量,是否验证token
    let flag = false;
    //3.遍历
    for (let i = 0; i < urls.length; i++) {
        let url = urls[i];
        if (url.test(request.url)) {
            flag = true;
            break;
        }
    }
    return flag
}

module.exports = async (request, response, next) => {
    //需要验证token
    if (!isExclude(request)) {
        //1.检查token里是否有数据,没有数据就抛出异常
        let token = request.get("token");
        if (!token) {
            throw Error("用户验证失败!")
        }
        //2.验证token是否合法
        let parseToken = null;
        try {
            parseToken = JSON.parse(encryptUtil.aesDecrypt(token, config.TOKEN_KEY));
        } catch (e) {
            throw Error("非法登录!")
        }
        //3.检查token是否过期
        if (parseToken.expire<Date.now()){
            throw Error("验证过期,请重新登录!")
        }
        //4.根据用户名查找用户
        let user = await userService.findUserByUsername(parseToken.username);
        if (!user) {
            throw Error("非法用户")
        }
        //5.将查找出的用户信息写回到request中,以便后面验证使用
        request.user = user;
    }
    next();
};