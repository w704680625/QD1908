define(["jquery"],function($){
    // 登录按钮添加事件
    function loginClick(){
        $(".login button").click(function(){
            var phone = $(".login input").eq(0).val();
            var password = $(".login input").eq(1).val();
            $.ajax({
                type: "post",
                url : "../php/login.php",
                data: {
                    username: phone,
                    password: password
                },
                success: function(result){
                    var obj = JSON.parse(result);
                    if(obj.code){
                        alert(obj.message);
                    }else{
                        var res = confirm("登录成功，点击确定跳转到首页，点击取消跳转到商品页");
                        if(res){
                            location.replace("../index.html");
                        }else{
                            location.replace("show.html");
                        }
                    }
                },
                error: function(msg){
                    alert(msg);
                }
            })
        })
    }



    return {
        loginClick: loginClick
    }
})