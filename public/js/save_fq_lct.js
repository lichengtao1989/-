		define(function(require, exports, module) {

		    require.async(['./jquery.2.1.4.min.js'], function() {
		        var apiUrl = {
		                "operator_modular": "http://datasea.csqccr.com/operation/", //操作符模块
		                "model_modular": "http://datasea.csqccr.com/model/", //model模块
		                "action_modular": "http://datasea.csqccr.com/action/", //行为模块
		                "model_column": "http://datasea.csqccr.com/model/", //行为模块/model/column.json?modelId=4
		                "element_column": "http://datasea.csqccr.com/element/", //element模块
		                "group": "http://datasea.csqccr.com/group/" //分群新增
		            }
		            //执行类型change
		        $(document).on('change', '.ks_se02 select', function(event) {
		            event.preventDefault();
		            /* Act on the event */
		            var _this = $(this);
		            var _thisVal = _this.val();
		           
		            if (_thisVal == 2) {
		                $('.shidep').show();
		            } else {
		                $('.shidep').hide();
		            };
		        });
		        //执行类型change

		        $(document).on('click', '.saving', function(event) {
		            event.preventDefault();

		            /* Act on the event */
		            var groupName = $('.groupName').val();
		            if (groupName == "") {
		                $('.tishi').show().text('请输入名称');
		                $('.groupName').focus();
		                var t = setTimeout(function() {
		                    $('.tishi').hide().text('');
		                }, 1000);
		                return;
		            };
		            var isCycle = parseInt($('.isCycle input[type="radio"]:checked').val());
		            var isPublic = parseInt($('.isPublic input[type="radio"]:checked').val());
		            var isPush = parseInt($('.isPush input[type="radio"]:checked').val());
		            var status = parseInt($('.status input[type="radio"]:checked').val());
		            var cron = "";
		            var boolConditions = [];
		            if ($('.ks_se02 select').val() == 2) {
		                cron = $('.cronlct .input-group input').val();
		            };
		            var boolConditions = [];
		            var and_num = $('.warp_form1');
		            var and_num_length = and_num.length;
		            // 数组push 对象
		            var emptyObj1 = {};
		            var emptyObj2 = {};
		            var emptyObj3 = {};
		            var order = "";
		            var relatedFields = "";
		            for (var i = 0; i < and_num_length; i++) {

		                var sigleI = $(and_num[i]);
		                order = sigleI.attr('data-order');
		                relatedFields = sigleI.attr('data-relatedFields');
		                var sigleIduli = sigleI.find('.duli');
		                emptyObj1.logic = 'and';
		                emptyObj1.order = order;
		                emptyObj1.relatedFields = relatedFields;
		                emptyObj1.groupConditions = [];
		                for (var j = 0; j < sigleIduli.length; j++) {

		                    emptyObj2.actionType = $(sigleIduli[j]).find('.nextappend').find('.sx_se_lct').find('option:selected').attr('data-actionType')||"";
		                    emptyObj2.actionId = $(sigleIduli[j]).find('.nextappend').find('.sx_se_lct').find('option:selected').attr('data-actionid')||"";
		                    emptyObj2.actionName = $(sigleIduli[j]).find('.nextappend').find('.sx_se_lct').find('option:selected').attr('data-actionName')||"";
		                    emptyObj2.elementId = $(sigleIduli[j]).find('.nextappend').find('.mc_se_lct').find('option:selected').attr('data-elementId')||"";
		                    emptyObj2.groupFields = $(sigleIduli[j]).find('.nextappend').find('.mc_se_lct').find('option:selected').attr('data-elementdatagroupfields')||"";
		                    emptyObj2.elementName = $(sigleIduli[j]).find('.nextappend').find('.mc_se_lct').find('option:selected').attr('data-elementName')||"";
		                    emptyObj2.operationValue = $(sigleIduli[j]).find('.nextappend').find('.czf_se_lct').val()||"";
		                    emptyObj2.elementValue = $(sigleIduli[j]).find('.nextappend').find('.srz_se_lct').val()||"";
		                    emptyObj2.returnFields = $(sigleIduli[j]).attr('data-returnfield')||"";
		                    emptyObj2.nativeSQL = $(sigleIduli[j]).find('.nextappend').find('.input_sql').val()||"";
		                    //取 havingConditions
		                    emptyObj2.havingConditions = [];
		                    var havingZd = $(sigleIduli[j]).find('.nextappend').find('.sj_ap .sj_jia_div');
		                    if (havingZd.length > 0) {
		                        for (var m = 0; m < havingZd.length; m++) {

		                            emptyObj3.aggFieldDataName = $(havingZd[m]).attr('data-aggfielddataname');
		                            emptyObj3.aggFieldDataField = $(havingZd[m]).attr('data-aggfielddatafield');
		                            emptyObj3.aggOperation = $(havingZd[m]).find('.bizjsf').val();
		                            emptyObj3.operationValue = $(havingZd[m]).find('.bjjsf').val();
		                            emptyObj3.aggValue = $(havingZd[m]).find('.aggValue').val();
		                            emptyObj2.havingConditions.push(emptyObj3);
		                            emptyObj3 = {};

		                        };
		                    };
		                    //取 havingConditions
		                    emptyObj1.groupConditions.push(emptyObj2);
		                    emptyObj2 = {};
		                };
		                boolConditions.push(emptyObj1);
		                emptyObj1 = {};
		            };
		              if(order>1){
		              	var num=order-1;
		              	var get_data_relatedfields=$('.warp_form1').eq(num).attr('data-relatedfields');
		              	if(get_data_relatedfields==""){
		              		  $('.tishi').show().text('还有关联字段没选择！');
		                        var t = setTimeout(function() {
		                            $('.tishi').hide().text('');
		                        }, 1000);
		                        return;
		              	};
		              };
		            var groupInfo = {
		                "groupName": groupName,
		                "isCycle": isCycle,
		                "isPublic": isPublic,
		                "isPush": isPush,
		                "status": status,
		                "cron": cron,
		                "boolConditions": boolConditions
		            };
		            console.log(groupInfo)
		            var dataInfo = JSON.stringify(groupInfo);
		           
		            /*ajax*/
		            //*
		            $.ajax({
		                type: "get",
		                async: false,
		                url: apiUrl.group + "insert.json?groupInfo=" + dataInfo,
		                dataType: "jsonp",
		                jsonp: "callback",
		                jsonpCallback: "group",
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
		           
		            /*ajax*/
		        });

		    });
		});
