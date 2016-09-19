// FIX一些头像无法显示
template.helper('avatar', function(urlString) {
    if (!urlString.startsWith('https:')) {
        urlString = 'https://' + urlString;
    }
    return urlString;
});

// FIX时间间隔
template.helper('timeSep', function(replyTime) {
    // 年 -> 月 -> 天 -> 小时 -> 分钟 -> 秒
    start = new Date(replyTime);
    now = new Date();
    yearSep = now.getFullYear() - start.getFullYear();
    if (yearSep > 0) {
        return yearSep + ' 年前';
    }
    monthSep = now.getMonth() - start.getMonth();
    if (monthSep > 0) {
        return monthSep + ' 月前';
    }
    daySep = now.getDay() - start.getDay();
    if (daySep > 0) {
        return daySep + ' 天前';
    }
    hourSep = now.getHours() - start.getHours();
    if (hourSep > 0) {
        return hourSep + ' 小时前';
    }
    minSep = now.getMinutes() - start.getMinutes();
    if (minSep > 0) {
        return minSep + ' 分钟前';
    }
    return '刚刚';
});
// tab转换
template.helper('tabMap', function(tab) {
    switch(tab) {
        case "share":
            return "分享";
        case "ask":
            return "问答";
        case "job":
            return "招聘";
        case "good":
            return "精华";
    }
});