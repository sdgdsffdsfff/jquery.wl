/**
 * Author:ZengWeilong
 * V1.4
 **/
(function ($) {
	$.fn.countdown = function(options) {
		var setting = {
			staticTime:'2010-01-01 00:00:00',	/*Ŀ��ʱ��*/
			serverTime: '2010-01-01 00:00:01', 	/*���ʱ��*/
			before:1*60,						/*��λ��,��ʱ��ǰ��������ʾbeforeId*/
			beforeId:"beforeId",				/*����ʱ����ʾ��DemoId*/
			longtime:1*60,						/*���ü�ʱ�೤ʱ����ʾOVER*/
			afterId:"afterId",					/*���ü�ʱ��Ҫ���ص�DemoId*/
			server:false,						/*�Ƿ�ͬ��*/
			url:"/server.json",					/*ͬ����URL*/
			format:false,
			countfun:function(countSecond) {	/*�÷����ɸ�д��ʾ���ݣ�����Ϊ��ǰ������ֵ*/			
				var timeSecond = Math.abs(countSecond);
				var second = Math.floor(timeSecond % 60);
				var minite = Math.floor((timeSecond / 60) % 60);
				var hour = Math.floor((timeSecond / 3600) % 24);
				var day = Math.floor((timeSecond / 3600) / 24);
				if(options.format){
					if(countSecond <= 30 * 60){	
						/*С�ڰ�Сʱ*/
						return 'Class Time Count Down: ' + minite + "':" + second + '"';
					}else{/*���ڰ�Сʱ*/
						return "Class Time: Too early";
					}
				}
				if(countSecond > 0) {
					var dayText = " days ",hourText = " hours ",miniteText = " minutes ",secondText = " seconds";
					if(day <= 1) dayText=" day ";
					if(hour <= 1) hourText = " hour ";
					if(minite <= 1) miniteText = " minute ";
					if(second <= 1) secondText = " second ";
					return "CountDown: " + day + dayText + hour + hourText + minite + miniteText +second + secondText;
				}else{
					return 'StartTime: ' + minite + "':" + second + '"';
				}
				
			}
		};
		var json = $.extend({},setting,options);
		
		/*���߷�װ*/
		var util = {
			show:function(ss,cs){
				if(ss)$("#"+json.beforeId).show();else $("#"+json.beforeId).hide();
				if(cs)$("#"+json.afterId).show();else $("#"+json.afterId).hide();
			},
			getTime:function(str) {
				str = str.replace(/-/g, "/");
				var dates = new Date(str);
				var times = dates.getTime();
				return times;
			}
		};
		var elementId = $(this).attr("id");
		var serverTime = util.getTime(json.serverTime);
		var staticTime = util.getTime(json.staticTime);
		/*�������*/
		var countSecond = (staticTime - serverTime) / 1000;
		
		/*������ʱ��ͬ��*/
		if(json.server){
			$(window).focus(function(){
				$.ajax({
					url:json.url,
					dataType:"json",
					success:function(result){
						serverTime = util.getTime(result.serverTime);
						/*���¼������*/
						countSecond = (staticTime - serverTime) / 1000;
					}
				});
			});
		}
		/*����ʱ����*/
		setTimeout(function() {
			countSecond--;
			/*��ʱ��1��������*/
			if( countSecond  >= (0-json.longtime)){
				/*����0С��1����ȫ����ʾ*/
				util.show(true,true);
				if(countSecond > json.before){
					/*�뵹��ʱ����1���Ӳ��ɽ���,����ȡ��*/
					util.show(false,true);
				}else if(countSecond < 0){
					/*����ʱ��ʼ:����ȡ�������ɽ���*/
					util.show(true,false);
				}
				$("#"+elementId).html(json.countfun(countSecond));
				setTimeout(arguments.callee, 1000);
			}else{
				/*�ٵ�����1���ӣ��γ̽���*/
				util.show(true,false);
				$("#"+elementId).html("OVER");
			}
		}, 1000);
 }
})(jQuery);