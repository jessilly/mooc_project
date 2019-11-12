//声明全局变量
//当前显示图片的索引,默认值为0
var index = 0,
    main = byId("main"),
    menuBox = byId("menu-content"),
    menuContent = byId("menu-content").getElementsByClassName("menu-item"),//获取每个主菜单
    subBox = byId("sub-menu")
    subMenu = byId("sub-menu").getElementsByClassName("inner-box"),//获取每个二级菜单
    prev = byId("prev"),//上一张
    next = byId("next"),//下一张
    timer = null,
    pics = byId("banner").getElementsByTagName("div"),
    banner = byId("banner"),
    dots = byId("dots").getElementsByTagName("span"),
    size = pics.length,
    menuSize = menuContent.length;
    // console.log(pics);
    // console.log(subMenu);



//封装getElementById()
function byId(id){
    return typeof(id) === "string" ? document.getElementById(id) : id ;
}
//封装通用事件绑定方法
function addHander(element,type,handler){
    if(element.addEventListener){
        element.addEventListener(type,handler,true)
    }else if(element.attachEvent){//ie支持Dom2级
        element.attachEvent("on"+type,handler);
    }else{//ie老浏览器---此处不能写element.type
        element["on"+type] = handler;
    }
}

//清除定时器，停止自动轮播
function stopAutoPlay(){
    if(timer){
        clearInterval(timer);
    }
}

//自动轮播
function startAutoPlay(){
    timer = setInterval(function(){
        index++;
        if(index >= size){
            index = 0;
        }
        changeImg();
        // console.log(index);
    },3000)
}

//切换图片
function changeImg(){
    for(var i=0;i<size;i++){
        pics[i].style.display = "none";
        dots[i].className = "";
    }
    pics[index].style.display = "block";
    dots[index].className = "active";
}

//点击下一张按钮显示下一张图片
addHander(next,"click",function(){
    index ++;
    if(index >= size ){ index=0; }
    console.log(index);
    //把除当前的全部清空
    changeImg()
})

//点击上一张按钮显示上一张图片
addHander(prev,"click",function(){
    index --;
    if(index < 0 ){ index=size-1; }
    console.log(index);
    //把除当前的全部清空
    changeImg();
})

//点击圆点索引切换图片
for(var d = 0;d<size;d++){
    dots[d].setAttribute("data-id",d);
    addHander(dots[d],"click",function(){
        //console.log(d); 这里是错的，因为DOM2级事件为异步事件，输出的始终为3，涉及到作用域的问题，可以用闭包来实现
        index = this.getAttribute("data-id");
        changeImg();
    })
}
//鼠标滑过显示二级菜单
for(var i = 0, id;i < menuSize;i++){
    menuContent[i].setAttribute("data-index",i);//给每一个主菜单添加上属性
    //给每一个主菜单绑上事件
    addHander(menuContent[i],"mouseover",function(){   
        id = this.getAttribute("data-index");
        subBox.className = "sub-menu";
        //遍历二级菜单
        for(var j=0;j<menuSize;j++){
            subMenu[j].style.display = "none";
            //所有主菜单取消背景
            menuContent[j].style.background = "none";
        }
        subMenu[id].style.display = "block";
        menuContent[id].style.background = "rgba(0,0,0,.1)";
    })
}
//鼠标离开banner，隐藏子菜单
addHander(banner,"mouseout",function(){
    subBox.className = "sub-menu hide";
})
//鼠标离开主菜单menuContent,隐藏子菜单
addHander(menuBox,"mouseout",function(){
    subBox.className = "sub-menu hide";
})
//鼠标滑入子菜单时，子菜单显示
addHander(subBox,"mouseover",function(){
    this.className = "sub-menu";
})
//鼠标滑入子菜单时，子菜单显示
addHander(subBox,"mouseout",function(){
    this.className = "sub-menu hide";
})

//鼠标滑入子菜单时，子菜单显示
addHander
//开启自动轮播
startAutoPlay();

//鼠标滑入main,停止轮播
addHander(main,"mouseover",stopAutoPlay);
//鼠标离开，继续轮播
addHander(main,"mouseout",startAutoPlay);




