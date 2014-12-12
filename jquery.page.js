/**
 *  功能说明：分页插件
 *  Function: Page
 *  Vision: 0.1
 *  Author: dengyukeji.com (guandengyu@gmail.com)
 */
/*
<ul class="pagination"><li class="active"><a href="#">1 <span class="sr-only">(current)</span></a></li><li><a href="/Admin/CodeMaster?page=2">2</a></li> <li><a href="/Admin/CodeMaster?page=3">3</a></li> <li><a href="/Admin/CodeMaster?page=2">&gt;</a></li> </ul>
*/
(function ($) {
	jQuery.fn.page = function (options) {
		var defaults = {
			currentpage: 1,
			pageCount: 0,
			totalCount: 0,
			pageSize: 20,
			divPoint: 5,
            pageParamName: 'page',
		};
		var options = $.extend(defaults, options);
		$(this).html(creatPage());
		function creatPage(){
			if(options.totalCount % options.pageSize == 0){
				options.pageCount = options.totalCount / options.pageSize;
			}else{
				options.pageCount = parseInt(options.totalCount / options.pageSize) + 1;
			}
			if (options.currentpage > options.pageCount)
			    options.currentpage = options.pageCount;
			var strHtml = '', prevPage = parseInt(options.currentpage) - 1, nextPage = parseInt(options.currentpage) + 1, startPage = 0, endPage = 0;
			if (options.pageCount <= 1)
			    return;
			var url = window.location.href;
			var temp_url = location.search;
			if (temp_url != '') {
			    var arr_temp_url = temp_url.split('&');
			    var pflag = true;
			    for (var i = 0; i < arr_temp_url.length; i++) {
			        if (arr_temp_url[i].indexOf(options.pageParamName + '=') > -1) {
			            arr_temp_url[i] = options.pageParamName + "=(p)";
			            pflag = false;
			            break;
			        }
			    }
			    if (pflag)
			        arr_temp_url.push(options.pageParamName + "=(p)");
			    if (arr_temp_url.length == 1)
			        url = window.location.pathname  + '?' + arr_temp_url.join('&');
                else
			        url = window.location.pathname + arr_temp_url.join('&');
			} else {
			    url += '?' + options.pageParamName + '=(p)';
			}
			if (prevPage > 1) {
			    strHtml += '<li><a href="' + url.replace('(p)', prevPage) + '">&lt;</a></li>';
			}
			startPage = options.currentpage - 2;
			endPage = options.currentpage + 2;
			if (endPage > options.pageCount) {
			    endPage = options.pageCount;
			    startPage = endPage - options.divPoint;
			}
			if (startPage < 1)
			    startPage = 1;
			if (options.pageCount > options.divPoint && (endPage - startPage) < 4)
			    endPage = options.divPoint;
			for (var i = startPage; i <= endPage ; i++) {
				if (i > options.pageCount) break;
				if (i == options.currentpage) {
					strHtml += '<li class="active"><a href="#">' + i + '</a></li>';
				} else {
				    strHtml += '<li><a href="' + url.replace('(p)', i) + '">' + i + '</a></li>';
				}
			}
			if (nextPage < options.pageCount) {
			    strHtml += '<li><a href="' + url.replace('(p)', nextPage) + '">&gt;</a></li>';
			}
			strHtml = '<ul class="pagination">' + strHtml + '</ul>';
			return strHtml;
		}
	};
})(jQuery);
