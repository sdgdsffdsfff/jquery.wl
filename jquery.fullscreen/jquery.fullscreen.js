/**
 * Author:ZengWeilong
 * V1.4
 **/
(function ($) {
	$.fn.fullscreen = function(options) {
		var setting = {
			screen:true
		};
		var json = $.extend({},setting,options);
		var elementId = $(this).attr("id");
		/*���߷�װ*/
		var util = {
				fullscreen:function(){  
					elem=document.getElementById(elementId);  
					if(elem.webkitRequestFullScreen){  
						elem.webkitRequestFullScreen();     
					}else if(elem.mozRequestFullScreen){  
						elem.mozRequestFullScreen();  
					}else if(elem.requestFullScreen){  
						elem.requestFullscreen();  
					}else{  
						//�������֧��ȫ��API���ѱ�����  
					}  
				},
				exitFullscreen:function(){  
					var elem=document;  
					if(elem.webkitCancelFullScreen){  
						elem.webkitCancelFullScreen();      
					}else if(elem.mozCancelFullScreen){  
						elem.mozCancelFullScreen();  
					}else if(elem.cancelFullScreen){  
						elem.cancelFullScreen();  
					}else if(elem.exitFullscreen){  
						elem.exitFullscreen();  
					}else{  
						//�������֧��ȫ��API���ѱ�����  
					}  
				} 
		};
		if(json.screen){
			util.fullscreen();
		}else{
			util.exitFullscreen();
		}
 }
})(jQuery);

