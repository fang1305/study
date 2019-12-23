var vm = new Vue({
	el: '#app',
	data: {
		indexText: "首页",
		lang: "cn",
		languageText: "中文",
		newsList: "",
		typeid: "",
		parentid: "",
		navBar: "",
		position: ""
	},
    created() {
        if(sessionStorage.lang == 'en'){
            this.lang = 'en';
		    this.languageText = "中文";
		    this.indexText = "Index";  
		}else{ 
			sessionStorage.lang == 'cn';
		} 
    },
	methods: {
		language: function(lang) {
			if(lang == "cn") {
				vm.lang = "en";
				vm.languageText = "English";
				vm.indexText = "Index";
				sessionStorage.lang = "en";
			} else {
				vm.lang = "cn";
				vm.languageText = "中文";
				vm.indexText = "首页";
				sessionStorage.lang = "cn";
			}
			var param = {
				lang: vm.lang,
			}
			apiAjax("home", param, "GET", home);
			var param1 = {
				lang: vm.lang,
				arctype_id: vm.parentid
			}
			apiAjax("home", param1, "GET", smallNav);
			var param2 = {
				lang: vm.lang,
				limit: 12,
				typeid: vm.typeid,
				page: 1,
				keywords: "",
			}
			apiAjax("articleList", param2, "GET", articleList);
		},
		articleList: function(typeid, parentid) {
			var typeid = typeid;
			var parentid = parentid;
			if( typeid==11 || typeid == 50){  
			    var url = "http://ku.hbafea.com/html/home/expertTalents.html";
			}else if( typeid==13 || typeid == 51){  
			    var url = "http://ku.hbafea.com/html/home/technology.html";
			}else if( typeid==15 || typeid == 52){  
			    var url = "http://ku.hbafea.com/html/home/cooperativeAgency.html";
			}else{
				var url = "newsList.html?typeid=" + typeid + "&parentid=" + parentid;
			} 
			location.href = url;
			//window.open(url);
		},
		articleDetail: function(aid, typeid, parentid) {
			var aid = aid;
			var typeid = typeid;
			var parentid = parentid;
			var url = "newsDetail.html?aid=" + aid + "&typeid=" + typeid + "&parentid=" + parentid;
			window.open(url);
		}
	},
	filters: {
		getDate: function(str) {
			var oDate = new Date(str * 1000),
				oYear = oDate.getFullYear(),
				oMonth = oDate.getMonth() + 1,
				oDay = oDate.getDate(),
				oHour = oDate.getHours(),
				oMin = oDate.getMinutes(),
				oSec = oDate.getSeconds(),
				oTime = oYear + '-' + oMonth + '-' + oDay; //最后拼接时间
			//						console.log(oTime);
			return oTime;
		}
	},
});
$(function() { 
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
	var param2 = {
		lang: vm.lang,
		limit: 12,
		typeid: typeid,
		page: 1,
		keywords: "",
	}
	apiAjax("articleList", param2, "GET", articleList);
})

function smallNav(ret) {
	if(ret.data) {
		console.log(ret.data[0].childList);
		vm.smallNav = ret.data[0].childList;
	}
}  

function home(ret) {
	if(ret.data) {
		console.log(ret);
		vm.navBar = ret.data;
		var list = "";
		console.log(vm.lang);
		if(vm.lang == "en") {
			list += '<li class="indexPage"><a href="index.html">Index</a></li>';
		} else {
			list += '<li class="indexPage"><a href="index.html">首页</a></li>';
		}
		for(var i = 0; i < ret.data.length; i++) {
			list += '<li>' +
				'<a>' + ret.data[i].typename + '</a>' +
				'<ul class="dl-submenu">' +
				'<li class="dl-back"><a href="#">返回上一级</a></li> ';
			for(var j = 0; j < ret.data[i].childList.length; j++) {
				list += '<li onclick="articleList1(' + ret.data[i].childList[j].id + ',' + ret.data[i].id + ')"><a>' + ret.data[i].childList[j].typename + '</a></li>';
			}
			list += '</ul>' +
				'</li>';
		}
		$(".dl-menu").html(list);
		$('#dl-menu').dlmenu();
	}
}

function articleList1(typeid, parentid) {
	var typeid = typeid;
	var parentid = parentid;
	var url = "newsList.html?typeid=" + typeid + "&parentid=" + parentid; 
	location.href = url; 
}

function articleList(ret) {
	if(ret.data) {
		console.log(ret);
		vm.count = ret.data.count;
		vm.newsList = ret.data.list;
		console.log(vm.newsList);
		if(ret.data.count == 0) {
			vm.newsList = "";
		}
	}
}
 

var bodyH = $("body").height();
var headerH = $(".header").height(); 
var footerH = $(".footer").height();
var bottomH = $(".bottom").height();
var mainH = bodyH - headerH -footerH - bottomH - 280; 
$(".main").css({"min-height":mainH});
