define(function(require, exports, module) {
          var apiUrl = {
                "operator_modular": "http://datasea.csqccr.com/operation/", //操作符模块
                "model_modular": "http://datasea.csqccr.com/model/", //model模块
                "action_modular": "http://datasea.csqccr.com/action/", //行为模块
                "model_column": "http://datasea.csqccr.com/model/", //行为模块/model/column.json?modelId=4
                "element_column": "http://datasea.csqccr.com/element/" //element模块
            }

//保存
            $(document).on('click', '.save_btn', function(event) {
                event.preventDefault();
                /* Act on the event */

                var getInfo = $('.jtdt').html(); //空判断1
                if (getInfo == '') {
                    console.log('请选择信息')
                } else {
                    var elementName = $('.ysmc').val(); //元素名称:elementName
                    var actionId = $('.ysgsxwmc_se').val(); //元素归属行为名称
                    var modelId = $('.mxb_se').val(); //模型表
                    var elementOperationId = ""; //元素的操作符id
                    var elementDataField = ""; //关联的模型的字段
                    var elementDataType = ""; //关联的模型的字段
                    var elementDataGroupFields = "";
                    var elementDataHavingFields = "";
                    var elementOperationId = $('.czf_add').val();
                    var elementUnit = $('.ysdw').val();
                    var elementValueType = $('#selectTravelCity').val();
                    if ($('.djxzmxzd').html() != '') {
                        elementOperationId = $('.djxzmxzd').attr('data-id');
                        elementDataField = $('.text_show').html();
                        elementDataType = $('.lx_show').html();
                    };
                    if ($('.jtdt').html() == '动态') {
                        elementDataGroupFields = $('.appendzd').html();
                        elementDataHavingFields = $('.appendzd2').html();
                    };
                    /*验证信息*/
                    //元素值类型
                    if(elementValueType==""||elementValueType==null){
                           $('#selectTravelCity').addClass('errorts1');
                        $('.tishi').show().text('请选择元素值类型！');
                        var t = setTimeout(function() {
                            $('.tishi').hide().text('');
                            
                        }, 1500);
                        return false;
                    }
                    //元素值类型
                    //元素名称
                    if (elementName == "") {
                        $('.ysmc').addClass('errorts1');
                        $('.tishi').show().text('请输入元素名称！');
                        var t = setTimeout(function() {
                            $('.tishi').hide().text('');
                            $('.ysmc').focus();
                        }, 1500);
                        return false;
                    };
                    //元素名称
                    //元素单位
                    if (elementUnit == "") {
                        $('.ysdw').addClass('errorts1');
                        $('.tishi').show().text('请输入元素单位！');
                        var t = setTimeout(function() {
                            $('.tishi').hide().text('');
                            $('.ysdw').focus();
                        }, 1500);
                        return false;
                    };
                    //元素单位
                    //元素模型表
                    if(modelId==""||modelId==null){
                        
                         $('.mxb_se').addClass('errorts1');
                        $('.tishi').show().text('请选择元素模型表！');
                        var t = setTimeout(function() {
                            $('.tishi').hide().text('');
                     
                        }, 1500);
                        return false;
                    }
                    //元素模型表
                    //元素字段名称和类型
                    if(elementDataType==""){
                           $('.tishi').show().text('请元素字段名称和类型！');
                        var t = setTimeout(function() {
                            $('.tishi').hide().text('');
                     
                        }, 1500);
                        return false;
                    }
                    //元素字段名称和类型
                    //元素所属ID
                    if (actionId == "" || actionId == null) {
                        $('.ysgsxwmc_se').addClass('errorts1');
                        $('.tishi').show().text('元素所属ID不能为空！');
                        var t = setTimeout(function() {
                            $('.tishi').hide().text('');

                        }, 1500);
                        return false;
                    };

                    //元素所属ID
                    /*验证信息*/
                    element = {
                        "elementName": elementName,
                        "actionId": actionId,
                        "modelId": modelId,
                        "elementDataField": elementDataField,
                        "elementDataType": elementDataType,
                        "elementOperationId": elementOperationId,
                        "elementDataGroupFields": elementDataGroupFields,
                        "elementDataHavingFields": elementDataHavingFields,
                        "elementValueType": elementValueType,
                        "elementOperationId": elementOperationId,
                        "elementUnit": elementUnit

                    };
                    var dataInfo = JSON.stringify(element);
                    console.log(dataInfo);
                    var apiGet = apiUrl.element_column + "insert.json?element=" + dataInfo;
                    //聚合字段组:elementDataGroupFields

                    $.ajax({
                        type: "get",
                        async: false,
                        url: apiGet,
                        dataType: "jsonp",
                        jsonp: "callback",
                        jsonpCallback: "element",
                        success: function(data) {
                            console.log(data)
                            var dataInfo = data;
                            if (data.result.success) {
                                $('.tishi').show().text(data.result.statusText);
                                var t = setTimeout(function() {
                                    $('.tishi').hide().text('');
                                    window.location.reload();
                                }, 19200);
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
                    //分组筛选字段组:elementDataHavingFields
                }

            });
            //保存

});
