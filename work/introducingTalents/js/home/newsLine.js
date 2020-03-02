var vm = new Vue({
	el: '#app',
	data: {
		title: "",
		indexText: "首页",
		lang: "cn",
		languageText: "English", 
		searchBox: false,
		position: "引智头条", 
		keyword:'',
		typeBtn: '申请活动',
		newsList:"",  
		navBar: "",
		smallNav: "", 
		parentid: "",
		typeid: "",
		searchObj: {
			arctype_id:"",
			lang: 'cn',
			limit: 6,
			typeid: "",
			page: 1,
			keywords: "",
		}
	},
	created() {   
		if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {} else { 
			if(parseUrl().typeid==19 || parseUrl().typeid==20 || parseUrl().typeid==21 || parseUrl().typeid==22) {
				location.href = "../index/exchangeTrainingList.html?typeid="+ parseUrl().typeid + "&parentid="+ parseUrl().parentid;
			} else {
				location.href = "../index/newsLine.html?typeid="+ parseUrl().typeid + "&parentid="+ parseUrl().parentid;
			}
		}
        if(sessionStorage.getItem('lang') == 'en'){
            this.languageText = "中文";
	 		this.indexText = "Index"; 
	 		this.lang = "en";
		}  
		if(parseUrl()){
            this.parentid = parseUrl().parentid?parseUrl().parentid:''; 
            this.typeid = parseUrl().typeid?parseUrl().typeid:''; 
        } 
        if (parseUrl().typeid == 19 || parseUrl().typeid == 20 || parseUrl().typeid == 21 || parseUrl().typeid == 22) {
            this.typeBtn = '申请计划';
        }
		this.requireData();
    },
	methods: {  
		requireData(){
			// 导航栏
			this.getList('navBar','home/arctypeList'); 
			this.getList('smallNav','home/arctypeList'); 
			// 文章列表
			this.getList('newsList','home/articleList'); 
        },
		getList(type,url,typeid){ 
            let that = this; 
            if(type=="navBar"){  
           		that.searchObj.arctype_id = "";
           	} 
           	if(type=="smallNav"){ 
           		that.searchObj.arctype_id = parseUrl().parentid?parseUrl().parentid:''; 
           	}    
            that.searchObj.typeid = parseUrl().typeid?parseUrl().typeid:''; 
            that.searchObj.lang = that.lang; 
			$.ajax({
				url: config.apiHost+url,
				type: 'GET',  
                async: true,  
                data:that.searchObj,
				dataType: 'json', 
				success: function (ret){
					typeof ret == "object"?'':ret=JSON.parse(ret);
					// 发送成功 
					if(ret.status == 'ok'){
						var list = ret.data;
						//console.log(ret);
                        if(type=="smallNav"){
                        	that[type] = list[0].childList;
							for(var i = 0; i< that.smallNav.length; i++){
								if(that.typeid == that.smallNav[i].id){ 
									that.position = that.smallNav[i].typename;
									return false;
								}
							}
                        }else if(type=="newsList"){
                        	var count = ret.data.count; 
//                      	console.log(ret);
							that[type]  = ret.data.list; 
							that.searchObj.page == 1?that.createPagination(count):'';
							if(ret.data.seo_title){
								document.title = ret.data.seo_title;
							}
							if(ret.data.seo_description){ 
								$("meta[name='description']").attr('content',ret.data.seo_description); 
							}
							if(ret.data.seo_keywords){
								$('meta[name="keywords"]').attr('content',ret.data.seo_keywords);
							}
                        }else{ 
                        	that[type] = list;
                        } 
					}
					else{
						that[type] = "";
					}
				},
				error: function (xhr, textStatus){
					// 发送失败
					console.log('错误')
					console.log(xhr)
					console.log(textStatus)
				},
			})
		},
		// 中英文切换
        changeLang(){
            this.lang == "en"?sessionStorage.setItem('lang','cn'):sessionStorage.setItem('lang','en'); 
			location.href = "../../index.html";
        }, 
        createPagination(num) {
			let that = this; 
			var container = $('#pagination');
			var sources = function() {
				var result = [];
				for(var i = 0; i < num; i++) {
					result.push(i);
				}
				return result;
			}();
			var options = {
				dataSource: sources,
				pageSize:6,
				className: 'paginationjs-theme-blue',
				callback: function(response, pagination) {
					//window.console && console.log(response, pagination);
					var dataHtml = '<ul>';
					$.each(response, function(index, item) {
						dataHtml += '<li>' + item + '</li>';
					});
					dataHtml += '</ul>';
                    container.prev().html(dataHtml); 
                    if(that.searchObj.page!=pagination.pageNumber){
                        that.searchObj.page = pagination.pageNumber;
                        that.getList('newsList','home/articleList'); 
                    } 
				}
			};
			container.addHook('beforeInit', function() {
//							window.console && console.log('beforeInit...');
			});
			container.pagination(options);
			container.addHook('beforePageOnClick', function(e) {
				window.console && console.log('beforePageOnClick...');
			});
			return container;
		},
		articleList(typeid, parentid,level) {
			if( parentid==9 && level==0 || parentid == 10 && level==0 ){  
			    var url = "http://ku.hbafea.com";
			}else if( typeid==11 || typeid == 50){           //专家人才
			    var url = "http://ku.hbafea.com/html/index/expertTalents.html";
			}else if( typeid==13 || typeid == 51){           //项目技术
			    var url = "http://ku.hbafea.com/html/index/technology.html";
			}else if( typeid==15 || typeid == 52){           //合作机构
			    var url = "http://ku.hbafea.com/html/index/cooperativeAgency.html";
			}else if( typeid == 19 || typeid == 20 ||  typeid==21 || typeid == 22 || typeid == 33 || typeid == 34 || typeid == 29 || typeid == 30 || typeid == 35 || typeid == 36 || typeid == 31 || typeid == 32){ 
				// 卓越人才计划、国际交流培训、温馨手拉手、创业扶持、行业许可、引智政策
		        var url = "newsLine.html?typeid=" + typeid + "&parentid=" + parentid;
			}else if( typeid==23 || typeid == 24){           //名师讲堂
			    var url = "teacherLectureList.html?typeid=" + typeid + "&parentid=" + parentid;
			}else if( typeid==27 || typeid == 28){           //专家风采
			    var url = "expertsElegantDetail.html?typeid=" + typeid + "&parentid=" + parentid;
			}else if( typeid==39 || typeid == 40 || typeid == 41 || typeid == 42 || typeid == 43 || typeid == 44){           //企业定制
			    var url = "enterpriseCustomDetail.html?typeid=" + typeid + "&parentid=" + parentid;
			}else{
				var url = "newsList.html?typeid=" + typeid + "&parentid=" + parentid;
			}   
//		 	location.href = url;
		 	let win = null;
			win = window.open(url); 
			setTimeout(function(){  
				var message = {
//					userId: sessionStorage.getItem('userId'),
//					userName: sessionStorage.getItem('userName'),
//					userType: sessionStorage.getItem('userType'),
					lang: sessionStorage.getItem('lang'),
				}; 
			    console.log(message);
			    win.postMessage(message,url);
			},1000);
		},
		articleDetail: function(aid, typeid, parentid) { 
			var url = "planDetail.html?aid=" + aid + "&typeid=" + typeid + "&parentid=" + parentid;
			location.href = url;  
		},
		searchBoxShow(){
			this.searchBox = true;
		},
		searchFun() {
            if(this.lang == 'en'){
    			var url = "search.html?keywords=" + this.keyword+"&typeid="+ this.typeid+"&parentid="+ this.parentid;
            }else{
    			var url = "search.html?keywords=" + this.keyword+"&typeid="+ this.typeid+"&parentid="+ this.parentid;
            }
			location.href = url;
        },
	},
	filters: {
		getDate: function(str) {
			var oDate = new Date(str*1000),
				oYear = oDate.getFullYear(),
				oMonth = oDate.getMonth() + 1,
				oDay = oDate.getDate(),
				oHour = oDate.getHours(),
				oMin = oDate.getMinutes(),
				oSec = oDate.getSeconds(),
				oTime = oYear + '-' + oMonth + '-' + oDay; //最后拼接时间 
			return oTime;
		},
		getDesp: function(cont) { 
			if(cont){
				var cont = cont.replace(/&nbsp;/g,' ');
				cont.length > 50?cont = cont.slice(0,50) + '...':'';
			} 
			return cont;
		}
	},
}); 
$(function() { 
	$('.menu').on('click', function() {
        slideout.toggle();
    }); 
    $('.navList').on('click', function(eve) {
        if (eve.target.nodeName === 'P') { slideout.close(); }
    }); 
}) 
  
var bodyH = $("body").height();
var headerH = $(".header").height(); 
var footerH = $(".footer").height();
var bottomH = $(".bottom").height();
var mainH = bodyH - headerH -footerH - bottomH - 280; 
$(".main").css({"min-height":mainH});