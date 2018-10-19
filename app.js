//拦截错误
require('express-async-errors');

//开启数据库
require("./db");

// 处理日志
let morgan = require("morgan");

//开启服务器
let express = require("express");
let app = express();

//引入配置
let config = require("./config");

// 使用自定义的加强response的中间件
app.use(require("./middleware/response_md"));

// 使用日志功能
app.use(morgan('combined'));

// 解析json格式的数据
app.use(express.json());

// 加载user的路由模块
app.use("/user", require("./router/userRouter"));
app.use("/category",require("./router/categoryRouter"));
app.use("/product",require("./router/productRouter"));
app.use("/order",require("./router/orderRouter"));

// 处理全局异常的中间件
app.use((err, request, response, next) => {

    // 写出失败的响应
    response.fail(err)

});

app.listen(config.PORT);