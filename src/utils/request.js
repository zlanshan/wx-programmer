request.baseURL = "https://www.zhengzhicheng.cn/api/public/v1/";

function request(url, data = {}, header = {}, method = "get") {

    // Promise对象，必须要传参进去，不然new Promise就相当于构造函数的，这是没有定义的
    // Promise对象传参，第一个参数多是成功后会调用的回调函数，第二个参数名是失败后调用的回调函数
    return new Promise((resolve, reject) => {
        wx.request({
            url, //开发者服务器接口地址",
            data, //请求的参数",
            header,
            // 成功的回调函数
            success: res => {
                resolve(res);
            },
            // 失败的回调函数
            fail: () => {
                reject();
            },
        });
    })

}

// 封装request的get函数开放出去
request.get = function(url, data) {
        return request(request.baseURL + url, data, {}, "get");
    }
    // 封装request的post函数开放出去
request.post = function(url, data) {
    return request(request.baseURL + url, data, {}, "post");
}

// 导出默认的，，一个对象，导入的时候不用带花括号的
export default request;