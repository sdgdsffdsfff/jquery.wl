/**
 * Author:ZengWeilong
 * V1.4
 **/
(function ($) {
	$.fn.countdown = function(options) {
		var dfault = {
			cpBy: "ALong",  
			serverTime: '2010-01-01 00:00:01',
			scheduleTime:'2010-01-01 00:00:00',
			intoclass:"goToClassroomBtn",
			cancel:"cancel-a-font",
			server:false,
			getTime:function(str) {
				str = (str).replace(/-/g, "/");
				var dates = new Date(str);
				var times = dates.getTime();
				return times;
			},
			countfun:function(countSecond) {
				if(countSecond > 0) {
					var second = Math.floor(countSecond % 60);
					var minite = Math.floor((countSecond / 60) % 60);
					var hour = Math.floor((countSecond / 3600) % 24);
					var day = Math.floor((countSecond / 3600) / 24);
					var dayText = " days ";
					if(day <= 1){dayText=" day ";}
					var hourText = " hours ";
					if(hour <= 1){hourText = " hour ";}
					var miniteText = " minutes ";
					if(minite <= 1){miniteText = " minute "; }
					var secondText = " seconds";
					if(second <= 1){secondText = " second ";}
					return "Class Time Count Down: " + day + dayText + hour + hourText + minite + miniteText +second + secondText;
				}else{
					var timeSecond = 0-countSecond;
					var second = Math.floor(timeSecond % 60);
					var minite = Math.floor((timeSecond / 60) % 60);
					var hour = Math.floor((timeSecond / 3600) % 24);
					var day = Math.floor((timeSecond / 3600) / 24);
					return "Class Time: " + minite + "':" + second + "\"";
				}
			}
		};
		var ops = $.extend(dfault,options);
		var elementId = $(this).attr("id");
		var serverTime = ops.getTime(ops.serverTime);
		var scheduleTime = ops.getTime(ops.scheduleTime);
		//��
		var countSecond = (parseInt(scheduleTime) - parseInt(serverTime)) / 1000;
		
		//�������ͬ��ʱ��
		if(ops.server){
			$(window).focus(function(){
				$.ajax({
					url:webPath+"/server.json",
					dataType:"json",
					success:function(result){
						serverTime = ops.getTime(result.serverTime);
						countSecond = (parseInt(scheduleTime) - parseInt(serverTime)) / 1000;
					}
				});
			});
		}
		setTimeout(function() {
			$("."+ops.cancel).show();
			countSecond--;
			//�ٵ�С��1��Сʱ
			if(-60*60 <= countSecond){
				//��ǰ30����
				if(countSecond < 30*60){
					//�ɽ������
					$("#"+ops.intoclass).attr("class","orange ui button");
					if(countSecond <= 0){
						//����ȡ���γ�
						$("."+ops.cancel).remove();
					}
				//���Ͽ�ʱ�����30����
				}else{
					//�ſ��ɽ������
					$("#"+ops.intoclass).attr("class","orange ui button");
				}
				$("#"+elementId).html(ops.countfun(countSecond));
			//�ٵ�����1��Сʱ���γ̽���
			}else{
				//����ȡ���γ�
				$("."+ops.cancel).remove();
				$("#"+elementId).html("Class Over.");
				$("#"+ops.intoclass).attr("class","orange ui button disabled");
			}
			setTimeout(arguments.callee, 1000);
		}, 1000);
 }
})(jQuery);