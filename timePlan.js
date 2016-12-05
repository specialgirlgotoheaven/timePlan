/**
 * Created by weie on 2016/12/5.
 * 第一版暂时不支持在弹框里设置更加详细的时间信息.即has_set_Popup: false//是否需要设置弹框在对话框里设置更加详细的时间信息
 */
/**
 * 2016-12-5
 * 1.支持尺子的刻度可配置,可设置刻度,一个大刻度有几个小刻度,每个小刻度的大小
 * 2.支持行数的控制,及每一行标题的设置
 * */
;(function ($,window,document,undefined) {
    var pluginName = 'timePlanModules';

    var timePlan = function(element,options) {

        this.init(element,options);


    };


    timePlan.prototype.init = function(element,options) {

        this.options = this.get_options(options);

        this.$element = $(element);

        this.$element.append('<div id="timePlan" class="timePlan"></div>');

        var timePlanElement = $('#timePlan');

        this.createRuler(timePlanElement);
        this.createPanels(timePlanElement);

    };

    timePlan.prototype.get_options = function(options) {
        options = $.extend({},this.get_defaults(),options);
        return this.validate_options(options);
    };

    timePlan.prototype.get_defaults = function() {
        return timePlan.DEFAULTS;
    };

    /**
     * 验证&校正用户输入
     * */
    timePlan.prototype.validate_options = function(options) {
        //options的各个值重新判断与改变

        return options;

    };

    /**
     * 默认值
     * */
    timePlan.DEFAULTS = {
        /**
         * 1.每天制定计划种类
         * 2.是否需要设置弹框
         * */
        start_timeRuler: "00",//时间尺的开始时间
        hours_per_ruler: 24,//一把时间尺有多少小时
        per_hour_cell_num: 2,//一个大刻度有几个小刻度
        start_timestamp: "00:00:00",//开始时间

        ruler_height: '15',//尺子高度

        cell_width:'15',//最小单位宽度==尺子最小单位宽度

        cell_height:'20',

        font_size:'9',

        per_day_has_Ruler: true,//是否每天都一把尺子

        days:['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],

        daysCellColor:'#777',

        has_set_Popup: false//是否需要设置弹框在对话框里设置更加详细的时间信息

    };

    timePlan.VERSION = '0.0.1';

    timePlan.prototype.createRuler = function($element) {
        var hourCount = this.options.hours_per_ruler;
        var cellCount = hourCount * this.options.per_hour_cell_num;


        var html = '';
        var first = true;
        for(var i = 0;i < hourCount;i++){

            if(i == hourCount - 1){
                html += '<span style="vertical-align:middle;display: inline-block;width:'+this.options.cell_width+'px;height:100%"></span></span><span class="lastRulerCell">'+hourCount+'</span>';
            }else if(i % this.options.per_hour_cell_num == 0){
                if(first){
                    html += '<span class="rulerCellMargin firstRulerCell"><span class="rulerCell rulerCellInner" style="vertical-align:middle;display: inline-block;width: '+this.options.cell_width+'px;height:50%;line-height: 50%">'+(i>9?i:'0'+i)+'</span>';
                    first = false;
                }else{
                    html += '</span><span class="rulerCellMargin"><span class="rulerCell rulerCellInner" style="vertical-align:middle;display: inline-block;width:'+this.options.cell_width+'px;height:50%;line-height: 50%">'+(i>9?i:'0'+i)+'</span>';
                }
            }else{
                if(i % this.options.per_hour_cell_num < this.options.per_hour_cell_num -1){
                    html += '<span class="rulerCell rulerCellInner" style="display: inline-block;width: '+this.options.cell_width+'px;height:50%;line-height: 50%"></span>';
                }else{
                    html += '<span class="rulerCell " style="display: inline-block;width: '+this.options.cell_width+'px;height:100%"></span>';
                }
            }
        }
        $element.append('<div class="ruler" style="font-size: '+this.options.font_size+'px;height:'+this.options.ruler_height+'px;line-height: '+this.options.ruler_height+'px;"><span class="titleTab" style="min-width: 50px;height: 100%;vertical-align: middle;display: inline-block"></span>'+html+'</div>');
    };
    timePlan.prototype.createSinglePanel = function($element,ifFirst,title){
        var hourCount = this.options.hours_per_ruler;
        //var cellCount = hourCount * this.options.per_hour_cell_num;

        var html = '';
        var first = true;

        for(var i = 0;i < hourCount;i++){
            if(i % this.options.per_hour_cell_num ==0){
                if(first){
                    first = false;
                    html += '<span class="dayCell firstDayCell daysInnerCell" style="border-top-color: '+this.options.daysCellColor+';border-left-color:'+ this.options.daysCellColor +' ;display: inline-block;width: '+this.options.cell_width+'px;height:100%;"></span>';
                }else{
                    html += '<span class="dayCell daysInnerCell" style="border-top-color: '+this.options.daysCellColor+';border-right-color:'+this.options.daysCellColor+' ;display: inline-block;width: '+this.options.cell_width+'px;height:100%"></span>';//'+(i>9?i:'0'+i)+'
                }

            }else{
                html += '<span class="dayCell daysInnerCell" style="border-top-color: '+this.options.daysCellColor+';border-right-color:'+this.options.daysCellColor+' ;display: inline-block;width: '+this.options.cell_width+'px;height:100%"></span>'
            }
        }
        if(!ifFirst){//如果是第一行,则border-top不设置
            $element.append('<div class="days" style="font-size: '+this.options.font_size+'px;height:'+this.options.cell_height+'px;line-height: '+this.options.cell_height+'px;"><span class="titleTab" style="min-width: 50px;line-height: 100%;height: 100%;vertical-align: middle;display:inline-block">'+title+'</span>'+html+'</div>');
        }else{
            $element.append('<div class="days " style="font-size: '+this.options.font_size+'px;height:'+this.options.cell_height+'px;line-height: '+this.options.cell_height+'px;"><span class="titleTab" style="min-width: 50px;line-height: 100%;height: 100%;vertical-align: middle;display:inline-block">'+title+'</span>'+html+'</div>');
        }
    };

    timePlan.prototype.createPanels = function($element){
        var arr = this.options.days;

        for(var i=0;i < arr.length;i++){
            this.createSinglePanel($element,i,arr[i]);
        }

    };

    $.fn[pluginName] = function (options) {
        this.each(function() {
            if(!$.data(this,"plugin_"+pluginName)){
                $.data(this,"plugin_"+pluginName,new timePlan(this,options));
            }
        });
        return this;
    }

})(jQuery,window,document);
