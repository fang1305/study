var vm = new Vue({
	el: '#app',
	data: {
		title: "",
		indexText: "首页",
		lang: "cn",
		languageText: "English",
		yourposition: "您的位置",
		navBar: "",
		smallNav: "",
        keyword: "",
        position: "",
		parentid: "",
		typeid: "",
		article: {  
			title: "河北科技卓越人才国际交流计划--美国硅谷站活动圆满落幕", 
			author: "河北引才引智", 
			click: 102,
			add_time: 2019-11-09, 
			content: "",
			typename: "专家风采",
		}, 
		recomList: "",
		searchObj: {
			arctype_id:"",
			lang: 'cn', 
			aid: "",
		},
		 userId: "",
		userName: ""
	},
	created() {  
		if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
			location.href = "../home/enterpriseCustomDetail.html?typeid="+ parseUrl().typeid + "&parentid="+ parseUrl().parentid;
		} else {}
        if(sessionStorage.getItem('lang') == 'en'){
            this.languageText = "中文";
	 		this.indexText = "Index";
	 		this.yourposition = "Your position";
	 		this.lang = "en";
		}  
		sessionStorage.getItem('userId')?this.userId=sessionStorage.getItem('userId'):'';
		sessionStorage.getItem('userName')?this.userName=sessionStorage.getItem('userName'):'';
        if(parseUrl()){
            this.parentid = parseUrl().parentid?parseUrl().parentid:''; 
            this.typeid = parseUrl().typeid?parseUrl().typeid:'';  
        } 
		this.requireData();
    },
	methods: {  
		requireData(){
			// 导航栏
			this.getList('navBar','home/arctypeList'); 
			this.getList('smallNav','home/arctypeList'); 
			// 文章详情
//						this.getList('article','home/articleDetail'); 
        },
		getList(type,url,typeid){ 
            let that = this;
           	if(type=="navBar"){  
           		that.searchObj.arctype_id = "";
           	}  
           	if(type=="smallNav"){ 
           		that.searchObj.arctype_id = parseUrl().parentid?parseUrl().parentid:''; 
           	}  
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
//			                        console.log(ret);
                        if(type=="smallNav"){
                        	that[type] = list[0].childList;
							for(var i = 0; i< that.smallNav.length; i++){
								if(that.typeid == that.smallNav[i].id){ 
									that.position = that.smallNav[i].typename;
									return false;
								}
							}
                        }else if(type=="article"){ 
                        	 
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
		articleList(typeid, parentid,level) {
			if( parentid==9 && level==0 || parentid == 10 && level==0 ){  
			    var url = "http://ku.hbafea.com";
			}else if( typeid==11 || typeid == 50){           //专家人才
			    var url = "http://ku.hbafea.com/html/index/expertTalents.html";
			}else if( typeid==13 || typeid == 51){           //项目技术
			    var url = "http://ku.hbafea.com/html/index/technology.html";
			}else if( typeid==15 || typeid == 52){           //合作机构
			    var url = "http://ku.hbafea.com/html/index/cooperativeAgency.html";
            }else if( typeid == 19 || typeid == 20){
                var url = "exchangeTrainingList.html?typeid=" + typeid + "&parentid=" + parentid;
                // var url = "exchangeTrainingList.html?typeid=" + typeid + "&parentid=" + parentid;
            }else if( typeid == 33 || typeid == 34 || typeid == 29 || typeid == 30 || typeid == 35 || typeid == 36 || typeid == 31 || typeid == 32){
                var url = "newsLine.html?typeid=" + typeid + "&parentid=" + parentid;
            }else if( typeid==21 || typeid == 22){           //国际交流培训
			    var url = "exchangeTrainingList.html?typeid=" + typeid + "&parentid=" + parentid;
			}else if( typeid==23 || typeid == 24){           //名师讲堂
			    var url = "teacherLectureList.html?typeid=" + typeid + "&parentid=" + parentid;
			}else if( typeid==27 || typeid == 28){           //专家风采
			    var url = "expertsElegantDetail.html?typeid=" + typeid + "&parentid=" + parentid;
			}else if( typeid==39 || typeid == 40 || typeid == 41 || typeid == 42 || typeid == 43 || typeid == 44){           //企业定制
			    var url = "enterpriseCustomDetail.html?typeid=" + typeid + "&parentid=" + parentid;
			}else{
				var url = "newsList.html?typeid=" + typeid + "&parentid=" + parentid;
			}   
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
		// 中英文切换
        changeLang(){
            this.lang == "en"?sessionStorage.setItem('lang','cn'):sessionStorage.setItem('lang','en');
			location.href = "../../index.html";
        }, 
        searchFun() {
            var url = "search.html?keywords=" + this.keyword + '&typeid=' + parseUrl().typeid + '&parentid=' + parseUrl().parentid;
            window.open(url);
        },
        exitLogin(id){
			var that = this;
			$.ajax({
				url: config.apiHost+"login/loginout",
				type: 'POST', //GET
                async: true, //或false,是否异步
                data:{
                	user_id:id
                },
				dataType: 'json', //返回的数据格式：json/xml/html/script/jsonp/text
				success: function (ret){
					typeof ret == "object"?'':ret=JSON.parse(ret); 
					// 发送成功
					if(ret.status == 'ok'){ 
						console.log(ret);
						sessionStorage.removeItem('userId');
						sessionStorage.removeItem('userName');
						sessionStorage.removeItem('userType');
						that.userId = "";
						that.userName = "";
					}
				},
				error: function (xhr, textStatus){
					// 发送失败
					console.log('错误')
					console.log(xhr)
					console.log(textStatus)
				},
			})
		}
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
			//console.log(oTime);
			return oTime;
		}, 
	},
});
$(function() {      
	$(".gtop").on("click", function() {
		window.scrollTo(0, 0);
	})
	var swiper = new Swiper('.swiper-container', {
        pagination: {
	        el: '.swiper-pagination',
	        type: 'fraction',
	    },
    });
})  
var bodyH = $("body").height();
var headerH = $(".header").height();
var navBarH = $(".navBar").height();
var footerH = $(".footer").height();
var bottomH = $(".bottom").height();
var mainH = bodyH - headerH - navBarH -footerH - bottomH - 135;  
$(".main").css({"min-height":mainH});