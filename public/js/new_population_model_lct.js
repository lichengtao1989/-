define(function(require, exports, module) {
    var htmlduli1 = require('./fenqun_html.js').htmlduli1;
    var htmlduli2 = require('./fenqun_html.js').htmlduli2;
    var order = require('./fenqun_html.js').order;
    require.async(['./left_lct.js', './cronGen.js', './bootstrap.min.js', './bootstrap-select.min.js', './save_fq_lct.js'], function() {

        $(function() {
            //start
            $("#cron").cronGen();

            var apiUrl = {
                "operator_modular": "http://datasea.csqccr.com/operation/", //操作符模块
                "model_modular": "http://datasea.csqccr.com/model/", //model模块
                "action_modular": "http://datasea.csqccr.com/action/", //行为模块
                "model_column": "http://datasea.csqccr.com/model/", //行为模块/model/column.json?modelId=4
                "element_column": "http://datasea.csqccr.com/element/" //element模块

            };

            $(document).on('change', '.ks_se001 select', function(event) {
                event.preventDefault();
                /* Act on the event */
                var _this = $(this);
                var _thisVal = _this.val();
                var actionType = "";
                actionType = _thisVal;
                $.ajax({
                    type: "get",
                    async: false,
                    url: apiUrl.action_modular + "list.json?condition={pageSize:9999,actionType:" + actionType + ",status:1}",
                    dataType: "jsonp",
                    jsonp: "callback",
                    success: function(data) {

                        if (data.result.success) {
                            var dataInfo = data.result.data.resultList;
                            if (dataInfo.length > 0) {
                                var listLength = dataInfo.length;
                                var htmlE = '<option value="0">属性</option>';
                                if (actionType == 2) {
                                    htmlE = '<option value="0">事件</option>';
                                }
                                for (var i = 0; i < listLength; i++) {
                                    htmlE += '<option value="' + dataInfo[i].actionId + '" data-actionType="' + dataInfo[i].actionType + '" data-actionId="' + dataInfo[i].actionId + '" data-actionName="' + dataInfo[i].actionName + '">' + dataInfo[i].actionName + '</option>'
                                };
                                var selectHtml1 = '<select data-actionType="' + actionType + '" class="form-control sx_se_lct part_1_2">' + htmlE + '</select>' +
                                    '<select class="form-control mc_se_lct part_1_2"><option value="">名称</option></select>' +
                                    '<select class="form-control czf_se_lct part_1_2"><option value="">操作符</option></select>' +
                                    '<input type="text" class="form-control srz_se_lct part_1_2" placeholder="请输入值"/>' +
                                    '<div class="sql_pqrt partsh' + actionType + '"><span class="sp_sql">输入SQL:</span><input type="text" class="form-control input_sql" placeholder="请输入SQL"/></div>'
                                if (actionType == 3) {

                                } else {
                                    // selectHtml1 += "<span class='jia'>+</span>"
                                };
                                _this.parent('.ks_se001').siblings('.nextappend').prepend(selectHtml1);
                            } else {

                                var selectHtml1 = '<select data-actionType="' + actionType + '" class="form-control sx_se_lct part_1_2 hide"><option value=""></option></select>' +
                                    '<select class="form-control mc_se_lct part_1_2 hide"><option value="">名称</option></select>' +
                                    '<select class="form-control czf_se_lct part_1_2 hide"><option value="">操作符</option></select>' +
                                    '<input type="text" class="form-control srz_se_lct part_1_2 hide" placeholder="请输入值"/>' +
                                    '<div class="sql_pqrt partsh' + actionType + '"><span class="sp_sql">输入SQL:</span><input type="text" class="form-control input_sql" placeholder="请输入SQL"/></div>'

                                _this.parent('.ks_se001').siblings('.nextappend').prepend(selectHtml1);
                                console.log('没有数据！');
                            };





                        } else {
                            console.log('error!')
                        }
                    },
                    error: function(e) {
                        console.log(e)
                    }
                });
                _this.hide();
            });


            //属性change
            $(document).on('change', '.sx_se_lct', function(event) {
                var _this = $(this);
                var _thisActiontype = _this.attr('data-actiontype');
                var _thisVal = _this.val();
                //1 是属性 2是事件
                var condition = { "pageSize": 9999, "actionId": _thisVal, "status": 1 };
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
                                var list = dataInfoList.result.data.resultList;
                                var htmlE = '<option value="0">名称</option>';
                                for (var i = 0; i < list.length; i++) {
                                    htmlE += '<option value="' + list[i].elementOperationId + '" data-elementId="' + list[i].elementId + '" data-elementName="' + list[i].elementName + '" data-elementDataField="' + list[i].elementDataField + '" data-elementDataGroupFields="' + list[i].elementDataGroupFields + '" data-elementDataHavingFields="' + list[i].elementDataHavingFields + '" data-elementDataType="' + list[i].elementDataType + '" data-modelId="' + list[i].modelId + '" data-elementOperationId="' + list[i].elementOperationId + '">' + list[i].elementName + '</option>'
                                };
                                _this.next('.mc_se_lct').html(htmlE)
                            } else {

                            };
                        } else {

                        };
                    },
                    error: function(error) {
                        console.log(error);
                    }
                });
                if (_thisActiontype == 2) {

                } else {

                }

            });

            $(document).on('change', '.mc_se_lct', function(event) {
                var _this = $(this);
                var _thisVal = parseInt(_this.val());
                var _this_actype = _this.siblings('.sx_se_lct').attr('data-actiontype');
                var _this_data_elementdatatype = _this.find('option:selected').attr('data-elementdatatype');
                console.log(_this_data_elementdatatype);
                if (_this_data_elementdatatype == 'date') {
                    _this.siblings('.srz_se_lct').attr('onclick', 'layui.laydate({elem: this})');
                    _this.siblings('.srz_se_lct').attr('placeholder', '选择日期');
                }
                //操作符
                if (_thisVal) {
                    var condition = { "pageSize": 9999, "operationId": _thisVal };
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
                                var htmlE = '<option value="0">操作符</option>';
                                var dataI = dataInfoList.result.data.resultList[0];
                                if (dataInfoList.result.data.resultList[0] && dataInfoList.result.data.resultList[0].operationList) {
                                    var dataGet = JSON.parse(dataInfoList.result.data.resultList[0].operationList);

                                    $.each(dataGet, function(name, value) {
                                        htmlE += '<option value="' + value + '" data-key="' + name + '"  data-operationId="' + dataI.operationId + '" data-status="' + dataI.status + '" data-operationType="' + dataI.operationType + '" data-operationName="' + dataI.operationName + '">' + value + '</option>';
                                    });

                                    _this.next('.czf_se_lct').html(htmlE)
                                } else {
                                    console.log('没有操作符！')
                                }

                            } else {

                            };
                        },
                        error: function(error) {
                            console.log(error);
                        }
                    });
                } else {
                    console.log('没选择')
                };

                if (_this_actype == 2) {
                    //请求element接口
                    var elementId = _this.find('option:selected').attr('data-elementid');
                    var condition2 = { "pageSize": 9999, "elementId": elementId }
                    var conditionInfo2 = JSON.stringify(condition2);
                    $.ajax({
                        type: "get",
                        async: false,
                        url: apiUrl.element_column + "list.json?condition=" + conditionInfo2,
                        dataType: "jsonp",
                        jsonp: "callback",
                        success: function(data) {

                            if (data.result.success) {
                                var elementDataHavingFields = data.result.data.resultList[0].elementDataHavingFields;

                                if (elementDataHavingFields) {
                                    var haveAry = elementDataHavingFields.substr(0, (elementDataHavingFields.length - 1)).split(',');

                                    var htmlEr = '';
                                    for (var i = 0; i < haveAry.length; i++) {
                                        htmlEr += '<div class="sj_jia_div" data-aggFieldDataName="' + haveAry[i].split(":")[0] + '" data-aggFieldDataField="' + haveAry[i].split(":")[1] + '">' +
                                            '<span class="mzsx">' + haveAry[i] + '</span>' +
                                            '<select class="form-control bjjsf">' +
                                            '<option value="">请选择</option>' +
                                            '<option value=">">大于</option>' +
                                            '<option value=">=">大于等于</option>' +
                                            '<option value="=">等于</option>' +
                                            '<option value="!=">不等于</option>' +
                                            '<option value="<">小于</option>' +
                                            '<option value="<=">小于等于</option>' +
                                            '</select>' +
                                            '<select class="form-control bizjsf">' +
                                            '<option value="">请选择</option>' +
                                            '<option value="min">最小值</option>' +
                                            '<option value="avg">平均值</option>' +
                                            '<option value="max">最大值</option>' +
                                            '<option value="count">总数</option>' +
                                            '</select>' +
                                            '<input type="text" class="form-control aggValue" />' +
                                            '</div>';
                                    };
                                    _this.siblings('.sj_ap').html(htmlEr);
                                } else {
                                    console.log('no elementDataHavingFields')
                                };
                            } else {
                                console.log('data error!')
                            };
                        },
                        error: function(error) {
                            console.log(error);
                        }
                    });
                }

            });


            $(document).on('click', '.tjhz', function(event) {
                event.preventDefault();
                /* Act on the event */
                var _this = $(this);

                _this.parent('.warp_form1').append(htmlduli1)
            });


            //and 操作
            $(document).on('click', '.addbtn', function(event) {
                event.preventDefault();
                /* Act on the event */




                if (order < 2) {
                    order += 1;
                    $('.show_rightpr').append(htmlduli2(order));

                } else {
                    var num_o = order - 1;
                    var num_o2 = order - 2;
                    var s_zd = $('.warp_form1').eq(num_o).attr('data-relatedfields');
                    if (s_zd == "") {
                        $('.tishi').show().text('请先选择关联字段!');
                        var t = setTimeout(function() {
                            $('.tishi').hide().text('');
                        }, 1000);




                    } else {
                        $('.show_rightpr').append(htmlduli2(order + 1));
                        order += 1;
                    }
                }


            });
            //and 操作
            //点击选择关联字段
            $(document).on('click', '.qyg .gl_sp_zd', function(event) {
                event.preventDefault();
                /* Act on the event */
                var _this = $(this);
                var _thisText = _this.text();
                _this.parents('.glzd_xs').siblings('.xzdzd').find('.sp_qyg').html(_thisText);
            });
            $(document).on('click', '.dqd .gl_sp_zd', function(event) {
                event.preventDefault();
                /* Act on the event */
                var _this = $(this);
                var _thisText = _this.text();
                _this.parents('.glzd_xs').siblings('.xzdzd').find('.sp_dq').html(_thisText);
            });

            //点击选择关联字段
            //选择返回值
            $(document).on('click', '.xz_fh', function(event) {
                event.preventDefault();
                var _this = $(this);
                var height = _this.parent('.warp_form1').height();
                /* Act on the event */
                var _thisDuli = _this.siblings('.duli');
                var duliLength = _this.siblings('.duli').length;
                /*operate1*/
                var htmlY1 = '';
                var htmlY2 = '';
                var htmlY3 = '';
                var htmlTou = '';
                var htmlLie = '';
                for (var i = 0; i < duliLength; i++) {
                    var modelId = $(_this.siblings('.duli')[i]).find('.mc_se_lct option:selected').attr('data-modelid');
                    htmlTou = '<div class="linetou"><div class="inputo"><input type="text" class="form-control"/></div></div>';
                    htmlLie += '<div class="linelie" data-indexstr="" data-returnField="" data-array="" data-modelId="' + modelId + '"><div class="square" data-returnField="" data-modelId="' + modelId + '"><span>点击选择</span><input type="hidden" /></div></div>';
                };

                var lastHtml = htmlTou + htmlLie;
                $('.next_apd').html(lastHtml);
                _this.siblings('.djxz_out').height(height).show();
                /*operate1*/
                //加号点击
                $('.po_right').click(function(event) {
                    /* Act on the event */
                    $(this).siblings('.po_right2').show();
                    $(this).siblings('.next_apd').find('.linetou').append('<div class="inputo"><input type="text" class="form-control"></div>');
                    var lineLie = $(this).siblings('.next_apd').find('.linetou').siblings('.linelie');
                    for (var i = 0; i < duliLength; i++) {
                        var modelId = $(lineLie[i]).attr('data-modelid');
                        $(lineLie[i]).append('<div class="square" data-modelid="' + modelId + '"><span>点击选择</span><input type="hidden"></div>');
                    };
                });
                //加号点击

                var arrayE = [];
                var arrayE2 = [];
                var arryE3 = '';
                var arryE4 = '';
                //input 值 同步
                $(document).on('focus', '.inputo input', function(event) {
                    var parent_order = $(this).parents('.warp_form1').attr('data-order');
                    $(this).blur(function(event) {
                        /* Act on the event */
                        var val = $(this).val();
                        var val2 = parent_order + ":" + $(this).val();
                        var indexVal = parseInt($(this).parent('.inputo').index());
                        var siblingsPart = $(this).parents('.linetou').siblings('linelie');
                        arrayE[indexVal] = val;
                        arrayE2[indexVal] = val2;
                        arryE3 = arrayE.join(',');
                        arryE4 = arrayE2.join(',');
                        $(this).parents('.linetou').siblings('.linelie').attr('data-array', arryE3);
                        $(this).parents('.linetou').siblings('.linelie').attr('data-indexstr', arryE4);
                    });
                });

                //input 值 同步



                //点击选择完成
                $(document).on('click', '.po_right3', function(event) {
                    var lie = $(this).siblings('.next_apd').find('.linelie');
                    var lieLength = lie.length;
                    var parent_out_index = $(this).parents('.warp_form1').attr('data-order');

                    for (var i = 0; i < lieLength; i++) {
                        var str = "";
                        var str2 = "";
                        var str3 = "";
                        var square = $(lie[i]).find('.square');
                        var squareLength = square.length;
                        for (var j = 0; j < squareLength; j++) {
                            str += $(square[j]).attr('data-returnfield') + ',';
                            str2 += "t" + parent_out_index + "." + $(square[j]).attr('data-returnfield') + ',';
                        }
                        $(lie[i]).attr('data-returnfield', str);
                        $(_this.siblings('.duli')[i]).attr('data-returnField', str);
                        $(_this.siblings('.duli')[i]).attr('data-returnfield-addindex', str2);

                        $(_this.siblings('.duli')[i]).attr('data-arystr', $(lie[i]).attr('data-array'));
                        $(this).parents('.warp_form1').attr('data-inputstr', $(lie[i]).attr('data-array'));
                        $(this).parents('.warp_form1').attr('data-index-str', str2);
                    };
                    $(this).siblings('.next_apd').html('');
                    $('.djxz_out').hide();

                });
                //点击选择完成







            });

            //根据modelId选择
            $(document).on('click', '.square', function(event) {
                event.preventDefault();
                /* Act on the event */
                var _thisAppendPart = $('.zd_po_xs');
                var _this = $(this);
                var _thisIndex = _this.index();
                var modelId = _this.attr('data-modelid');
                var parentAry = _this.parent('.linelie').attr('data-array').split(',');
                if (!parentAry[_thisIndex]) {
                    $('.tishi').show().text('请先填写input值！');
                    var t = setTimeout(function() {
                        $('.tishi').hide().text('');

                    }, 1000);
                    return;
                };
                $.ajax({
                    type: "get",
                    async: false,
                    url: "http://datasea.csqccr.com/element/returnColumn.json?elementId=" + modelId,
                    dataType: "jsonp",
                    jsonp: "callback",
                    success: function(data) {
                 
                        if (data.result.success) {
                            var htmlU = '<div class="ti0">字段</div><div class="zdxztj" data-columnComment="" data-columnName=""></div>';
                            var list = data.result.data;
                            var listLength = list.length;
                            if (listLength > 0) {
                                for (var i = 0; i < listLength; i++) {
                                    htmlU += '<div class="zdxztj" data-columnComment="' + list[i].columnComment + '" data-columnDataType="' + list[i].columnDataType + '" data-columnName="' + list[i].columnName + '">' + list[i].columnName + '</div>'
                                };
                                _thisAppendPart.html(htmlU);
                                $('.zd_po_xs_out').show();
                            };
                        }

                        $('.zdxztj').click(function(event) {
                            var orderIndex = $(this).parents('.warp_form1').attr('data-order');
                            var aryUi = "";
                            /* Act on the event */
                            var text = $(this).text();
                            var parentAry = _this.parent('.linelie').attr('data-array').split(',');
                            aryUi = text + " " + parentAry[_thisIndex];

                            _this.attr('data-returnField', aryUi)
                            _this.text(text);
                            $('.zd_po_xs_out').hide();
                        });
                    },
                    error: function(error) {
                        console.log(error);
                    }
                });


            });
            //根据modelId选择

            //删除一列
            $(document).on('click', '.po_right2', function(event) {
                event.preventDefault();
                /* Act on the event */
                var lie = $(this).siblings('.next_apd').find('.linelie');
                var lieLength = lie.length;
                var touLength = $(this).siblings('.next_apd').find('.linetou').find('.inputo').length;
                if (touLength > 1) {
                    $(this).siblings('.next_apd').find('.linetou').find('.inputo:last-child').remove();
                    for (var i = 0; i < lieLength; i++) {
                        $(lie[i]).find('.square:last-child').remove();
                    };
                } else {
                    return;
                };
            });

            //删除一列
            //点击选择关联字段
            $(document).on('click', '.xz_glzd_btn', function(event) {
                event.preventDefault();
                $('.sp_qyg').html('');
                $('.sp_dq').html('');
                var _this = $(this);
                var _thisParent = _this.parent('.warp_form1');
                var _thisParentOrder = _thisParent.attr('data-order');
                var eqnum = _thisParentOrder - 2;
                var pre_inputs_val = $('.warp_form1').eq(eqnum).attr('data-index-str');
                pre_inputs_val = pre_inputs_val.substr(0, pre_inputs_val.length - 1);
                var _thisParent_val = _thisParent.attr('data-index-str');
                _thisParent_val = _thisParent_val.substr(0, _thisParent_val.length - 1);
                var appendAry1 = pre_inputs_val.split(',');
                var appendAry2 = _thisParent_val.split(',');
                var htmlA1 = "";
                var htmlA2 = "";
                //加上索引值:
                for (var i = 0; i < appendAry1.length; i++) {
                    htmlA1 += '<div class="gl_sp_zd">' + appendAry1[i] + '</div>';
                };
                $('.qyg').html(htmlA1);
                for (var i = 0; i < appendAry2.length; i++) {
                    htmlA2 += '<div class="gl_sp_zd">' + appendAry2[i] + '</div>';
                };
                $('.dqd').html(htmlA2);
                $('.line_lct').height($('.glzd_xs').height());
                $('.mask_lct1').height($(document).height()).show();
                $('.glzdk').show();
                //确定
                $(document).on('click', '.qdan', function(event) {
                    event.preventDefault();

                    var _this = $(this);
                    var _thisText = _this.siblings('.xzdzd').find('.sp_qyg').html() + '=' + _this.siblings('.xzdzd').find('.sp_dq').html();
                    _thisParent.attr('data-relatedfields', _thisText);
                    console.log(_thisText);
                    $('.glzdk').hide();
                    $('.mask_lct1').hide();
                });
                //确定

            });
            //点击选择关联字段

            //end
        });



    });
});


/*
                           
*/
