define(["jquery","jquery-cookie","parabola"],function($){

    /* 加载列表数据 */

    function download(){
        $.ajax({
            url: "../data/list.json",
            success: function(obj){
                var arr = obj;
                for(var i = 0; i < arr.length; i++){
                    $(`<dl>
                        <dt><img src="${arr[i].img}" alt=""></dt>
                        <dd class = "title">${arr[i].title}</dd>
                        <dd class="desc">${arr[i].desc}</dd>
                        <dd class="price">￥ ${arr[i].price}</dd>
                        
                        <button id="${arr[i].id}" class = "sc-btn">加入购物车</button>
                    </dl>`).appendTo($(".contentbox .content"))
                }
            }
        })   
    }
    /* 右侧购物车添加移入移出事件 */
    function sideHover(){
        $(".side").mouseenter(function(){
            $(".side").stop().animate({
                "right" : 0
            },500)
        }).mouseleave(function(){
            $(".side").stop().animate({
                "right" : -200
            },500)
        })
    }
    // 加入购物车按钮添加点击事件
        function shoppingClick(){
            $(".content").on("click",".sc-btn",function(){
                var id = this.id;
                // 判断是否是第一次添加
                var first = $.cookie("shopping") == null ? true : false;
                if(first){
                    var  arr = [{id: id, num: 1}];
                    $.cookie("shopping",JSON.stringify(arr),{
                        expires: 7,
                        path: "/"
                    })
                }else{
                    var cookieStr = $.cookie("shopping");
                    var cookieArr = JSON.parse(cookieStr);
                    var same = false;
                    for(var i = 0; i < cookieArr.length; i++){
                        if(id == cookieArr[i].id){
                            cookieArr[i].num++;
                            same = true;
                            break;
                        }
                    }
                    if(!same){
                        var obj = {id: id, num: 1};
                        cookieArr.push(obj);
                    }

                    $.cookie("shopping",JSON.stringify(cookieArr),{
                        expires: 7,
                        path: "/"
                    })
                }
                scMsg();  
                scNum(); 
                ballMove($(this));     
            })
        }
        /* 加载右侧购物车数据 */
        function scMsg(){
            $(".side .right").empty();
            $.ajax({
                url: "../data/list.json",
                success: function(obj){
                    var arr = obj;
                    var cookieStr = $.cookie("shopping");
                    if(cookieStr){
                        var cookieArr = JSON.parse(cookieStr);
                        var newArr = [];
                        for(var i = 0; i < arr.length; i++){
                            for(var j = 0; j < cookieArr.length; j++){
                                if(arr[i].id == cookieArr[j].id){
                                    arr[i].num = cookieArr[j].num;
                                    newArr.push(arr[i]);
                                }
                            }
                        }

                        for(var i = 0; i < newArr.length; i++){
                            $(`<dl>
                                <dt><img src="${newArr[i].img}" alt=""></dt>
                                <dd class = "title">${newArr[i].title}</dd>
                                <dd class="price">${newArr[i].price}</dd>
                                <div class="si-count"  id = "${newArr[i].id}">
                                    <div class="si-left">-</div>
                                    <div class="si-middle">${newArr[i].num}</div>
                                    <div class="si-right">+</div>
                                </div>
                                <button>删除此商品</button>
                            </dl>`).appendTo($(".side .right"));
                        }
                    }
                },
                error: function(msg){
                    alert(msg);
                }
            })

        }
        //  加载购物车数量
        function scNum(){
            var cookieArr = JSON.parse($.cookie("shopping"));
            if(cookieArr){
                var sum = 0;
                for(var i = 0; i < cookieArr.length; i++){
                    sum += cookieArr[i].num
                }
                $(".side .left .count").html(sum);
            }else{
                $(".side .left .count").html(0);
            }
        }
        
        // 数量增加 减少
        function changeNum(){
            $(".side .right").on("click",".si-left,.si-right",function(){

                var id  = $(this).parent().attr("id");
                var cookieArr = JSON.parse($.cookie("shopping"));
                for(var i = 0; i < cookieArr.length; i++){
                    if(cookieArr[i].id == id){

                        if($(this).html() == "+"){
                            cookieArr[i].num++;
                        }else if(cookieArr[i].num == 1){
                            alert("此商品数量不能再减少了");
                        }else{
                            cookieArr[i].num--;
                        }
                        $.cookie("shopping",JSON.stringify(cookieArr),{
                            expires: 7,
                            path: "/"
                        })
                        scMsg();
                        scNum();
                        break;
                    }   
                }
                    
            })
        }
        //  购物车删除此商品按钮添加点击事件

        function selectThis(){
            $(".side .right").on("click","button",function(){
                var id = $(this).prev().attr("id");
                var cookieArr = JSON.parse($.cookie("shopping"));
                for(var i = 0; i < cookieArr.length; i++){
                    if(cookieArr[i].id  == id){
                        cookieArr.splice(i,1);
                        break;
                    }
                }
                if(!cookieArr.length){
                    $.cookie("shopping",null,{
                        path: "/"
                    });
                }else{
                    $.cookie("shopping",JSON.stringify(cookieArr),{
                        expires: 7,
                        path: "/"
                    })
                }
                scNum();
                scMsg();
            })
        }
        //    清空购物车
        function clearAll(){
            $("#clear-btn").click(function(){
                var res = confirm("确定要清空购物车么");
                if(res){
                    $(".side .right").empty();
                    $.cookie("shopping",null,{
                        path: "/"
                    });
                    scNum();
                }
            })
        }


        //  抛物线运动
        function ballMove(node){
            //node当前点击的按钮
            $("#ball").css({
                left: $(node).offset().left,
                top: $(node).offset().top,
                display: "block"
            })

            var X = $(".side .left img").offset().left - $(node).offset().left;
            var Y = $(".side .left img").offset().top - $(node).offset().top;

            //1、创建抛物线对象
            var bool = new Parabola({
                el: "#ball",
                offset: [X, Y],
                duration: 800,
                curvature: 0.0005,
                callback: function(){
                    $("#ball").hide();
                }
            })

            bool.start();
        }


    return {
        download: download,
        sideHover: sideHover,
        shoppingClick: shoppingClick,
        scMsg: scMsg,
        scNum: scNum,
        changeNum: changeNum, 
        selectThis: selectThis,
        clearAll: clearAll

    }
})