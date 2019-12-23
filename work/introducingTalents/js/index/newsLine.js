var vm = new Vue({
	el: '#app',
	data: {
		title: "",
		indexText: "首页",
		lang: "cn",
		languageText: "English",
		yourposition: "您的位置",
		newsList:"",
		typeid:"", 
		parentid: "",
		navBar: "",
		position: "",
		keywords: "",       //关键词
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
		articleList(typeid, parentid,level) {
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
			}else if( typeid==19){
                // 人才培训
				var url = "newsLine.html?typeid=" + typeid + "&parentid=" + parentid;
            }else{
				var url = "newsList.html?typeid=" + typeid + "&parentid=" + parentid;
			}    
		 	location.href = url;
		 	//window.open(url);
		},
		articleDetail(aid){
		 	var aid = aid; 
		 	var url = "planDetail.html?aid="+ aid+ "&typeid="+ vm.typeid + "&parentid="+ vm.parentid;
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
			//						//console.log(oTime);
			return oTime;
		}
	},
});
$(function() { 
	$(".chinese").on("click",function(){ 
		vm.lang == "en"?sessionStorage.lang = "cn":sessionStorage.lang = "en";  
		location.href = "../../index.html";
	})
	var typeid = $.getUrlParam('typeid');
	var parentid = $.getUrlParam('parentid');
	var keywords = "";
	if($.getUrlParam('keywords')){
		keywords = $.getUrlParam('keywords').replace(/\'/g, "");
	}  
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
	//console.log(keywords);
	var param2 = {
		lang: vm.lang,
		limit: 12,
		typeid: typeid,
		page: 1,
		keywords: keywords,
	}
	apiAjax("articleList", param2, "GET", articleList);

	$(".gtop").on("click", function() {
		window.scrollTo(0, 0);
	})
})

function home(ret) {
	if(ret.data) {
		//console.log(ret);
		vm.navBar = ret.data;
	}
} 
function smallNav(ret) {
	if(ret.data) {
		vm.smallNav = ret.data[0].childList;
		for(var i = 0; i< vm.smallNav.length; i++){
			if(vm.typeid == vm.smallNav[i].id){ 
				vm.position = vm.smallNav[i].typename;
				return false;
			}
		}
	}
} 
function articleList(ret) {
	if(ret.data) {
		//console.log(ret);
		vm.count = ret.data.count; 
		vm.newsList = ret.data.list; 
		var seo_title = ret.data.seo_title;
		var seo_description = ret.data.seo_description;
		var seo_keywords = ret.data.seo_keywords;
		if(seo_title){
			document.title = seo_title;
		}
		if(seo_description){ 
			$("meta[name='description']").attr('content',seo_description);
		}
		if(seo_keywords){
			$('meta[name="keywords"]').attr('content',seo_keywords);
		}
		vm.title = ret.data.seo_title;
		if(ret.data.count == 0){
			vm.newsList = "";
		}else{
			createPagination(ret.data.count);
		}
	}
}
function articleList1(ret) {
	if(ret.data) {
		//console.log(ret);   
		vm.newsList = ret.data.list;  
	}
}

function articleListError(err) {
	//console.log(err);
}

function createPagination(num) {
	var container = $('#pagination');
	var sources = function() {
		var result = [];
		for(var i = 1; i <= num; i++) {
			result.push(i);
		}
		return result;
	}();
	var options = {
		dataSource: sources,
		className: 'paginationjs-theme-blue',
		callback: function(response, pagination) {
//			window.console && console.log(response, pagination);
			var dataHtml = '<ul>';
			$.each(response, function(index, item) {
				dataHtml += '<li>' + item + '</li>';
			});
			dataHtml += '</ul>';
			container.prev().html(dataHtml);
			page = pagination.pageNumber;
			//console.log(page);
			var param = {
				lang: vm.lang,
				limit: 12,
				typeid: vm.typeid,
				page: page,
				keywords: vm.keywords,
			} 
			apiAjax("articleList", param, "GET", articleList1);  
		}
	};
	container.addHook('beforeInit', function() {
		window.console && console.log('beforeInit...');
	});
	container.pagination(options);
	container.addHook('beforePageOnClick', function() {
		window.console && console.log('beforePageOnClick...');
	});
	return container;
}
//搜索
function search(){
	var keywords = $("#keywords").val();
	vm.keywords = keywords; 
	var param = {
		lang: vm.lang,
		limit: "",
		typeid: vm.typeid,
		page: 1,
		keywords: keywords,
	} 
	apiAjax("articleList", param, "GET", articleList);
}
var bodyH = $("body").height();
var headerH = $(".header").height();
var navBarH = $(".navBar").height();
var footerH = $(".footer").height();
var bottomH = $(".bottom").height();
var mainH = bodyH - headerH - navBarH -footerH - bottomH - 170;  
$(".main").css({"min-height":mainH});