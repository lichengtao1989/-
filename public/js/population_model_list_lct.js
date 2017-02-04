		define(function(require, exports, module) {

		    require.async(['./jquery.2.1.4.min.js', './left_lct.js'], function() {

		    	     var apiUrl = {
		                "operator_modular": "http://datasea.csqccr.com/operation/", //操作符模块
		                "model_modular": "http://datasea.csqccr.com/model/", //model模块
		                "action_modular": "http://datasea.csqccr.com/action/", //行为模块
		                "model_column": "http://datasea.csqccr.com/model/", //行为模块/model/column.json?modelId=4
		                "element_column": "http://datasea.csqccr.com/element/", //element模块
		                "group": "http://datasea.csqccr.com/group/" //分群新增
		            }
		            //执行
		            $.ajax({
		                type: "get",
		                async: false,
		                url: apiUrl.group + "list.json?condition={}",
		                dataType: "jsonp",
		                jsonp: "callback",
		                jsonpCallback: "group",
		                success: function(data) {
		                    var dataInfo = data;
		                   console.log(dataInfo);
		                },
		                error: function(error) {
		                    console.log(error);
		                }
		            });


		            var kong=function(k){
		            	if(k==''||k==undefined||k==null){
		            		return '无';
		            	}else{
		            		return k;
		            	}
		            };
		            var isnot=function(is){
		            	if(is==false||is=='false'){
		            		return "否";
		            	}else{
		            		return "是";
		            	};
		            };


 /*分页插件*/
            var makeHtmlMarket = function(ary, length) {
                var htmlMarket = "";
                for (var i = 0; i < length; i++) {

                    htmlMarket += ' <div class="parts_5" data-dayKey="'+ary[i].dayKey+'" data-tableName="'+ary[i].tableName+'" data-totalResult="'+ary[i].totalResult+'">' +
                        '<div class="part_01">' + ary[i].groupId + '</div>' +
                        '<div class="part_01">' + ary[i].groupName + '</div>' +
                        '<div class="part_01">' + kong(ary[i].cron) + '</div>' +
                        '<div class="part_01 " >' + isnot(ary[i].isCycle) + '</div>' +
                        '<div class="part_01 ov ">' + isnot(ary[i].isPublic)  + '</div>' +
                        '<div class="part_01">' +isnot(ary[i].isPush)+ '</div>' +
                        '<div class="part_01">' + isnot(ary[i].status) + '</div>' +
                        
                        '</div>';
                }
                return htmlMarket;
            };
var pageSize=$('#select001').val();
            var aspnetPager = function(totalPage, pno) {
                //生成分页1
                var pageSize=$('#select001').val();
                laypage({
                    cont: 'myPage', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                    pages: totalPage, //通过后台拿到的总页数
                    curr: pno, //当前页
                    groups: 5, //连续显示分页数
                    skip: true, //是否开启跳页
                    skin: '#30a0ff',
                    first: '首页', //若不显示，设置false即可
                    last: '尾页', //若不显示，设置false即可
                    jump: function(obj, first) { //触发分页后的回调
                        if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                            marketDefault(obj.curr,pageSize);
                      
                        }
                    }
                });
            };
            /*分页插件*/

            var getParmas = function(pageNo, pageSize, groupName,groupId) {
                var returnObj = {
                    "pageNo": pageNo || 1,
                    "pageSize": pageSize || 10,
                    "groupName": groupName || "",
                    "groupId": groupId || ""
                };
                return returnObj;
            };
            //查询数据
            var marketDefault = function(pageNo, pageSize, groupName,groupId) {
                var condition = getParmas(pageNo, pageSize, groupName,groupId);
                var conditionInfo = JSON.stringify(condition);
                $.ajax({
                    type: "get",
                    async: false,
                    url: apiUrl.group + "list.json?condition=" + conditionInfo,
                    dataType: "jsonp",
                    jsonp: "callback",
                    success: function(data) {
                        var dataInfoList = data;
                        if (dataInfoList.result.success) {
                            if (dataInfoList.result.data.resultList.length > 0) {
                                $('.infonull').hide();
                                $('.infodata').show();
                                var resultList = dataInfoList.result.data.resultList;
                                var resultListLength = resultList.length;
                                var totalSize = dataInfoList.result.data.totalSize;
                                var pageSize = dataInfoList.result.data.pageSize;
                                var totalPage = Math.ceil(totalSize / pageSize); //总共有几页
                                var htmlStr = makeHtmlMarket(resultList, resultListLength);
                                $('.infodata').html(htmlStr);
                                aspnetPager(totalPage, pageNo);
                                $('.operationListP').hover(function(e) {
                                    /* Stuff to do when the mouse enters the element */
                                    var pointX = e.pageX;
                                    var pointY = e.pageY - 40;
                                    var _text = $(this).html();
                                    $('.tipslct').html(_text);
                                    $('.tipslct').show().css({ "left": pointX, "top": pointY });
                                    return false;
                                }, function() {
                                    /* Stuff to do when the mouse leaves the element */
                                    $('.tipslct').hide();
                                    return false;
                                });
                            } else {
                                $('.infonull').show();
                                $('.infodata').hide();
                            };
                        } else {
                            $('.infonull').show();
                            $('.infodata').hide();
                        };
                    },
                    error: function(error) {
                        console.log(error);
                    }
                });
            };
            marketDefault(1, pageSize);
            //查询数据
            //每页显示多少条，change事件
            $('#select001').on('change', function(event) {
                event.preventDefault();
                /* Act on the event */
                var _this = $(this);
                var _thisVal = _this.val();
                marketDefault(1, _thisVal);
            });
            //每页显示多少条，change事件




		    });
		});
