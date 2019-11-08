//ajax的封装，模仿jquery的写法，把所有ajax请求用到的参数放在一个对象自变量内，当作一个参数传递过来
var $ = {
    ajax:function(options){
        //第一步：创建对象,解析变量
        var xhr = null,
            url = options.url,
            method = options.method || 'GET',//传输方式,默认为get,没有就是undefined
            async = typeof(options.async) === "undefined" ? true : options.async,
            data = options.data || null,//参数
            str = '',
            callback = options.success;//ajax请求成功的回调函数
            error = options.error;//请求失败的回调函数
            // console.log(async);
            //将data的对象字面量的形式转换为字符串形式
            if(data){
                for(var i in data){
                    // console.log(i);
                    // console.log(data[i]);
                    str += i +　'=' + data[i] + '&'
                }
                str = str.replace(/&$/,'');
                console.log(str);
            }
            // data:{username:'123',pwd:'123'}
            // xhr.send(username = '123'&pwd = '123')
          
            //根据method 的值改变url
            if(method === "GET"){
                url += '?' + str;
            }
        //console.log(url);
        if(typeof XMLHttpRequest != "undefined"){
            xhr = new XMLHttpRequest();
        }
        //第三步 ，设置响应http请求状态变化的函数
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if((xhr.status >= 200 && xhr.status <300) || xhr.status === 304){
                    callback && callback(JSON.parse(xhr.responseText))
                }
                else{
                    error && error();
                }
            }
        }
        //第二步,创建请求
        xhr.open(method,url,async);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(str);


    },
    //跨域
    jsonp:function(){

    }
}
// $.ajax({
//     url: "http://127.0.0.1/register.php",
//     method: 'post',
//     async: false,
//     data: {username:'123',pwd:'456'},
//     success: function(){

//     },
//     error:function(){}
// })