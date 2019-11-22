<?php
    header("Content-type: text/html; charset=utf-8");

    /*设置一个同意的返回格式 */
    $returnData = array("code" => 0, "message" => "");

    // 拿到数据
    $username = $_POST["username"];
    $password = $_POST["password"];


    // 设置一个简单的验证

    if(!$username){ 
        $returnData["code"] = 1;
        $returnData["message"] = "用户名不能为空";
        echo json_encode($returnData);
        exit;
    }
    if(!$password){ 
        $returnData["code"] = 2;
        $returnData["message"] = "密码不能为空";
        echo json_encode($returnData);
        exit;
    }

    $link = mysql_connect("localhost","root","123456");
    if(!$link){
        $returnData["code"] = 3;
        $returnData["message"] = "服务器忙，请稍后再试";
        echo json_encode($returnData);
        exit;
    }
    mysql_set_charset("utf8");

    mysql_select_db("qd1908");
    /* 准备sq语句 */
    $str = md5(md5(md5($password)."qianfeng")."qingdao");
    $sql = "SELECT * FROM users WHERE username='{$username}' AND password='{$str}'";
    // echo $sql ;
    // 发送命令
    $res = mysql_query($sql);
    $row = mysql_fetch_assoc($res);
	if(!$row){
		$returnData["code"] = 4;
		$returnData["message"] = "用户名或者密码错误";
		echo json_encode($returnData);
		exit;
	}else{
        $returnData["message"] = "登陆成功";
		echo json_encode($returnData);
    }

    mysql_close($link);
    ?>