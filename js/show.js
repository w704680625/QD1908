define(["jquery"],function($){
    // 小图片添加移入移出事件，上面大图片显示对应的图片
    function tab(){
    
        $(".content .list li").mouseenter(function(){
            $(".content .list li").css("border-color","gray")
            $(this).css("border-color","red");
            $(".content .pic").html(`<img src="../images/show-${$(this).index()}.jpg" alt="">
            <div class="mark"></div>`)
            $(".content .right .big").html(`<img src="../images/show-${$(this).index()}.jpg" alt="">`)
        })
    }
    // 导航箭头添加点击事件
    function bannerClick(){
        $(".content .por-left").click(function(){
            $(".content .list li").show().eq(5).hide();
            $(".content .list li").css("border-color","gray").eq(0).css("border-color","red");
            $(".content .pic").html(`<img src="../images/show-0.jpg" alt="">
            <div class="mark"></div>`)
            $(".content .right .big").html(`<img src="../images/show-0.jpg" alt="">`)
        })
        $(".content .por-right").click(function(){
            $(".content .list li").hide().eq(5).show();
            $(".content .list li").css("border-color","gray").eq(5).css("border-color","red");
            $(".content .pic").html(`<img src="../images/show-5.jpg" alt="">
            <div class="mark"></div>`);
            $(".content .right .big").html(`<img src="../images/show-5.jpg" alt="">`);
        })
    }
    // 添加放大效果  
    function amplifier(){
        $(".content .pic").mouseenter(function(){
            $(".content .pic .mark").show();
            $(".content .right .big").show();
        }).mouseleave(function(){
            $(".content .pic .mark").hide();
            $(".content .right .big").hide();
        })
        $(".content .pic").mousemove(function(ev){
            var l = ev.pageX - $(".content .left .pic").offset().left - 100;
            
            if(l <= 0){
                l = 0;
            }
            if(l >= 320){
                l = 320;
            }
            var t = ev.pageY - $(".content .left .pic").offset().top - 100;

            if(t <= 0){
                t = 0;
            }
            if(t >= 320){
                t = 320;
            }
            /* Mark.style.left = l + 'px';
                    oMark.style.top = t + 'px';
                    oImg.style.left = l * -3 + 'px';
                    oImg.style.top = t * -3 + 'px'; */
                    $(".content .mark").css({
                        "left" : l + "px",
                        "top" : t + "px",
                    })
                    $(".content .right .big img").css({
                        "left" : l * -3 + "px",
                        "top" : t * -3 + "px",
                    })
        })
    }
    function back(){
        $(".content .right button").click(function(){
            location.replace("shopping.html");
        })
    }

    return {
        tab : tab,
        bannerClick: bannerClick,
        amplifier: amplifier,
        back: back
    }
})