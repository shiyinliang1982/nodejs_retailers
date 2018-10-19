// 用户的权限设置
// 0是普通商家,100是管理员
const role_permissions = [
    // 商家角色，和它对应的权限正则
    {
        role: 0,
        permission: [
            /.*\/product.*/,
            /.*\/order.*/,
            /.*\/category.*/
        ]
    },
    // 管理员角色，和它对应的权限正则
    {
        role: 100,
        permission: [
            /.*/
        ]
    }
];

//验证用户权限
module.exports = (request, response, next)=>{
    // 验证过token的用户才去判断
    if (request.user) {
        // 旗帜变量,是否通过验证
        let flag = false;
        res: for (let i = 0; i < role_permissions.length; i++) {
            // 判断用户权限匹配到的权限
            let r1 = role_permissions[i];
            if (r1.role === request.user.role) {
                // 根据权限判断用户可以访问的模块
                for (let j = 0; j < r1.permission.length; j++) {
                    let p1 = r1.permission[j];
                    if (p1.test(request.url)) {
                        // 只要用户有权限访问即可结束循环
                        flag = true;
                        break res;
                    }
                }
            }

        }
        //没有匹配到响应的权限则抛出异常
        if (!flag){
            throw Error("用户访问权限不足!")
        }
    }
    next();
};