<?php
    header("Content-type: text/html; charset=utf-8");

    /*设置一个同意的返回格式 */
    $returnData = array("code" => 0, "message" => "");

    // 拿到数据
    $username = $_POST["username"];
    $password = $_POST["password"];
    $repassword = $_POST["repassword"];
    $creat_time = $_POST["creat_time"];

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
    if($password != $repassword){ 
        $returnData["code"] = 3;
        $returnData["message"] = "两次输入的密码不一致";
        echo json_encode($returnData);
        exit;
    }
    $link = mysql_connect("localhost","root","123456");
    if(!$link){
        $returnData["code"] = 4;
        $returnData["message"] = "服务器忙，请稍后再试";
        echo json_encode($returnData);
        exit;
    }
    mysql_set_charset("utf8");

    mysql_select_db("qd1908");
    /* 准备sq语句 */
    $sql = "select * from users where username='{$username}'";
    // 发送命令
    $res = mysql_query($sql);
    $row = mysql_fetch_assoc($res);
	if($row){
		$returnData["code"] = 5;
		$returnData["message"] = "用户名已注册";
		echo json_encode($returnData);
		exit;
	}

	//密码要进行md5加密
	$str = md5(md5(md5($password)."qianfeng")."qingdao");

	//注册
	$sql = "INSERT INTO users(username,password,creat_time) VALUES('{$username}','{$str}',{$creat_time})";

	$res = mysql_query($sql);
	if(!$res){
		$returnData["code"] = 6;
		$returnData["message"] = "服务器忙";
		echo json_encode($returnData);
		exit;
	}else{
		$returnData["message"] = "注册成功";
		echo json_encode($returnData);
	}
	mysql_close($link);