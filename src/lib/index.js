var INDEX = (function () {
    var defaults = {
        page: 1,
        tab: 'all',
        limit: 20,
        mdrender: true
    };
    var maxPageNum = 1;
    var initPageList = function(options) {
        var options = $.extend({}, defaults, options);
        var getData = $.param(options);
        $.ajax({
            url: 'https://cnodejs.org/api/v1/topics?' + getData,
            type: 'GET',
            dataType: 'json',
            success: function(respData) {
                if (respData && respData.success === true) {
                    html = template('listCell', respData);
                    $('#list').html(html);
                    // 分页
                    maxPageNum = Math.max(maxPageNum, options.page);
                    var isLastPage = false;
                    if (respData.data.length < options.limit) {
                        isLastPage = true;
                    }
                    $('#pager').pager({
                        pageNum: options.page,
                        maxPageNum: maxPageNum,
                        isLastPage: isLastPage,
                        callBack: function(page) {
                            var _options = options;
                            _options.page = page;
                            initPageList(_options);
                        }
                    });
                }
            }
        });
    };

    var initTopicTab = function() {
        $('.topic-tab').click(function() {
            if ($(this).hasClass('current-tab')) {
                return false;
            }
            options = {
                tab: $(this).attr("data-tab")
            };
            maxPageNum = 1;
            initPageList(options);
            // 切换选中标签
            $(this).addClass('current-tab')
                .siblings().removeClass('current-tab');
        });
    };

    var initTopicClick = function() {
        $("#list").on('click', '.topic-title', function () {
            var id = $(this).attr("data-id");
            window.location = 'topicInfo.html?topicId=' + id;
        });
    }

    var getPage = function(pageNum) {
        var options = {
            tab: $(this).attr("data-tab"),
            page: pageNum
        };
        initPageList(options);
    };

    return {
        initPage: function() {
            initPageList();
            initTopicTab();
            initTopicClick();
        }
    }
})();