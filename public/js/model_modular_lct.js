        define(function(require, exports, module) {

            require.async(['./jquery.2.1.4.min.js', './left_lct.js'], function() {

                $(function() {
                    //start
                    var apiUrl = {
                        "operator_modular": "http://datasea.csqccr.com/operation/", //操作符模块
                        "model_modular": "http://datasea.csqccr.com/model/", //model模块
                        "action_modular": "http://datasea.csqccr.com/action/", //行为模块
                        "databases":"http://datasea.csqccr.com/model/databases.json?databaseName=",//databases
                        "tables":"http://datasea.csqccr.com/model/tables.json?"//databases
                    };
                    var returnStatus = function(el) {
                        if (el == true) {
                            return "是";
                        } else {
                            return "否";
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
                        var modelName = $('.modelName').val();
                        var modelDatabase = $('.databaseName').val();
                        var modelTable = $('.modelTable').val();
                        var _this = $(this);
                        var modelId = "";
                        var statusVal = $('.inputradio:checked').val();
                        var isPublic = $('.inputradio_gk:checked').val();
                        if (modelName == "") {
                            $('.tishi').show().text('模型名称不能为空！');
                            var t = setTimeout(function() {
                                $('.tishi').hide().text('');

                            }, 1000);
                            return;
                        };
                        if (modelDatabase == "") {
                            $('.tishi').show().text('数据库名不能为空！');
                            var t = setTimeout(function() {
                                $('.tishi').hide().text('');

                            }, 1000);
                            return;
                        };
                        if (modelTable == "") {
                            $('.tishi').show().text('表名不能为空！');
                            var t = setTimeout(function() {
                                $('.tishi').hide().text('');

                            }, 1000);
                            return;
                        };
                        operation = {
                            "modelId": modelId,
                            "modelName": modelName,
                            "modelDatabase": modelDatabase,
                            "modelTable": modelTable,
                            "status": statusVal,
                            "isPublic": isPublic
                        };
                        var dataInfo = JSON.stringify(operation);
                        console.log(dataInfo);

                        var apiGet = apiUrl.model_modular + "insert.json?modelInfo=" + dataInfo;

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
                        var html_gk = ' <div class="infoi_left">是否公开:</div>' +
                            '<div class="infoi_right">' +
                            '<input type="radio" name="isPublic" value="1" class="inputradio_gk radio1" />是' +
                            '<input type="radio" name="isPublic" value="0" class="inputradio_gk radio2 radio22" />否</div>' +
                            '</div>';
                        $('.modelName').val('');
                        $('.databaseName').val('');
                        $('.modelTable').val('');
                        $('.statusoutqy').html(html_qy);
                        $('.statusoutgk').html(html_gk);
                        $('.out_mask,.fixed_popup2').hide();

                    });
                    //关闭-取消-操作
                    var pageSize=$('#select001').val();
                    /*分页插件*/
                    var makeHtmlMarket = function(ary, length) {
                        var htmlMarket = "";
                        for (var i = 0; i < length; i++) {

                            htmlMarket += ' <div class="parts_5">' +
                                '<div class="part_01">' + ary[i].modelId + '</div>' +
                                '<div class="part_01">' + ary[i].modelName + '</div>' +
                                '<div class="part_01 " data-title="' + ary[i].modelDatabase + '">' + ary[i].modelDatabase + '</div>' +
                                '<div class="part_01 ov ">' + ary[i].modelTable + '</div>' +
                                '<div class="part_01">' + returnStatus(ary[i].status) + '</div>' +
                                '<div class="part_01">' + returnStatus(ary[i].isPublic) + '</div>' +
                                '<div class="part_01 xgcz" data-id="' + ary[i].modelId + '">' +
                                '<div class="czp"></div>' +
                                '</div>' +
                                '</div>';
                        }
                        return htmlMarket;
                    };

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

                    var getParmas = function(pageNo, pageSize, modelId, modelName, databaseName, modelTable, status, isPublic) {
                        var returnObj = {
                            "pageNo": pageNo || 1,
                            "pageSize": pageSize || 10,
                            "modelId": modelId || "",
                            "modelName": modelName || "",
                            "databaseName": databaseName || "",
                            "modelTable": modelTable || "",
                            "status": status || 1,
                            "isPublic": isPublic || 1
                        };
                        return returnObj;
                    };
                    //查询数据
                    var marketDefault = function(pageNo, pageSize, modelId, modelName, databaseName, modelTable, status, isPublic) {
                        var condition = getParmas(pageNo, pageSize, modelId, modelName, databaseName, modelTable, status, isPublic);
                        var conditionInfo = JSON.stringify(condition);
                        $.ajax({
                            type: "get",
                            async: false,
                            url: apiUrl.model_modular + "list.json?condition=" + conditionInfo,
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
                        //查询数据
                        $.ajax({
                            type: "get",
                            async: false,
                            url: apiUrl.model_modular + "detail.json?modelId=" + _thisId,
                            dataType: "jsonp",
                            jsonp: "callback",
                            success: function(data) {
                                console.log(data);
                                var dataInfo = data.result;
                                if (dataInfo.success) {
                                    var returnInfo = dataInfo.data;
                                    var modelId = returnInfo.modelId;
                                    var modelName = returnInfo.modelName;
                                    var modelDatabase = returnInfo.modelDatabase;
                                    var modelTable = returnInfo.modelTable;
                                    var status = returnInfo.status;
                                    var isPublic = returnInfo.isPublic;
                                    $('.modelName').val(modelName);
                                    $('.modelDatabase').val(modelDatabase);
                                    $('.modelTable').val(modelTable);
                                    if (status) {
                                        $('.statusoutqy .radio1').attr('checked', status);
                                    };
                                    if (isPublic) {
                                        $('.statusoutgk .radio1').attr('checked', isPublic);
                                    };
                                    $('.xgczbf .btn_qd').click(function(event) {
                                        /* Act on the event */
                                        var modelName = $('.modelName').val();
                                        var modelDatabase = $('.modelDatabase').val();
                                        var modelTable = $('.modelTable').val();
                                        var _this = $(this);
                                        var modelId = _thisId;
                                        var statusVal = parseInt($('.inputradio:checked').val());
                                        var isPublic = parseInt($('.inputradio_gk:checked').val());
                                        operation = {
                                            "modelId": modelId,
                                            "modelName": modelName,
                                            "modelDatabase": modelDatabase,
                                            "modelTable": modelTable,
                                            "status": statusVal,
                                            "isPublic": isPublic
                                        };
                                        var dataInfo = JSON.stringify(operation);
                                        console.log(dataInfo);
                                        var apiGet = apiUrl.model_modular + "update.json?modelInfo=" + dataInfo;
                                        $.ajax({
                                            type: "get",
                                            async: false,
                                            url: apiGet,
                                            dataType: "jsonp",
                                            jsonp: "callback",
                                            jsonpCallback: "updateInfo",
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

                    //databases
                    $.ajax({
                            type: "get",
                            async: false,
                            url: apiUrl.databases,
                            dataType: "jsonp",
                            jsonp: "callback",
                            jsonpCallback: "databases",
                            success: function(data) {
                                console.log(data);
                                var optionHtml='<option value="">请选择数据库</option>';
                                if(data.result.success){
                                    var dataList=data.result.data;
                                    var dataListLength=dataList.length;
                                    if(dataListLength>0){
                                        for(var i=0;i<dataListLength;i++){
                                            optionHtml+='<option value="'+dataList[i]+'">'+dataList[i]+'</option>'
                                        };
                                        $('.databaseName').html(optionHtml);
                                    }else{
                                        console.log('nothing!');
                                    };
                                }else{
                                    console.log('data error!')
                                }
                            },
                            error: function(error) {
                                console.log(error);
                            }
                        });
                    //databases
                    //tables
                    $(document).on('change', '.databaseName', function(event) {
                        event.preventDefault();
                        /* Act on the event */
                        var _this=$(this);
                        var _thisVal=_this.val();
                        console.log(_thisVal);
                        // "tables":"http://datasea.csqccr.com/model/tables.json?"//databases
                        $.ajax({
                            type: "get",
                            async: false,
                            url: apiUrl.tables+"databaseName="+_thisVal,
                            dataType: "jsonp",
                            jsonp: "callback",
                            jsonpCallback: "databases",
                            success: function(data) {
                                console.log(data);
                                var optionHtml='<option value="">请选择表</option>';
                                if(data.result.success){
                                    var dataList=data.result.data;
                                    var dataListLength=dataList.length;
                                    if(dataListLength>0){
                                        for(var i=0;i<dataListLength;i++){
                                            optionHtml+='<option value="'+dataList[i]+'">'+dataList[i]+'</option>'
                                        };
                                        
                                    }else{
                                        console.log('nothing!');
                                    };
                                    $('.modelTable').html(optionHtml);
                                }else{
                                    console.log('data error!')
                                }
                            },
                            error: function(error) {
                                console.log(error);
                            }
                        });
                    });
                    //tables
                    //end
                });

            });
        });
