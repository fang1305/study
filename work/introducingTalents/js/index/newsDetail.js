var vm = new Vue({
	el: '#app',
	data: {
		indexText: "首页",
		lang: "cn",
		languageText: "English",
		yourposition: "您的位置",
		navBar: "",  
		front: "",
		after: "",
		detail: "",
		detailCont: "",
		recomList: "",
		specialList: "",
		position : ""
	},
	created() {  
        if(sessionStorage.lang == 'en'){
            this.languageText = "中文";
	 		this.indexText = "Index";
	 		this.yourposition = "Your position";
	 		this.lang = "en"; 
		}else{
			sessionStorage.lang == 'cn';
		} 
    },
	methods: {
		articleList: function(typeid, parentid,level) {
			var typeid = typeid;
			var parentid = parentid;
			if( parentid==9 && level==0 || parentid == 10 && level==0 ){ 
			    var url = "http://ku.hbafea.com";
			}else if( typeid==11 || typeid == 50){  
			    var url = "http://ku.hbafea.com/html/index/expertTalents.html";
			}else if( typeid==13 || typeid == 51){  
			    var url = "http://ku.hbafea.com/html/index/technology.html";
			}else if( typeid==15 || typeid == 52){  
			    var url = "http://ku.hbafea.com/html/index/cooperativeAgency.html";
			}else if( typeid==19 || typeid==33 || typeid == 29||typeid == 35||typeid==31){
                // 人才培训
				var url = "newsLine.html?typeid=" + typeid + "&parentid=" + parentid;
            }else{
				var url = "newsList.html?typeid=" + typeid + "&parentid=" + parentid;
			}   
		 	location.href = url;
//          window.open(url);
		},
        articleDetail: function(aid){
		 	var aid = aid;  
		 	var url = "newsDetail.html?aid="+ aid+ "&typeid="+ vm.typeid + "&parentid="+ vm.parentid;
		 	window.open(url);
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
	$(".chinese").on("click",function(){ 
		vm.lang == "en"?sessionStorage.lang = "cn":sessionStorage.lang = "en"; 
		location.href = "../../index.html";
	})
	var typeid = $.getUrlParam('typeid');
	var parentid = $.getUrlParam('parentid');
	vm.typeid = typeid;
	vm.parentid = parentid;
	var param = {
		lang: vm.lang,
	}
	apiAjax("home", param, "GET", home);
	var param1 = {
		lang: vm.lang,
		arctype_id: vm.parentid
	}
	apiAjax("home", param1, "GET", smallNav);
	var aid = $.getUrlParam('aid');
	console.log(aid);
	var param2 = {
		  aid: aid, 
	}
	apiAjax("articleDetail", param2, "GET", articleDetail,articleDetailError);
 
	$(".gtop").on("click", function() {
		window.scrollTo(0, 0);
	})
})
function home(ret) {
	if(ret.data) {
		console.log(ret);
		vm.navBar = ret.data;
	}
} 
function smallNav(ret) {
	if(ret.data) {
		console.log(ret.data[0].childList);
		console.log(vm.typeid);
		vm.smallNav = ret.data[0].childList;
		for(var i = 0; i< vm.smallNav.length; i++){
			if(vm.typeid == vm.smallNav[i].id){ 
				vm.position = vm.smallNav[i].typename;
				console.log(vm.smallNav[i].typename);
				return false;
			}
		}
	}
} 
function articleDetail(ret) {
	if(ret.data) {
		console.log(ret);
		vm.detail = ret.data.detail;
		vm.after = ret.data.after;
		vm.front = ret.data.front; 
		vm.recomList = ret.data.recomList; 
//		vm.detailCont = ret.data.detail.content;  
//		console.log(vm.detailCont); 
		vm.detailCont = ret.data.detail.content.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;nbsp;/g,' ').replace(/&quot;/g,'"').replace(/&amp;/g,'&');
		vm.specialList = ret.data.specialList; 
		var seo_title = ret.data.seo_title;
		var seo_description = ret.data.seo_description;
		var seo_keywords = ret.data.seo_keywords;
		if(seo_title){
			document.title = seo_title;
		}
		if(seo_description){ 
			$("meta[name='description']").attr('content',seo_description);
			console.log($("meta[name='description']").attr('content')); 
		}
		if(seo_keywords){
			$('meta[name="keywords"]').attr('content',seo_keywords);
		}
	}
}
function articleDetailError(err) {
		console.log(err);
}
//搜索
function search(){
	var keywords = $("#keywords").val();
    console.log(keywords);
    var typeid = vm.typeid;  
 	var parentid = vm.parentid; 
 	var url = window.location.protocol + "//" +document.domain + "/html/index/newsList.html?typeid="+ typeid + "&parentid="+ parentid+ "&keywords="+ keywords; 
 	console.log(url);
 	location.href = url;
}