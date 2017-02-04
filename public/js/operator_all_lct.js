define(function(require, exports, module) {
    // var public_lct = require('./public_lct.js');
    // var $ = require('./jquery.revise_for_seajs.js');
    require.async(['./jquery.2.1.4.min.js', './left_lct.js', './save_operator_all_lct.js'], function() {
        $(function() {
            //start
            //public
            var apiUrl = {
                "operator_modular": "http://datasea.csqccr.com/operation/", //操作符模块
                "model_modular": "http://datasea.csqccr.com/model/", //model模块
                "action_modular": "http://datasea.csqccr.com/action/", //行为模块
                "model_column": "http://datasea.csqccr.com/model/", //行为模块/model/column.json?modelId=4
                "element_column": "http://datasea.csqccr.com/element/" //element模块
            }

            var returnStatus = function(el) {
                if (el == true) {
                    return "启用"
                } else {
                    return "禁用"
                }
            };
            //元素归属行为名称
            $.ajax({
                type: "get",
                async: false,
                url: apiUrl.action_modular + "list.json?condition={pageSize:999}",
                dataType: "jsonp",
                jsonp: "callback",
                success: function(data) {
                    var dataInfoList = data;
                    console.log(dataInfoList);
                    var selectHtml_ajax_in = "";
                    if (dataInfoList.result.success) {
                        var optionHtml = '';
                        var arrayData = dataInfoList.result.data.resultList;
                        //html 填充
                        if (arrayData.length > 0) {
                            (function iterator(i) {
                                if (i == arrayData.length) {
                                    return;
                                };
                                //actionType 1 静态 2动态
                                optionHtml += '<option value="' + arrayData[i].actionId + '" data-id="' + arrayData[i].actionId + '" data-actionType="' + arrayData[i].actionType + '">' + arrayData[i].actionName + '</option>';
                                iterator(i + 1);
                            })(0);
                        };

                        var selectYsxw = '<select name="" id="" class="ysgsxwmc_se"><option value="">选择归属行为名称</option>' + optionHtml + '</select>';
                        $('.ysgsxwmc').html(selectYsxw);
                        //html 填充
                        $('.ysgsxwmc_se').change(function(event) {
                            /* Act on the event */

                            var selectedPartDataId = $('.ysgsxwmc_se option:selected').attr('data-id');
                            var selectedPartDataActiontype = $('.ysgsxwmc_se option:selected').attr('data-actiontype');
                            $('.jtdt').show();
                            $('.mxb').show();
                            $('.warp_01').show();
                            if (selectedPartDataActiontype == 1) {

                                $('.jtdt').html('静态');
                                $('.fzzdout,.jhzdout').html('无')
                            } else {
                                $('.jtdt').html('动态');
                                var zd1 = '<div class="djxzmxzd2 djxzmxzdcom" data-id="" data-click="0">' +
                                    '<span class="text_show2">点击选择聚合字段</span>' +
                                    '<span class="appendzd"></span>' +
                                    '</div>';
                                $('.jhzdout').html(zd1);
                                var zd2 = ' <div class="djxzmxzd3 djxzmxzdcom" data-id="" data-click="0">' +
                                    '<span class="text_show3">点击选择分组字段</span>' +
                                    '<span class="appendzd2"></span>' +
                                    '</div>';
                                $('.fzzdout').html(zd2);
                            };

                        });



                    } else {
                        console.log('error')
                    };
                },
                error: function(error) {
                    console.log(error);
                }
            });
            //元素归属行为名称
            // 模型表
            $.ajax({
                type: "get",
                async: false,
                url: apiUrl.model_modular + "list.json?condition={pageSize:999}",
                dataType: "jsonp",
                jsonp: "callback",
                success: function(data) {
                    var dataInfoList = data;
                    console.log(dataInfoList);
                    var selectHtml_ajax_in = "";
                    if (dataInfoList.result.success) {
                        var optionHtml = '';
                        var arrayData = dataInfoList.result.data.resultList;
                        //html 填充
                        if (arrayData.length > 0) {
                            (function iterator(i) {
                                if (i == arrayData.length) {
                                    return;
                                };
                                //actionType 1 静态 2动态
                                optionHtml += '<option value="' + arrayData[i].modelId + '" data-id="' + arrayData[i].modelId + '" >' + arrayData[i].modelTable + '</option>';
                                iterator(i + 1);
                            })(0);
                        };

                        var selectMxb = '<select name="" id="" class="mxb_se"><option value="">选择模型表</option>' + optionHtml + '</select>';
                        $('.mxb').html(selectMxb);
                        //html 填充

                        $('.mxb_se').change(function(event) {
                            /* Act on the event */
                            $('.warp_02').show();
                            var dataIdSe = $(this).val();
                            $('.djxzmxzd,.djxzmxzd2,.djxzmxzd3').attr('data-id', dataIdSe);
                            var jtdtWb = $('.jtdt').html();
                            if (jtdtWb == '动态') {

                            }
                            $('.djxzmxzd').html('<span class="text_show">点击选择模型字段</span>');
                            $('.lx_show_s').html('<span class="lx_show"></span>');
                            $('.djxzmxzd2').html('<span class="text_show2">点击选择聚合字段</span><span class="appendzd"></span>');
                            $('.djxzmxzd3').html('<span class="text_show3">点击选择分组字段</span><span class="appendzd2"></span>');
                            $('.djxzmxzd').show();
                            $('.pobox').hide();
                        });

                        //点击选择模型字段
                        $(document).on('click', '.djxzmxzd', function() {
                            $('.pobox').show();
                            $('.djxzmxzd2').show();
                            var _thisId = $(this).attr('data-id');
                            $.ajax({
                                type: "get",
                                async: false,
                                url: apiUrl.model_column + "column.json?modelId=" + _thisId,
                                dataType: "jsonp",
                                jsonp: "callback",
                                success: function(data) {
                                    var dataInfoList = data;
                                    console.log(dataInfoList);
                                    if (dataInfoList.result.success) {
                                        var modleColumnVOs = dataInfoList.result.data.modleColumnVOs;
                                        var htmlE = '';
                                        for (var i = 0; i < modleColumnVOs.length; i++) {
                                            htmlE += '<div class="options" data-columnComment="' + modleColumnVOs[i].columnComment + '" data-columnDataType="' + modleColumnVOs[i].columnDataType + '" data-columnName="' + modleColumnVOs[i].columnName + '">' +
                                                '<div class="opl bl">' + modleColumnVOs[i].columnName + '</div>' +
                                                '<div class="opr">' + modleColumnVOs[i].columnDataType + '</div>' +
                                                '</div>';
                                        };
                                        $('.nextbox').html(htmlE);
                                    } else {
                                        console.log('error')
                                    }

                                },
                                error: function(error) {
                                    console.log(error);
                                }
                            });
                        });
                        //点击选择模型字段
                          var maohao=function(mh){
                                            if(mh){
                                                return mh+":";
                                            }else{
                                                return "";
                                            }
                                        };
                        //点击选择聚合字段
                        $(document).on('click', '.djxzmxzd2', function() {

                            $('.djxzmxzd2').show();
                            var _thisId = $(this).attr('data-id');
                            var dataClick = $(this).attr('data-click');

                            if (dataClick == 0) {
                                console.log(dataClick)
                                $.ajax({
                                    type: "get",
                                    async: false,
                                    url: apiUrl.model_column + "column.json?modelId=" + _thisId,
                                    dataType: "jsonp",
                                    jsonp: "callback",
                                    success: function(data) {
                                        var dataInfoList = data;
                                        console.log(dataInfoList);
                                      
                                        if (dataInfoList.result.success) {
                                            var modleColumnVOs = dataInfoList.result.data.modleColumnVOs;
                                            var htmlE = '';
                                            for (var i = 0; i < modleColumnVOs.length; i++) {
                                                htmlE += '<div class="jhzdop" data-columnName="' + modleColumnVOs[i].columnName + '">' + maohao(modleColumnVOs[i].columnComment)+modleColumnVOs[i].columnName + '</div>';
                                            };
                                            $('.nextbox2').html(htmlE);





                                        } else {
                                            console.log('error')
                                        }

                                    },
                                    error: function(error) {
                                        console.log(error);
                                    }
                                });
                                $(this).attr('data-click', 1);
                            } else {

                            };
                            $('.pobox2').show();
                        });
                        //点击选择聚合字段
                        //点击选择分组字段
                        $(document).on('click', '.djxzmxzd3', function() {
                           

                            var _thisId = $(this).attr('data-id');
                            var dataClick = $(this).attr('data-click');
                            if (dataClick == 0) {
                                $.ajax({
                                    type: "get",
                                    async: false,
                                    url: apiUrl.model_column + "column.json?modelId=" + _thisId,
                                    dataType: "jsonp",
                                    jsonp: "callback",
                                    success: function(data) {
                                        var dataInfoList = data;
                                        console.log(dataInfoList);
                                        if (dataInfoList.result.success) {
                                            var modleColumnVOs = dataInfoList.result.data.modleColumnVOs;
                                            var htmlE = '';
                                            for (var i = 0; i < modleColumnVOs.length; i++) {
                                                htmlE += '<div class="jhzdop2" data-columnName="' + modleColumnVOs[i].columnName + '">' +maohao(modleColumnVOs[i].columnComment)+modleColumnVOs[i].columnName + '</div>';
                                            };
                                            $('.nextbox3').html(htmlE);





                                        } else {
                                            console.log('error')
                                        }

                                    },
                                    error: function(error) {
                                        console.log(error);
                                    }
                                });
                                $(this).attr('data-click', 1);
                            } else {

                            };
                             $('.pobox3').show();
                        });
                        //点击选择分组字段

                    } else {
                        console.log('error');
                    };

                },
                error: function(error) {
                    console.log(error);
                }
            });
            // 模型表
            //点击选择字段名称和类型
            $(document).on('click', '.pobox .options', function(event) {
                event.preventDefault();
                /* Act on the event */
                var _this = $(this);
                var _this_columncomment = _this.attr('data-columncomment');
                var _this_type = _this.attr('data-columndatatype');
                var _this_name = _this.attr('data-columnname');
                console.log();
                $('.text_show').html(_this_name);
                $('.lx_show').html(_this_type);
                $('.pobox').hide();

            });
            //点击选择字段名称和类型
            //聚合字段click选择
            $(document).on('click', '.jhzdop', function(event) {
                event.preventDefault();
                /* Act on the event */
                var _this = $(this);
                _this.hide();
                $('.djxzmxzd3').show();
                var _thisHtml = _this.html() + ',';

                var appendzd = $('.appendzd').html();
                appendzd += _thisHtml;
                $('.appendzd').html(appendzd);
                $('.text_show2').hide();
                $('.pobox2').hide();

            });
            //聚合字段click选择
            //行为字段click选择
            $(document).on('click', '.jhzdop2', function(event) {
                event.preventDefault();
                /* Act on the event */
                var _this = $(this);
                _this.hide();

                var _thisHtml = _this.html() + ',';
                $('.text_show3').hide();
                var appendzd = $('.appendzd2').html();
                appendzd += _thisHtml;
                $('.appendzd2').html(appendzd);
                $('.pobox3').hide();

            });
            //行为字段click选择
            // 操作符
            var condition2 = {"pageSize":999,"status":1};
                        var conditionInfo2 = JSON.stringify(condition2);
                        $.ajax({
                            type: "get",
                            async: false,
                            url: apiUrl.operator_modular + "list.json?condition=" + conditionInfo2,
                            dataType: "jsonp",
                            jsonp: "callback",
                            success: function(data) {
                                var dataInfoList = data;
                                console.log(dataInfoList);
                                if(dataInfoList.result.success){
                                    var op_list=dataInfoList.result.data.resultList;
                                    var htmlOption='';
                                    if(op_list.length>0){
                                        for(var i=0;i<op_list.length;i++){
                                            htmlOption+='<option value="'+op_list[i].operationId+'">'+op_list[i].operationName+'</option>'
                                        };
                                        $('.czf_add').append(htmlOption);
                                    };
                                    
                                }else{
                                    console.log('data error!')
                                }
                            },
                            error: function(error) {
                                console.log(error);
                            }
                        });
            // 操作符
            //end
        });
    });
});
