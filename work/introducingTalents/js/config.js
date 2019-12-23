(function(window) {
    config = {
 
        apiHost: 'http://www.hbafea.com/admin/home/',
        //  apiHost: '',
        restRoute: {
             //分类
             home: "home/arctypeList", 
             //banner
             banner: "home/advertList",
             //文章列表
             articleHomeList: "home/articleHomeList",
             //文章列表
             articleList: "home/articleList",
             //文章详情
             articleDetail: "home/articleDetail",
             //友情链接
             relatedLinks: "home/linksList"
        },
    }
    return config;
}(window)) 

$.getUrlParam = function(name) {
	var url = window.location.search;
    // 正则筛选地址栏
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    // 匹配目标参数
    var result = url.substr(1).match(reg);
    //返回参数值
    return result ? decodeURIComponent(result[2]) : null;
}
