define(function(require, exports, module) {

    require.async(['./jquery.2.1.4.min.js', './left_lct.js'], function() {
        $(function() {
            //start
            var apiUrl = {
                "operator_modular": "http://datasea.csqccr.com/operation/", //操作符模块
                "model_modular": "http://datasea.csqccr.com/model/", //model模块
                "action_modular": "http://datasea.csqccr.com/action/" //行为模块
            };
            var returnStatus = function(el) {
                if (el == true) {
                    return "启用";
                } else {
                    return "禁用";
                };
            };
            var returnStatus2 = function(el) {
                if (el == 1) {
                    return "静态";
                } else {
                    return "动态";
                };
            };
            var windowWidth = $(window).width();
            $('.add').click(function(event) {
                /* Act on the event */
                $('.xgczbf').hide();
                $('.btn_p_2').show();
                arrayAdd = [];
                $('.sp_xznr').text('');
                $('.ilistp').show();
                var _this = $(this);
                var docHeight = $(document).height();
                $('.out_mask').width(windowWidth).height(docHeight);
                $('.out_mask,.fixed_popup2').show();

            });
            // 确定操作
            $('.btn_p_2 .btn_qd').click(function() {
                var actionName = $('.actionName').val();
                var actionType = $('.xwlx_radio1:checked').val();
                var statusVal = $('.inputradio:checked').val();
                var _this = $(this);

                var actionId = "";

                var isPublic = $('.inputradio_gk:checked').val();
                operation = {
                    "actionId": actionId,
                    "actionName": actionName,
                    "actionType": actionType,
                    "status": statusVal
                };
                var dataInfo = JSON.stringify(operation);
                console.log(dataInfo);
                var _thisType = _this.attr('data-type');
                var apiGet = apiUrl.action_modular + "insert.json?action=" + dataInfo;
                if(actionName==""){
                     $('.tishi').show().text('名称不能为空！');
                            var t = setTimeout(function() {
                                $('.tishi').hide().text('');
                              
                            }, 1000);
                            return;
                };
                $.ajax({
                    type: "get",
                    async: false,
                    url: apiGet,
                    dataType: "jsonp",
                    jsonp: "callback",
                    jsonpCallback: "operation",
                    success: function(data) {
                        console.log(data)
                        var dataInfo = data;
                        if (data.result.success) {
                            $('.tishi').show().text(data.result.statusText);
                            var t = setTimeout(function() {
                                $('.tishi').hide().text('');
                                window.location.reload();
                            }, 1000);
                        } else {
                            $('.tishi').show().text(data.result.statusText);
                            var t = setTimeout(function() {
                                $('.tishi').hide().text('');
                            }, 1000);
                        };
                    },
                    error: function(error) {
                        console.log(error);
                    }
                });


            });
            // 确定操作
            //关闭-取消-操作

            $('.closex2,.gbl,.gbl2').click(function(event) {
                /* Act on the event */
                var html_qy = '<div class="infoi_left">是否启用:</div>' +
                    '<div class="infoi_right">' +
                    '<input type="radio" name="status" value="1" class="inputradio radio1" />启用' +
                    '<input type="radio" name="status" value="0" class="inputradio radio2" />禁用</div>';
                var xwlx_radio = '<div class="infoi_left">行为类型:</div>' +
                    '<div class="infoi_right">' +
                    '<input type="radio" name="actionType" value="1" class="xwlx_radio1 radio1" />静态' +
                    '<input type="radio" name="actionType" value="2" class="xwlx_radio1 radio2" />动态' +
                    '</div>';
                $('.actionName').val('');

                $('.statusoutqy').html(html_qy);
                $('.xwlx_radio').html(xwlx_radio);
                $('.out_mask,.fixed_popup2').hide();

            });
            //关闭-取消-操作
            /*分页插件*/
            var makeHtmlMarket = function(ary, length) {
                var htmlMarket = "";
                for (var i = 0; i < length; i++) {

                    htmlMarket += ' <div class="parts_5">' +
                        '<div class="part_01">' + ary[i].actionId + '</div>' +
                        '<div class="part_01 ">' + ary[i].actionName + '</div>' +

                        '<div class="part_01">' + returnStatus2(ary[i].actionType) + '</div>' +
                        '<div class="part_01">' + returnStatus(ary[i].status) + '</div>' +
                        '<div class="part_01 xgcz" data-id="' + ary[i].actionId + '">' +
                        '<div class="czp"></div>' +
                        '</div>' +
                        '</div>';
                }
                return htmlMarket;
            };

            var aspnetPager = function(totalPage, pno) {
                //生成分页1
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

            var getParmas = function(pageNo, pageSize, actionId, actionName, actionType, status) {
                var returnObj = {
                    "pageNo": pageNo || 1,
                    "pageSize": pageSize || 10,
                    "actionId": actionId || "",
                    "actionName": actionName || "",
                    "actionType": actionType || "",
                    "status": status || 1
                };
                return returnObj;
            };
            //查询数据
            var marketDefault = function(pageNo, pageSize, actionId, actionName, actionType, status) {
                var condition = getParmas(pageNo, pageSize, actionId, actionName, actionType, status);
                var conditionInfo = JSON.stringify(condition);
                $.ajax({
                    type: "get",
                    async: false,
                    url: apiUrl.action_modular + "list.json?condition=" + conditionInfo,
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
            marketDefault(1, 10);
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
            // 点击查询数据
            $('#click_cx').click(function(event) {
                /* Act on the event */
                var actionId = $('.input_cx_id').val();
                var xwlx = $('.se_lx').val();
                var input_cx_xwmc = $('.input_cx_xwmc').val();
                var se_lx = $('.se_lx').val();
                //pageNo, pageSize, actionId, actionName, actionType, status
                marketDefault(1, 10, actionId, input_cx_xwmc, se_lx);
            });
            // 点击查询数据

            //点击修改操作
            $(document).on('click', '.xgcz', function(event) {
                event.preventDefault();
                $('.xgczbf').show();
                $('.btn_p_2').hide();
                /* Act on the event */
                var _this = $(this);
                var docHeight = $(document).height();
                $('.out_mask').width(windowWidth).height(docHeight);
                $('.out_mask,.fixed_popup2').show();
                _thisId = _this.attr('data-id');
                //查询
                $.ajax({
                    type: "get",
                    async: false,
                    url: apiUrl.action_modular + "detail.json?actionId=" + _thisId,
                    dataType: "jsonp",
                    jsonp: "callback",
                    success: function(data) {
                        var dataInfo = data.result;
                        if (dataInfo.success) {
                            var returnInfo = dataInfo.data;
                            var actionId = returnInfo.actionId;
                            var actionName = returnInfo.actionName;
                            var actionType = returnInfo.actionType; //1静态2动态
                            var status = returnInfo.status;
                            $('.actionName').val(actionName);
                            if (actionType == 1) {
                                $('.xwlx_radio .radio1').attr('checked', true);
                            } else {
                                $('.xwlx_radio .radio2').attr('checked', true);
                            };

                            if (status) {
                                $('.statusoutqy .radio1').attr('checked', status);
                            };
                            //修改确定
                            $('.xgczbf .qdxgbtn').click(function(event) {
                                /* Act on the event */
                                var actionName = $('.actionName').val();
                                var actionType = $('.xwlx_radio1:checked').val();
                                var statusVal = parseInt($('.inputradio:checked').val());
                                var _this = $(this);
                                var actionId = _thisId;
                                var isPublic = $('.inputradio_gk:checked').val();
                                operation = {
                                    "actionId": actionId,
                                    "actionName": actionName,
                                    "actionType": actionType,
                                    "status": statusVal
                                };
                                var dataInfo = JSON.stringify(operation);
                                var _thisType = _this.attr('data-type');
                                var apiGetUpdate = apiUrl.action_modular + "update.json?action=" + dataInfo;
                                $.ajax({
                                    type: "get",
                                    async: false,
                                    url: apiGetUpdate,
                                    dataType: "jsonp",
                                    jsonp: "callback",
                                    jsonpCallback: "Update",
                                    success: function(data) {

                                        var dataInfo = data;
                                        if (data.result.success) {
                                            $('.tishi').show().text(data.result.statusText);
                                            var t = setTimeout(function() {
                                                $('.tishi').hide().text('');
                                                window.location.reload();
                                            }, 1000);
                                        } else {
                                            $('.tishi').show().text(data.result.statusText);
                                            var t = setTimeout(function() {
                                                $('.tishi').hide().text('');
                                            }, 1000);
                                        };
                                    },
                                    error: function(error) {
                                        console.log(error);
                                    }
                                });
                            });
                            //修改确定

                        } else {
                            $('.tishi').show().text(data.result.statusText);
                            var t = setTimeout(function() {
                                $('.tishi').hide().text('');
                                window.location.reload();
                            }, 1000);
                        }
                    },
                    error: function(error) {
                        console.log(error);
                    }
                });
            });
            //点击修改操作
            //end
        });

    });
});
