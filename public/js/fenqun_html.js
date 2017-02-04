		define(function(require, exports, module) {

		    var htmlTpl = {};
		    htmlTpl.order = 1;
		    htmlTpl.htmlduli1 = '<div class="style_out1 duli" data-fanhui="" data-returnField="" data-returnfield-addindex=""  data-arystr="">' +
		        '<div class="ks_se ks_se001">' +
		        '<select class="form-control">' +
		        '<option value="">选择条件类型</option>' +
		        '<option value="1">用户属性</option>' +
		        '<option value="2">触发事件</option>' +
		        '<option value="3">原生SQL</option>' +
		        '</select>' +
		        '</div>' +
		        '<div class="nextappend">' +
		        '<div class="sj_ap"></div>' +
		        '</div>' +
		        '</div>';

		    htmlTpl.htmlduli2 = function(order) {
		        return '<div class="warp_form1" data-index-str="" data-relatedFields="" data-inputstr="" data-order="' + order + '">' +
		            '<div class="xz_fh">选择返回值</div>' +
		            '<div class="xz_glzd_btn">选择关联字段</div>' +
		            '<div class="djxz_out">' +
		            '<div class="djfhbf">' +
		            '<div class="zdxs_box"></div>' +
		            '<div class="po_right">+</div>' +
		            '<div class="po_right2"></div>' +
		            '<div class="po_right3 ">选择完成</div>' +
		            '<div class="leftfloat1"></div>' +
		            '<div class="next_apd"></div>' +
		            '</div>' +
		            '</div>' +
		            '<div class="tjhz button button-primary button-rounded button-small">OR</div>' +
		            '<div class="style_out1 duli" data-fanhui="" data-returnField="" data-returnfield-addindex="" data-arystr="">' +
		            '<div class="ks_se ks_se001">' +
		            '<select class="form-control">' +
		            '<option value="">选择条件类型</option>' +
		            '<option value="1">用户属性</option>' +
		            '<option value="2">触发事件</option>' +
		            '<option value="3">原生SQL</option>' +
		            '</select>' +
		            '</div>' +
		            '<div class="nextappend">' +
		            '<div class="sj_ap"></div>' +
		            '</div>' +
		            '</div>' +
		            '</div>';

		    };
		    module.exports = htmlTpl;
		});
