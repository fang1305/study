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
