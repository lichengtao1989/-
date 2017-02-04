        define(function(require, exports, module) {

            require.async(['./jquery.2.1.4.min.js', './left_lct.js'], function() {

                $(function() {
                    //start
                    //public
                    // var apiUrl = "http://172.30.198.77:10580/operation/";
                    var apiUrl = {
                        "operator_modular": "http://datasea.csqccr.com/operation/", //操作符模块
                        "model_modular": "http://datasea.csqccr.com/model/", //model模块
                        "action_modular": "http://datasea.csqccr.com/action/" //行为模块
                    }

                    var returnStatus = function(el) {
                        if (el == true) {
                            return "启用"
                        } else {
                            return "禁用"
                        }
                    };

                    //public
                    var arrayAdd = []; //push操作符
                    var windowWidth = $(window).width();
                    $('.add').click(function(event) {
                        /* Act on the event */
                        arrayAdd = [];
                        $('.sp_xznr').text('');
                        $('.ilistp').show();
                        var _this = $(this);
                        var docHeight = $(document).height();
                        $('.out_mask').width(windowWidth).height(docHeight);
                        $('.out_mask,.fixed_popup2').show();
                        $('.closex2,.gbl').click(function(event) {
                            /* Act on the event */
                            $('#rightadd').html(str);
                            $('.operationType').val('');
                            $('.typeName').val('');
                            $('.inputradio').attr('checked', false);
                            $('.out_mask,.fixed_popup2').hide();

                        });
                    });

                    //关闭取消popup1 操作
                    $('.closex,.gbl2').click(function(event) {
                        /* Act on the event */
                        $('.onelx').val('');
                        $('.onemc').val('');
                        $('#cridbf').html(str);
                        $('.out_mask,.fixed_popup1').hide();
                        $('#degck').html('');
                    });
                    //关闭取消popup1 操作 
                    /*添加操作符*/

                    var str = ' <div class="addlist">' +
                        '<input type="text" class="adi1 block" placeholder="中文">' +
                        '<input type="text" class="adi2 block" placeholder="英文">' +
                        '<span class="jxtj block ys ys2">继续添加</span>' +
                        '</div>';
                    $(document).on('click', '#popup2 .jxtj', function(event) {
                        event.preventDefault();
                        var _this = $(this);
                        var siblings1 = _this.siblings('.adi1').val();
                        var siblings2 = _this.siblings('.adi2').val();
                        if (siblings1 != '' && siblings2 != '') {
                            $('#rightadd').append(str);
                            _this.removeClass('jxtj');
                            _this.hide();
                        } else {
                            $('.tishi').show().text('请先输入信息');
                            var t = setTimeout(function() {
                                $('.tishi').hide().text('');
                            }, 2000);
                        };
                    });
                    $(document).on('click', '#popup1 .jxtj', function(event) {
                        event.preventDefault();
                        var _this = $(this);
                        var siblings1 = _this.siblings('.adi1').val();
                        var siblings2 = _this.siblings('.adi2').val();
                        if (siblings1 != '' && siblings2 != '') {
                            $('#cridbf').append(str);
                            _this.removeClass('jxtj');
                            _this.hide();
                        } else {
                            $('.tishi').show().text('请先输入信息');
                            var t = setTimeout(function() {
                                $('.tishi').hide().text('');
                            }, 2000);
                        };
                    });
                    /*添加操作符*/
                    // 确定操作
                    $('#popup2 .btn_qd').click(function() {
                        var typeName = $('.typeName').val();
                        var operationType = $('.operationType').val();
                        var arrayEmt = [];
                        var jsonEmt = {};
                        var _this = $(this);
                        var list = $('.addlist').length;
                        for (var i = 0; i < list; i++) {
                            var val1 = $($('.addlist')[i]).find('.adi1').val();
                            var val2 = $($('.addlist')[i]).find('.adi2').val();
                            if (val1 != "" && val2 != "") {
                                jsonEmt[val1] = val2;
                            };
                        };
                        var operationId = "";
                        var statusVal = $('.inputradio:checked').val();
                        if (typeName == "") {
                            $('.tishi').show().text('名称不能为空！');
                            var t = setTimeout(function() {
                                $('.tishi').hide().text('');

                            }, 1000);
                            return;
                        };
                        if (operationType == "") {
                            $('.tishi').show().text('类型不能为空！');
                            var t = setTimeout(function() {
                                $('.tishi').hide().text('');

                            }, 1000);
                            return;
                        };
                        operation = {
                            "operationId": operationId,
                            "operationName": typeName,
                            "operationType": operationType,
                            "operationList": jsonEmt,
                            "status": statusVal
                        };
                        var dataInfo = JSON.stringify(operation);
                     
                        $.ajax({
                            type: "get",
                            async: false,
                            url: apiUrl.operator_modular + "insert.json?operation=" + dataInfo,
                            dataType: "jsonp",
                            jsonp: "callback",
                            jsonpCallback: "operation",
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
                    // 确定操作
                    var pageSize=$('#select001').val();
                    /*分页插件*/
                    var makeHtmlMarket = function(ary, length) {
                        var htmlMarket = "";
                        for (var i = 0; i < length; i++) {

                            htmlMarket += ' <div class="parts_5">' +
                                '<div class="part_01">' + ary[i].operationId + '</div>' +
                                '<div class="part_01">' + ary[i].operationName + '</div>' +
                                '<div class="part_01 " data-title="">' + ary[i].operationList + '</div>' +
                                '<div class="part_01">' + returnStatus(ary[i].status) + '</div>' +
                                '<div class="part_01 xgcz" data-id="' + ary[i].operationId + '">' +
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
                    var getParmas = function(pageNo, pageSize, operationId, operationName, operationType, status) {
                        var returnObj = {
                            "pageNo": pageNo || 1,
                            "pageSize": pageSize || 10,
                            "operationId": operationId || "",
                            "operationName": operationName || "",
                            "operationType": operationType || "",
                            "status": status || 1
                        };
                        return returnObj;
                    };
                    //查询数据
                    var marketDefault = function(pageNo, pageSize, operationId, operationName, operationType, status) {
                        var condition = getParmas(pageNo, pageSize, operationId, operationName, operationType, status);
                        var conditionInfo = JSON.stringify(condition);
                        $.ajax({
                            type: "get",
                            async: false,
                            url: apiUrl.operator_modular + "list.json?condition=" + conditionInfo,
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
                    // 点击加载数据
                    $('#click_cx').click(function(event) {
                        /* Act on the event */
                        var input_cx_id = $('.input_cx_id').val();
                        var input_cx_mc = $('.input_cx_mc').val();
                        var input_cx_lx = $('.input_cx_lx').val();
                        marketDefault(1, 10, input_cx_id, input_cx_mc, input_cx_lx);
                    });
                    // 点击加载数据
                    //点击修改操作
                    $(document).on('click', '.xgcz', function(event) {
                        event.preventDefault();
                        /* Act on the event */
                        var _this = $(this);
                        var docHeight = $(document).height();
                        $('.out_mask').width(windowWidth).height(docHeight);
                        $('.out_mask,.fixed_popup').show();
                        _thisId = _this.attr('data-id');

                        $.ajax({
                            type: "get",
                            async: false,
                            url: apiUrl.operator_modular + "detail.json?operationId=" + _thisId,
                            dataType: "jsonp",
                            jsonp: "callback",
                            success: function(data) {

                                var dataInfoUpdate = data;
                                if (dataInfoUpdate.result.success) {
                                    var result = dataInfoUpdate.result.data;
                                    var operationType = result.operationType;
                                    var operationName = result.operationName;
                                    var status = result.status;
                                    var jsonStr = JSON.parse(result.operationList);
                                    var m_listall = [];
                                    $.each(jsonStr, function(key, value) {
                                        m_listall.push({ //获取拼接
                                            title: key,
                                            name: value
                                        })
                                    });
                                    var ajaxapary = "";
                                    for (var i = 0; i < m_listall.length; i++) {
                                        ajaxapary += '<div class="ajaxaparyd ybl">' +
                                            '<input type="text" value="' + m_listall[i].name + '" class="adi1 ajaxnamepush1 yblitem"/>' +
                                            '<input type="text" value="' + m_listall[i].title + '" class="adi2 ajaxnamepush2 yblitem"/>' +
                                            '</div>';
                                    };
                                    $('.cr').prepend(ajaxapary);
                                    $('.onelx').val(operationType);
                                    $('.onemc').val(operationName);
                                    if (status) {
                                        var str2 = '<input type="radio" name="status" value="1" class="poponerad1 poponerad" checked="' + status + '">启用' +
                                            '<input type="radio" name="status" value="0" class="poponerad2 poponerad">禁用';
                                        $('#degck').html(str2);
                                    };
                                    // popup1 确定 修改操作  update.json
                                    $('#popup1 .btn_qd').click(function(event) {
                                        /* Act on the event */
                                        var operationNameUp = $('.onemc').val();
                                        var operationTypeUp = $('.onelx').val();
                                        var statusValUp = parseInt($('.poponerad:checked').val());
                                        var jsonEmtUp = {};
                                        var list = $('#popup1 .ybl').length;
                                        for (var i = 0; i < list; i++) {
                                            var val1 = $($('.ybl')[i]).find('.adi1').val();
                                            var val2 = $($('.ybl')[i]).find('.adi2').val();
                                            if (val1 != "" && val2 != "") {
                                                jsonEmtUp[val1] = val2;
                                            };
                                        };
                                        var updateOperation = {
                                            "operationId": _thisId,
                                            "operationName": operationNameUp,
                                            "operationType": operationTypeUp,
                                            "operationList": jsonEmtUp,
                                            "status": statusValUp
                                        };
                                        var conditionInfoUp = JSON.stringify(updateOperation);

                                        $.ajax({
                                            type: "get",
                                            async: false,
                                            url: apiUrl.operator_modular + "update.json?operation=" + conditionInfoUp,
                                            dataType: "jsonp",
                                            jsonp: "callback",
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
                                    // popup1 确定 修改操作
                                } else {
                                    $('.tishi').show().text(data.result.statusText);
                                    var t = setTimeout(function() {
                                        $('.tishi').hide().text('');
                                    }, 2000);
                                };

                            },
                            error: function(error) {
                                console.log(error);
                            }
                        });
                    });
                    //点击修改操作
                    //每页显示多少条，change事件
                    $('#select001').on('change', function(event) {
                        event.preventDefault();
                        /* Act on the event */
                        var _this = $(this);
                        var _thisVal = _this.val();

                        marketDefault(1, _thisVal);
                    });
                    //每页显示多少条，change事件


                    //end
                });


            });
        });
