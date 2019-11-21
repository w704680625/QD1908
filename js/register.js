
define(["jquery"],function($){
    var txt = null;
    // 绘制验证码
    function testDraw(){
        txt = testCode(4);
        draw(txt);
    }
    // 点击切换验证码
    function changeTest(){
        $("#test span").mouseenter(function(){
            $(this).css("background-color","blue");
        }).mouseleave(function(){
            $(this).css("background-color","gray");
        }).click(function(){
            testDraw();
        })
    }
    //  表单验证
    function formTest(){
        $(".register input").eq(0).blur(function(){
            var phone = $(this).val();
            if(!phone){
                $(".register .warning").html("❌ 手机号输入不能为空").css("color","red");
            }else if(!(/^1[34578]\d{9}$/.test(phone))){
                $(".register .warning").html("❌ 手机号输入格式不正确").css("color","red");
            }else{
                $(".register .warning").html("✔ 手机号输入格式正确").css("color","green");
            }
        })
        $(".register input").eq(1).blur(function(){
            var test = $(this).val();
            if(!test){
                $(".register .warning").html("❌ 验证码输入不能为空").css("color","red");
            }else if(test.toLowerCase() != txt.toLowerCase()){
                $(".register .warning").html("❌ 验证码输入不正确").css("color","red");
            }else{
                $(".register .warning").html("✔ 验证码输入正确").css("color","green");
            }
        })

        $(".register input").eq(2).blur(function(){
            var password = $(this).val();
            if(!password){
                $(".register .warning").html("❌ 密码输入不能为空").css("color","red");
            }else if(!(/^\w{8,20}$/.test(password))){
                $(".register .warning").html("❌ 密码必须由8-20位字符组成").css("color","red");
            }else{
                $(".register .warning").html("✔ 该密码可以使用").css("color","green");
            }
        })
        $(".register input").eq(3).blur(function(){
            var repassword = $(this).val();
            var password = $(".register input").eq(2).val();
            if(!repassword){
                $(".register .warning").html("❌ 请再次输入密码").css("color","red");
            }else if(repassword != password){
                $(".register .warning").html("❌ 两次输入的密码不一致").css("color","red");
            }else{
                $(".register .warning").html("✔ 两次输入的密码一致").css("color","green");
            }
        })
    }
    // 提交数据
    function postPhp(){
        $(".register button").click(function(){
            var phone = $(".register input").eq(0).val();
            var password = $(".register input").eq(2).val();
            var repassword = $(".register input").eq(3).val();
            $.ajax({
                type: "post",
                url : "../php/register.php",
                data: {
                    username: phone,
                    password : password,
                    repassword: repassword,
                    creat_time: (new Date()).getTime()
                },
                success: function(result){
                    var obj = JSON.parse(result);
                    if(obj.code){
                        alert(obj.message);
                    }else{
                        alert(obj.message);
                        location.replace("login.html");
                    }
                },
                error: function(msg){
                    alert(msg);
                }
            })
        })
    }






    function draw(testCode) {
        var canvas_width=document.getElementById('canvas').clientWidth;
        var canvas_height=document.getElementById('canvas').clientHeight;
        var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
        var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
        canvas.width = 22 * testCode.length;
        canvas.height = canvas_height;
        //有n位验证，可以绘制n位字符
        for (var i = 0; i < testCode.length; i++) {
           
            var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
            var txt = testCode[i];//得到随机的一个内容
            // show_num[i] = txt;
            var x = 10 + i * 20;//文字在canvas上的x坐标
            var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
            context.font = "bold 23px 微软雅黑";
    
            context.translate(x, y);
            context.rotate(deg);
    
            context.fillStyle = randomColor();
            context.fillText(txt, 0, 0);
    
            context.rotate(-deg);
            context.translate(-x, -y);
        }
        for (var i = 0; i <= 5; i++) { //验证码上显示线条
            context.strokeStyle = randomColor();
            context.beginPath();
            context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.stroke();
        }
        for (var i = 0; i <= 30; i++) { //验证码上显示小点
            context.strokeStyle = randomColor();
            context.beginPath();
            var x = Math.random() * canvas_width;
            var y = Math.random() * canvas_height;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        }
    }
    function testCode(n){
        var arr = [];
        for(var i = 0; i < n; i++){
            var tmp = parseInt(Math.random() * 123);
            if(tmp >= 0 && tmp <= 9){
                arr.push(tmp);
            }else if(tmp >= 65 && tmp <= 90 || tmp >= 97 && tmp <= 122){
                arr.push(String.fromCharCode(tmp));
            }else{
                //随机到别的不在范围内的数
                i--;
            }
        }
        return arr.join("");
    }
    function randomColor(){
        var r = parseInt(Math.random()*257);
        var g = parseInt(Math.random()*257);
        var b = parseInt(Math.random()*257);
        rgb = "rgb(" + r + "," + g + "," + b + ")";
        
        return rgb;

    }

    return {
        testDraw: testDraw,
        changeTest: changeTest,
        formTest: formTest,
        postPhp: postPhp,
    }

})