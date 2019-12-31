//登录
function loginFun(){
    $.ajax({
        url:'http://dev-www.imgaozhao.com/index.php?r=api/login/index',
        type:'post',
        data:{
            "user_name":$('.userName').val(),
            "password":$('.passName').val()
        },
        dataType:'json',
        success:function(data){
            if(data.errcode == 0){
                //登录成功
                if($('.remember').prop('checked')){
                    localStorage.setItem('userName',$('.userName').val());
                    localStorage.setItem('password',$('.passName').val());
                }
                $('.loginWrap .error').hide();
                alert('登录成功')
                window.location.reload();
            }else{
                $('.loginWrap .error').show();
            }
        }
    })
}
//热门推荐
function popular(){
		var html="";
		$.ajax({
			url:"http://dev-www.imgaozhao.com/index.php?r=api/course/recommend",
            type:"get",
            dataType: "json",
            success:function(data){
            	for(var i=0;i<data.res.length;i++){
					html+='<div class="hot_part">\
					<a href="###" value='+data.res[i].id+'>\
						<img src='+data.res[i].img+' alt="" width="100%" height="180px">\
						<div class="hot_info">'+data.res[i].title+'</div></a></div>'
            	}
            	$('.hotList').html(html);
            },
            error:function(e){
        	}
    	});
	}
//激活VIP
function activedVip(num,pass){
    $.ajax({
        type:"post",
        url:"http://dev-www.imgaozhao.com/index.php?r=api/forecast/activate",
        data:{"entrance_num":num,"entrance_pss":pass},
        dataType: "json",
        success:function(data){
            data = {
                "errcode": 1,
                "errmsg": "卡号或密码错误 | 激活成功",
                "res": ""
            }
            if(data.errcode==1){
                alert(data.errmsg)
            }else if(data.errcode==0){
                wrap($('.wrap_part'),$('.wrap_success'));
            }
        },
        error:function(e){
        }
    })
}

//链接上带着的字符
    function parse(search){
        //从第二个字符开始截取   ，获取到第二个开始后面所有的字符
        var str=search.substring(1);
        var result={};
        //分割字符串  -->产生字符串数组
        var strs=str.split("&");
        //遍历数组中的每一个元素
        strs.forEach(function(v){
            //伪代码：v="age=18"
            var keyvalue=v.split("=");
            var name=keyvalue[0];
            var value=keyvalue[1];
            result[name]=value;
        })
        console.log(result)
        return result;
    }
//打开志愿大师弹出框
function openVip(){
    $('.wrap').show()
    $('.wrap_content').animate({top:"50%"},"normal");
}
//判断用户是否开通志愿大师VIP
function isVIP(){
    var code = 0;
    $.ajax({
        url:'http://dev-www.imgaozhao.com/index.php?r=api/forecast/judge-entrance',
        dataType:'json',
        type:'get',
        success:function(data){
            code = data.errcode;
        }
    })
}