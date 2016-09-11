// 无法知道totalPage(总页数)

// TODO 首页, 下一页, 页码列表(当前页为最后一项), ...(省略号), 下一页

var CLASS_CONTAINER = 'pager-container';
var CLASS_MESSAGE = 'pager-message';
var CLASS_MESSAGE_NUM = 'pager-message-num';
var CLASS_LIST = 'pager-list';
var CLASS_NUMBER = 'pager-number';
var CLASS_CURRENT = 'pager-current';
var CLASS_FIRST = 'pager-first';
var CLASS_LAST = 'pager-last';
var CLASS_NEXT = 'pager-next';
var CLASS_PREV = 'pager-previous';
var CLASS_DISABLE = 'pager-disable';

(function($) {
    $.fn.pager = function(options) {
        var options = $.extend({}, $.fn.pager.defaults, options);

        return this.each(function() {
            $(this).empty();
            $(this).addClass(CLASS_CONTAINER);
            $(this).append(renderPagerList(options));
        });
    }

    // 渲染pagerList
    function renderPagerList(options) {
        var callBack = options.callBack;
        var omitEnable = false;
        var maxPageNum = options.maxPageNum;
        var pageNum = options.pageNum;
        // 列表
        var $pagerList = $('<ul class=' + CLASS_LIST + '></ul>');
        /* ----> 特殊按钮 <---- */
        // first
        var firstEnable = pageNum <= 1 ? false : true;
        $pagerList.append(renderButton(CLASS_FIRST, options.firstText, 1, callBack, firstEnable));
        // prev
        var prevEnable = firstEnable;
        $pagerList.append(renderButton(CLASS_PREV, options.prevText, pageNum - 1, callBack, prevEnable));

        /* ----> 数字按钮 <---- */
        var startNum = 1;
        var endNum = options.maxButtomNum;
        var midNum = parseInt(endNum / 2);

        if (pageNum > midNum) {
            startNum = pageNum - midNum;
            endNum = pageNum + midNum;
        }

        if (endNum > maxPageNum) {
            startNum = maxPageNum - (options.maxButtomNum - 1);
            endNum = maxPageNum;
        }

        if (startNum < 1) {
            startNum = 1;
        }

        // preOmit
        if (startNum > 1) {
            $pagerList.append(renderButton(CLASS_NUMBER, options.omitText, 0, callBack, omitEnable));
        }

        for (var page = startNum; page <= endNum; page++) {
            var enable = page == pageNum ? false : true;
            var btnClass = enable ? CLASS_NUMBER : CLASS_CURRENT;
            $pagerList.append(renderButton(btnClass, page, page, callBack, enable));
        }
        
        // nextOmit
        if (!options.isLastPage) {
            $pagerList.append(renderButton(CLASS_NUMBER, options.omitText, 0, callBack, omitEnable));
        }
        // next
        var nexEnable = options.isLastPage ? false : true;
        $pagerList.append(renderButton(CLASS_NEXT, options.nextText, pageNum + 1, callBack, nexEnable));

        return $pagerList;
    }

    function renderButton(buttonClass, buttonText, pageNum, callBack, enable) {
        var $button = $('<li class=' + buttonClass + '></li>');
        var $buttonContent = $('<a href="javascript:;"><span>' + buttonText + '</span></a>');
        $button.append($buttonContent);

        if (!enable) {
            $button.addClass(CLASS_DISABLE);
        } else {
            $button.click(function() {
                callBack(pageNum);
            });
        }
        return $button;
    }

    $.fn.pager.defaults = {
        maxButtomNum: 5, // 最大数字按钮数, 建议为奇数
        pageNum: 1, // 当前页码数
        maxPageNum: 1, // 记录最大的页码数
        isLastPage: false, // 是否最后一页
        omitText: '...',
        nextText: '',
        prevText: '',
        firstText: '首页'
    };
})(jQuery);