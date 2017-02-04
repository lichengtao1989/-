define(function(require, exports, module) {
    require.async(['./jquery.2.1.4.min.js', './left_lct.js'], function() {
        $(function() {
            //start
            //public
            var apiUrl = {
                "operator_modular": "http://datasea.csqccr.com/operation/", //操作符模块
                "model_modular": "http://datasea.csqccr.com/model/", //model模块
                "action_modular": "http://datasea.csqccr.com/action/", //行为模块
                "model_column": "http://datasea.csqccr.com/model/", //行为模块/model/column.json?modelId=4
                "element_column": "http://datasea.csqccr.com/element/" //element模块

            };
            /*分页插件*/
            var makeHtmlMarket = function(ary, length) {
                var htmlMarket = "";
                for (var i = 0; i < length; i++) {

                    htmlMarket += ' <div class="parts_5">' +
                        '<div class="part_01">' + ary[i].elementId + '</div>' +
                        '<div class="part_01">' + ary[i].actionId + '</div>' +
                        '<div class="part_01">' + ary[i].elementName + '</div>' +
                        '<div class="part_01 " data-title="' + ary[i].elementOperationId + '">' + ary[i].elementOperationId + '</div>' +
                        '<div class="part_01 ov ">' + ary[i].modelId + '</div>' +
                        '<div class="part_01">' + ary[i].elementDataField + '</div>' +
                        '<div class="part_01">' + ary[i].elementDataType + '</div>' +
                        '<div class="part_01 ">' + ary[i].elementDataGroupFields + '</div>' +
                        '<div class="part_01 ">' + ary[i].elementDataHavingFields + '</div>' +
                        '<div class="part_01 xgcz" data-actionId="' + ary[i].actionId + '" data-id="' + ary[i].elementId + '">' +
                        '<div class="czp"></div>' +
                        '</div>' +
                        '</div>';
                }
                return htmlMarket;
            };
var pageSize=$('#select001').val();
            var aspnetPager = function(totalPage, pno) {
                var pageSize=$('#select001').val();
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

            var getParmas = function(pageNo, pageSize, elementId, actionId, elementName, elementOperationId, modelId, elementDataField, elementDataType, elementDataGroupFields, elementDataHavingFields) {
                var returnObj = {
                    "pageNo": pageNo || 1,
                    "pageSize": pageSize || 10,
                    "elementId": elementId || "",
                    "actionId": actionId || "",
                    "elementName": elementName || "",
                    "elementOperationId": elementOperationId || "",
                    "modelId": modelId || "",
                    "elementDataField": elementDataField || "",
                    "elementDataType": elementDataType || "",
                    "elementDataGroupFields": elementDataGroupFields || "",
                    "elementDataHavingFields": elementDataHavingFields || ""

                };
                return returnObj;
            };
            //查询数据
            var marketDefault = function(pageNo, pageSize, elementId, actionId, elementName, elementOperationId, modelId, elementDataField, elementDataType, elementDataGroupFields, elementDataHavingFields) {
                var condition = getParmas(pageNo, pageSize, elementId, actionId, elementName, elementOperationId, modelId, elementDataField, elementDataType, elementDataGroupFields, elementDataHavingFields);
                var conditionInfo = JSON.stringify(condition);
                $.ajax({
                    type: "get",
                    async: false,
                    url: apiUrl.element_column + "list.json?condition=" + conditionInfo,
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


            // 点击查询数据
            $('#click_cx').click(function(event) {
                /* Act on the event */
                var input_cx_id = $('.input_cx_id').val();
                var input_cx_mxmc = $('.input_cx_mxmc').val();
                var input_cx_bm = $('.input_cx_bm').val();
                var statusV = $('.floatse').val();
                console.log(statusV);
                //pageNo, pageSize, modelId, modelName, databaseName, modelTable, status, isPublic
                marketDefault(1, 10, input_cx_id, input_cx_mxmc, "", input_cx_bm, statusV);
            });
            // 点击查询数据
            var windowWidth = $(window).width();
            //点击修改操作
            $(document).on('click', '.xgcz', function(event) {
                event.preventDefault();

                /* Act on the event */
                var _this = $(this);
                var docHeight = $(document).height();
                $('.out_mask').width(windowWidth).height(docHeight);
                $('.out_mask').show();
                _thisId = _this.attr('data-id');
                _thisActiobId = _this.attr('data-actionId');
                console.log(_thisId);
                $(document).on('click', '.qd1', function(event) {
                    event.preventDefault();
                    /* Act on the event */
                    element = {
                        "elementId": _thisId,
                        "elementName": "",
                        "actionId": _thisActiobId,
                        "modelId": "",
                        "elementDataField": "",
                        "elementDataType": "",
                        "elementOperationId": "",
                        "elementDataGroupFields": "",
                        "elementDataHavingFields": "",
                        "elementValueType": "",
                        "elementUnit": "",
                        "status": 0

                    };
                    var dataInfo = JSON.stringify(element);
                    console.log(dataInfo);
                    var apiGet = apiUrl.element_column + "update.json?element=" + dataInfo;
                    //聚合字段组:elementDataGroupFields

                    $.ajax({
                        type: "get",
                        async: false,
                        url: apiGet,
                        dataType: "jsonp",
                        jsonp: "callback",
                        success: function(data) {
                            console.log(data);
                            if (data.result.success) {
                                $('.tishi').show().text(data.result.statusText);
                                var t = setTimeout(function() {
                                    $('.tishi').hide().text('');
                                    window.location.reload();
                                }, 1000);
                            }else{
                                    $('.tishi').show().text(data.result.statusText);
                                var t = setTimeout(function() {
                                    $('.tishi').hide().text('');

                                }, 1000); 
                            }
                        },
                        error: function(error) {
                            console.log(error);
                        }
                    });
                });


            });
            //点击修改操作
            //取消按钮
            $(document).on('click', '.qx1', function(event) {
                event.preventDefault();
                /* Act on the event */
                $('.out_mask').hide();
            });
            //取消按钮
            // 点击查询数据
            $('#click_cx').click(function(event) {
                /* Act on the event */
                var input_cx_id = $('.input_cx_id').val();
                var input_cx_mxmc = $('.input_cx_mxmc').val();

                //pageNo, pageSize, elementId, actionId, elementName, elementOperationId, modelId, elementDataField, elementDataType, elementDataGroupFields, elementDataHavingFields
                marketDefault(1, 10, input_cx_id, "", input_cx_mxmc);
            });
            // 点击查询数据
            //end
        });
    });
});
