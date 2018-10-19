let Category = require("../model/category");
let config = require("../config");

/**
 * 添加分类
 * @param category {name: "手机"}
 * @returns
 */
async function addCategory(category) {
    let result = await Category.findOne({name: category.name});
    if (result) {
        throw Error(`分类${category.name}已存在!`)
    }
    result = await Category.create(category);
    if (!result) {
        throw Error(`添加分类${category.name}失败!`)
    }
}

/**
 * 删除分类
 * @param name String
 * @returns
 */
async function deleteCategory(name) {
    let result = await Category.findOne({name: name});
    if (!result) {
        throw Error(`分类${name}不存在!`)
    }
    result = await Category.deleteOne({name: name});
    if (result.n !== 1) {
        throw Error(`删除分类${name}失败!`)
    }
}

/**
 * 更新分类
 * @param name String
 * @param category {name: "手机"}
 * @returns
 */
async function updateCategory(name, category) {
    let result = await Category.findOne({name: name});
    if (!result) {
        throw Error(`分类${name}不存在!`)
    }
    result = await Category.updateOne({name: name}, category);
    if (result.n !== 1) {
        throw Error(`更新分类${name}失败!`)
    }
}

/**
 * 分页查询
 * @param page Number
 * @returns [{name: "手表"},{name: "电视"}]
 */
async function getCategorysByPage(page = 1) {
    let offset = config.PAGE_SIZE * (page - 1);
    return await Category.find().limit(config.PAGE_SIZE).skip(offset);
}

module.exports = {
    addCategory,deleteCategory,updateCategory,getCategorysByPage
};