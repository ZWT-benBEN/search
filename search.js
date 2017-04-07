;(function($){
	$.fn.search = function(options){
		// 默认配置
		var defaults = {
			schinput: '.input_src',//input搜索框
			schlist: '#searchlist',//搜索匹配列表
			itemCN:'item',//li类名
			addCN: 'active',//状态类名
			schdata:[],//获取回来的数据
		}
		var sets = $.extend ({}, defaults, options || {});
		var schinput = $(sets.schinput);
		var schlist = $(sets.schlist);
		var schdata = sets.schdata;
		var itemCN = sets.itemCN;
		var addCN = sets.addCN;

		// input框keyup事件
		schinput.keyup(function(){
			getContent(this);
		})
		// 键盘keydown事件
		$(document).keydown(function(e){
			e = e || window.event;
			var keycode = e.which ? e.which : e.keycode;
			if(keycode ===38){
				if(jQuery.trim(schlist.html())===''){
					return;
				}
				movePrev();
			}else if(keycode === 40){
				if(jQuery.trim(schlist.html())===''){
					return;
				}
				schinput.blur();
				if($('.'+itemCN).hasClass(addCN)){
					moveNext();
				}else{
					$('.'+itemCN).removeClass(addCN).eq(0).addClass(addCN);
				}
			}else if(keycode === 13){
				dojob();
			}
		});
		// 向上选择
		var movePrev = function(){
			schinput.blur();
			var index = $('.'+addCN).prevAll().length;
			if(index === 0){
				$('.'+itemCN).removeClass(addCN).eq($('.'+itemCN).length-1).addClass(addCN);
			}else{
				$('.'+itemCN).removeClass(addCN).eq(index-1).addClass(addCN);
			}
		}
		// 向下选择
		var moveNext = function(){
			var index = $('.'+addCN).prevAll().length;
			if(index === $('.'+itemCN).length-1){
				$('.'+itemCN).removeClass(addCN).eq(0).addClass(addCN);
			}else{
				$('.'+itemCN).removeClass(addCN).eq(index+1).addClass(addCN);
			}
		}
		// 回车选中
		var dojob = function(){
			schinput.blur();
			var value = $('.'+addCN).text();
			schinput.val(value);
			schlist.hide().html('');
		}
		// 匹配插入
		function getContent(obj){
			var sput = jQuery.trim($(obj).val());
			if(sput === ''){
				schlist.hide().html('');
				return false;
			}
			var html = '';
			for(var i = 0; i < schdata.length; i++){
				if(schdata[i].indexOf(sput) >=0){
					html = html + "<div class="+itemCN+" onmouseenter='getFocus(this)' onclick='getCon(this)'>" + schdata[i] + "</div>";
				}
			}
			if(html != ''){
				schlist.show().html(html);
			}else{
				schlist.hide().html('');
			}
		}
		// 鼠标移入对应效果函数
		getFocus = function(obj){
			$('.'+itemCN).removeClass(addCN);
			$(obj).addClass(addCN);
		}
		// 鼠标点击选中函数
		getCon = function(obj){
			var value = $(obj).text();
			schinput.val(value);
			schlist.hide().html('');
		}
		
	}
}(jQuery));