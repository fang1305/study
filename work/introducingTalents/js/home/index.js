var vm = new Vue({
	el: '#app',
	data: {
		indexText: "首页",
		lang: "cn",
		languageText: "English",
		searchBox: false,
		position: "引智头条",
		navBar: "",
		banner: "", //banner
		teacherBanner: "",
		newsList: "",
		dynamicBar: "",
		dynamic: "",
		resource: "",
		training: "",
		training1: "",
		training2: "",
		trainingShow: true,
		policy: "",
		resource: "",
		trainingBar: "",
		resourceBar: "",
		trainbg: "",
		dynamicBarAct: 0,
		resourceBarAct: 0,
		trainingBarAct: 0,  
		keyword:'',
		searchBannerObj:{
			type:"",
			lang: "cn",
		},
		searchObj:{
			arctype_id:"",
			typeid:"",
			lang: "cn",
			limit:"",
		},
		experts:"",            // 首页专家人才
		relatedLinks: ""       //相关链接
	},
	created() { 
		let that = this;
		if(sessionStorage.getItem('lang') == 'en'){
            that.lang = 'en';
		    that.languageText = "中文";
		    that.indexText = "Index"; 
       	} 
		sessionStorage.getItem('userId')?that.userId=sessionStorage.getItem('userId'):'';
		sessionStorage.getItem('userName')?that.userName=sessionStorage.getItem('userName'):'';
		that.requireData();
		window.addEventListener('message', function (e) { 
			if(e.origin !== 'http://ku.hbafea.com') return; 
		    if(e.data.lang=="en"){
		    	that.lang='en';
		    	that.languageText = "中文";
		    	that.indexText = "Index";
		    	sessionStorage.setItem('lang','en'); 
		    	that.requireData();
		    }else{
		    	that.lang = 'cn';
                sessionStorage.setItem('lang','en');
                that.languageText = 'English'; 
                that.indexText = "首页";
                that.requireData();
		    }
		}, false);
    },
	methods: {
		requireData(){
			// 导航栏
			this.getList('navBar','home/arctypeList');
			this.getList('dynamicBar','home/arctypeList');
			this.getList('resourceBar','home/arctypeList');
			this.getList('trainingBar','home/arctypeList');  
			// 活动图
            this.getBanner('banner','home/advertList'); 
            // 首页文章列表 
//          this.getList('dynamic','home/articleHomeList'); 
            this.getList('resource','home/resourceShar'); 
//          this.getList('training','home/articleHomeList'); 
            this.getList('policy','home/articleHomeList'); 
            // 首页专家人才列表
            this.getExperts('experts','experts/expertsHomeList');  
        },
        getBanner(type,url){ 
        	let that = this;
        	that.lang=="en"?that.searchBannerObj.type = 2 : that.searchBannerObj.type = 1; 
        	that.searchBannerObj.lang = that.lang;
        	$.ajax({
				url: config.apiHost+url,
				type: 'GET', //GET
                async: true, //或false,是否异步
                data:that.searchBannerObj,
				dataType: 'json', //返回的数据格式：json/xml/html/script/jsonp/text
				success: function (ret){
					typeof ret == "object"?'':ret=JSON.parse(ret);
					// 发送成功
					if(ret.status == 'ok'){ 
//						console.log(ret); 
						that[type] = ret.data; 
						setTimeout(() => { 
							var mySwiper = new Swiper('.swiper-container1', {
								autoplay: true,
								scrollbar: {
									el: '.swiper-scrollbar',
									hide: true,
								},
							});
                        }, 300);   
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
        getList(type,url,typeid){ 
        	var submitMethod = "GET";
            let that = this; 
            if(type=="dynamic"){
            	that.searchObj.arctype_id = ""; 
            	typeid?that.searchObj.typeid=typeid:'';
        		that.searchObj.limit = 5;
            }
            if(type=="resource"){
            	that.searchObj.arctype_id = ""; 
            	that.searchObj.typeid=''; 
        		that.searchObj.limit = 5;
        		submitMethod = "POST";
            }
            if(type=="training"){
            	that.searchObj.arctype_id = ""; 
        		that.searchObj.limit = 5;
            }
            if(type=="policy"){
        		that.searchObj.arctype_id = ""; 
            	that.lang=="en"?that.searchObj.typeid = 36 : that.searchObj.typeid = 35;
        		that.searchObj.limit = 5;
            } 
            if(type=="navBar"){
            	that.searchObj.arctype_id = "";
        		that.searchObj.typeid = "";
        		that.searchObj.limit = "";
            } 
            if(type=="dynamicBar"){
            	that.lang=="en"?that.searchObj.arctype_id = 2 : that.searchObj.arctype_id = 1;
        		that.searchObj.typeid = "";
        		that.searchObj.limit = "";
            } 
            if(type=="trainingBar"){
            	that.lang=="en"?that.searchObj.arctype_id = 18 : that.searchObj.arctype_id = 17;
        		that.searchObj.typeid = "";
        		that.searchObj.limit = "";
            } 
            if(type=="resourceBar"){
            	that.lang=="en"?that.searchObj.arctype_id = 54 : that.searchObj.arctype_id = 53;
        		that.searchObj.typeid = "";
        		that.searchObj.limit = "";
            } 
            that.searchObj.lang = that.lang;
			$.ajax({
				url: config.apiHost+url,
				type: submitMethod,  
                async: true,  
                data:that.searchObj,
				dataType: 'json', 
				success: function (ret){
					typeof ret == "object"?'':ret=JSON.parse(ret);
					// 发送成功 
					if(ret.status == 'ok'){
						var list = ret.data;
//						console.log(ret); 
						if(type=="dynamicBar"){
							that[type] = ret.data[0].childList; 
							that.getList('dynamic','home/articleHomeList',ret.data[0].childList[0].id); 
//							console.log(ret.data[0].childList);
//							console.log(that[type]);
						}else if(type=="resourceBar"){
							that[type] = ret.data[0].childList;  
						}else if(type=="trainingBar"){
							that[type] = ret.data[0].childList; 
							that.getList('training','home/articleHomeList',ret.data[0].childList[0].id); 
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
		getExperts(type,url){ 
            let that = this;  
			$.ajax({
				url: config.apiHost+url,
				type: 'POST', //GET
                async: true, //或false,是否异步
                data:{
                	lang: that.lang,
                	limit:6
                },
				dataType: 'json', //返回的数据格式：json/xml/html/script/jsonp/text
				success: function (ret){
					typeof ret == "object"?'':ret=JSON.parse(ret);
					// 发送成功
					if(ret.status == 'ok'){
						var list = ret.data;
//						console.log(ret);
						setTimeout(() => { 
							var swiper2 = new Swiper('.swiper-container2', { 
								slidesPerView: 2,
								slidesPerColumn: 2,
								spaceBetween: 0,
								pagination: {
								    el: '.swiper-pagination',
							        clickable: true,
								},
						    });
                        }, 300); 
						that[type] = list; 
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
		articleList(typeid,parentid,level){
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
		articleDetail(aid, typeid, parentid) {
			if( typeid==27 || typeid == 28){           //专家风采
			    var url = "expertsElegantDetail.html?aid=" + aid + "&typeid=" + typeid + "&parentid=" + parentid;
			}else if( typeid==19 || typeid == 20 ||  typeid==21 || typeid == 22 || typeid==29 || typeid == 30 || typeid==31 || typeid == 32 ||typeid==33 || typeid == 34 || typeid==35 || typeid == 36){           //卓越人才计划、国际交流培训、创业扶持
			    var url = "planDetail.html?aid=" + aid + "&typeid=" + typeid + "&parentid=" + parentid;
			}else{
				var url = "newsDetail.html?aid=" + aid + "&typeid=" + typeid + "&parentid=" + parentid;
			} 
			location.href = url; 
		},
		resourceDetail(id, type) { 
			if(type == 1){          
			    var url = "http://ku.hbafea.com/html/index/talentDetail.html?id=" + id;
			}else if(type == 2){           
				var url = "http://ku.hbafea.com/html/index/projectDetail.html?id=" + id;
			}else if(type == 3){           
				var url = "http://ku.hbafea.com/html/index/jobDetail.html?id=" + id;
			}else if(type == 4){           
				var url = "http://ku.hbafea.com/html/index/projectDemandDetail.html?id=" + id;
			}else{} 
//			window.open(url);
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
		changeLang() { 
			let that = this;
			that.dynamicBarAct = 0;
			that.resourceBarAct = 0;
			that.trainingBarAct = 0;
			that.teacherBarAct = 0;
			that.trainingShow = true; 
			if(that.lang == 'cn'){
                that.lang = 'en'; 
                that.languageText = "中文";
				that.indexText = "Index";
				that.typeid = 47;
                sessionStorage.setItem('lang','en')  
                // 重新请求数据
                that.requireData();
            }else{
                that.lang = 'cn'; 
				that.languageText = "English";
				that.indexText = "首页";
				sessionStorage.setItem('lang','cn')
				that.typeid = 3;     
                // 重新请求数据
                that.requireData();
            }     
		}, 
		dynamicBarSelect(typeid, index) { 
			this.dynamicBarAct = index;
			this.typeid = typeid;
			this.getList('dynamic','home/articleHomeList',typeid);
		},
		trainingBarSelect(typeid, index) {
			this.trainingBarAct = index;
			if(typeid == 23 || typeid == 24) {
				var training = {
					typeid: typeid,
					lang: this.lang,
					limit: 5,
				};
				apiAjax("articleHomeList", training, "GET", trainingCallBack1);
			} else {
				var training = {
					typeid: typeid,
					lang: this.lang,
					limit: 3,
				};
				apiAjax("articleHomeList", training, "GET", trainingCallBack);
			}
		},
		resourceBarSelect(typeid, index) {
			this.resourceBarAct = index;  
			if(typeid==55 || typeid==56){
				this.getList('resource','home/resourceShar');
			}
			if(typeid==57 || typeid==58){
				this.getList('resource','home/requirements');
			} 
		},
		searchBoxShow(){
			this.searchBox = true;
		},
		searchFun() {
            if(this.lang == 'en'){
    			var url = "search.html?keywords=" + this.keyword+'&typeid=47&parentid=1';
            }else{
    			var url = "search.html?keywords=" + this.keyword+'&typeid=3&parentid=1';
            }
			location.href = url;
        },
	},
    filters:{
		getDate: function(str) {
			var oDate = new Date(str*1000),
			oYear = oDate.getFullYear(),
			oMonth = oDate.getMonth() + 1,
			oDay = oDate.getDate(),
			oHour = oDate.getHours(),
			oMin = oDate.getMinutes(),
			oSec = oDate.getSeconds(),
			oTime = oYear + '-' + oMonth + '-' + oDay; //最后拼接时间
//			console.log(oTime);	
			return oTime;
		}
	},
}); 

$(function(){ 
	$('.menu').on('click', function() {
        slideout.toggle();
    }); 
    $('.navList').on('click', function(eve) {
        if (eve.target.nodeName === 'P') { slideout.close(); }
    }); 
}) 
 
function trainingCallBack(ret) { 
	vm.training = ret.data;
	vm.trainingShow = true;
}
function trainingCallBack1(ret) {
//	console.log(ret.data);
	vm.training = "";
	if(ret.data) {  
		var training1 = new Array();
		var training2 = new Array();
		for(var i = 0; i< ret.data.length; i++){
			if(i<1){
				training1.push(ret.data[i]);
			}else if(i<4){
				training2.push(ret.data[i]);
			}else{
				
			}
		} 
		vm.training1 = training1;
		vm.training2 = training2;  
	} 
	vm.trainingShow = false; 
}


function callbackError(err) {
	console.log(err);
} 

var bodyH = $("body").height();
var headerH = $(".header").height(); 
var footerH = $(".footer").height();
var bottomH = $(".bottom").height();
var mainH = bodyH - headerH -footerH - bottomH - 280; 
$(".main").css({"min-height":mainH});
