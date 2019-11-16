define(["jquery"],function($){
    // 加载banner图
    function downloadBanner(){
        $.ajax({
            url: "../data/topBanner.json",
            success: function(obj){
                var topBannerArr = obj;
                for(var i = 0; i < topBannerArr.length; i++){
                    $(`<div></div>`).appendTo($(".banner .anchor"));
                    $(`<li><a href="${topBannerArr[i].url}"><img src="${topBannerArr[i].img}" alt=""></a></li>`).appendTo($(".banner ul"));
                }
            },
            error: function(msg){
                alert(msg);
            }
        })
    }
    // banner图添加定时器和点击事件
    function bannerClick(){
        var timer = null;
        var isNow = 0;
        timer = setInterval(function(){
            isNow++;
            tab();
        },2000)
        $(".banner").mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer = setInterval(function(){
                isNow++;
                tab();
            },2000);
        })
        function tab(){
            var aDivs = $(".banner .anchor div");
            var aLis = $(".banner ul li");
            var Oanchor = $(".banner .anchor");
            aLis.css("opacity",0.2).hide().eq(isNow).show().animate({
                opacity: 1
            },500,function(){
                if(isNow == aLis.size() - 1){
                    isNow = -1;
                }
            })
            Oanchor.on("click","div",function(){
                aDivs.removeClass("active");
                $(this).addClass("active");
                aLis.hide().eq($(this).index()).show().css("opacity","1");
            
            })
            aDivs.removeClass("active").eq(isNow).addClass("active");
        }
    }

    // 加载个人及家庭产品数据
    function downloadFamily(){
        $.ajax({
            url: "../data/family.json",
            success: function(obj){
                var arr1 = obj.family;

                for(var i = 0; i < arr1.length; i++){
                    var arr2 = arr1[i];
                    $(`<li class = "li${i}"></li>`).appendTo($(".contentbox1 .con-bottom ul"));
                    for(var j = 0; j < arr2.length; j++){
                        $(` <a href="">
                        <dl>
                            <dd><img src="${arr2[j].img}" alt=""></dd>
                            <dt>${arr2[j].title}</dt>
                            <h5>${arr2[j].desc}</h5>
                            <p>${arr2[j].price}</p>
                        </dl>
                    </a>`).appendTo($(".contentbox1 .con-bottom ul li").eq(i));
                    }
                }
                var arrImg = obj.familyImg;
                for(var k = 0; k < arrImg.length; k++){
                    $(`<li>
                    <div class="left"><a href=""><img src="${arrImg[k].img1}" alt=""></a></div>
        
                    <div class="right"><a href=""><img src="${arrImg[k].img2}" alt=""></a></div>
            </li>`).appendTo(".contentbox1 .con-footer ul");
                }
                
            },
            error: function(msg){
                alert(msg);
            }
        })
    }

//    个人及家庭产品下添加hover事件 和 定时器
    function familyHover(){
        var timer = null;
        var isNow = 0;
        timer = setInterval(function(){
            isNow++;
            if(isNow >= 6){
                isNow = 0;
            }
            $(".contentbox1 .con-footer li").hide().eq(isNow).show();
            $(".contentbox1 .con-bottom li").hide().eq(isNow).show();
        },3000)
        $(".con-middle-a1").mouseenter(function(){
            clearInterval(timer);
            $(this).addClass("active");
            $(".contentbox1 .con-footer li").hide().eq($(this).index()).show();
            $(".contentbox1 .con-bottom li").hide().eq($(this).index()).show();

        }).mouseleave(function(){
            $(this).removeClass("active");
            timer = setInterval(function(){
                isNow++;
                if(isNow >= 6){
                    isNow = 0;
                }
                $(".contentbox1 .con-footer li").hide().eq(isNow).show();
                $(".contentbox1 .con-bottom li").hide().eq(isNow).show();
            },3000)
        })
        $(".contentbox1 .con-bottom").mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer = setInterval(function(){
                isNow++;
                if(isNow >= 6){
                    isNow = 0;
                }
                $(".contentbox1 .con-footer li").hide().eq(isNow).show();
                $(".contentbox1 .con-bottom li").hide().eq(isNow).show();
            },3000)
        })

        $(".contentbox1 .con-footer").mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer = setInterval(function(){
                isNow++;
                if(isNow >= 6){
                    isNow = 0;
                }
                $(".contentbox1 .con-footer li").hide().eq(isNow).show();
                $(".contentbox1 .con-bottom li").hide().eq(isNow).show();
            },3000)
        })
    };

//  加载中小企业数据
        function downloadMiddle(){
            $.ajax({
                url: "../data/middle.json",
                success: function(arr){
                    var arr1 = arr;

                    for(var i = 0; i < arr1.length; i++){
                        var arr2 = arr1[i];
                        $(`<li class = "li${i}"></li>`).appendTo($(".contentbox2 .con-bottom ul"));
                        for(var j = 0; j < arr2.length; j++){
                            $(` <a href="">
                            <dl>
                                <dd><img src="${arr2[j].img}" alt=""></dd>
                                <dt>${arr2[j].title}</dt>
                                <h5>${arr2[j].desc}</h5>
                                <p>${arr2[j].price}</p>
                            </dl>
                        </a>`).appendTo($(".contentbox2 .con-bottom ul li").eq(i));
                        }
                    }
                },
                error: function(msg){
                    alert(msg);
                }
            })
        }


        //    中小企业下添加hover事件 和 定时器
        function middleHover(){
            var timer = null;
            var isNow = 0;
            timer = setInterval(function(){
                isNow++;
                if(isNow >= 4){
                    isNow = 0;
                }
                $(".contentbox2 .con-bottom li").hide().eq(isNow).show();
            },3000)
            $(".con-middle-a2").mouseenter(function(){
                clearInterval(timer);
                $(this).addClass("active");
                $(".contentbox2 .con-bottom li").hide().eq($(this).index()).show();
    
            }).mouseleave(function(){
                $(this).removeClass("active");
                timer = setInterval(function(){
                    isNow++;
                    if(isNow >= 4){
                        isNow = 0;
                    }
                    $(".contentbox2 .con-bottom li").hide().eq(isNow).show();
                },3000)
            })
            $(".contentbox2 .con-bottom").mouseenter(function(){
                clearInterval(timer);
            }).mouseleave(function(){
                timer = setInterval(function(){
                    isNow++;
                    if(isNow >= 4){
                        isNow = 0;
                    }
                    $(".contentbox2 .con-bottom li").hide().eq(isNow).show();
                },3000)
            })
    
        };


        //  加载政企大客户数据
        function downloadBig(){
            $.ajax({
                url: "../data/big.json",
                success: function(arr){
                    var arr1 = arr;

                    for(var i = 0; i < arr1.length; i++){
                        var arr2 = arr1[i];
                        $(`<li class = "li${i}"></li>`).appendTo($(".contentbox3 .con-bottom ul"));
                        for(var j = 0; j < arr2.length; j++){
                            $(` <a href="">
                            <dl>
                                <dd><img src="${arr2[j].img}" alt=""></dd>
                                <dt>${arr2[j].title}</dt>
                                <h5>${arr2[j].desc}</h5>
                                <p>${arr2[j].price}</p>
                            </dl>
                        </a>`).appendTo($(".contentbox3 .con-bottom ul li").eq(i));
                        }
                    }
                },
                error: function(msg){
                    alert(msg);
                }
            })
        }


        //    政企大客户下添加hover事件 和 定时器
        function bigHover(){
            var timer = null;
            var isNow = 0;
            timer = setInterval(function(){
                isNow++;
                if(isNow >= 4){
                    isNow = 0;
                }
                $(".contentbox3 .con-bottom li").hide().eq(isNow).show();
            },3000)
            $(".con-middle-a3").mouseenter(function(){
                clearInterval(timer);
                $(this).addClass("active");
                $(".contentbox3 .con-bottom li").hide().eq($(this).index()).show();
    
            }).mouseleave(function(){
                $(this).removeClass("active");
                timer = setInterval(function(){
                    isNow++;
                    if(isNow >= 4){
                        isNow = 0;
                    }
                    $(".contentbox3 .con-bottom li").hide().eq(isNow).show();
                },3000)
            })
            $(".contentbox3 .con-bottom").mouseenter(function(){
                clearInterval(timer);
            }).mouseleave(function(){
                timer = setInterval(function(){
                    isNow++;
                    if(isNow >= 4){
                        isNow = 0;
                    }
                    $(".contentbox3 .con-bottom li").hide().eq(isNow).show();
                },3000)
            })
    
        };
    return {
        downloadBanner: downloadBanner,
        bannerClick: bannerClick,
        downloadFamily: downloadFamily,
        familyHover: familyHover,
        downloadMiddle: downloadMiddle,
        middleHover: middleHover,
        bigHover: bigHover,
        downloadBig: downloadBig
    }
})