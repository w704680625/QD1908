console.log("配置成功");
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "parabola": "parabola",
        "shopping": "shopping"
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"],
        //声明当前模块不遵从AMD
        "parabola": {
			exports: "_"
		}
    }
})



require(["shopping"],function(shopping){
    shopping.scMsg();
    shopping.scNum();
    shopping.download();
    shopping.sideHover();
    shopping.shoppingClick();
    shopping.changeNum();
    shopping.selectThis();
    shopping.clearAll();
})