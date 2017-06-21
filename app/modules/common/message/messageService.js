window.APP.factory("MessageService", [
    "$rootScope",
    "$compile",
    ($rootScope, $compile) => {
    
    let service = {},
        $body = $('body'),
        imgs = {
            success: 'img/icon_success.svg',
            info: 'img/icon_info.svg',
            warning: 'img/icon_warning.svg',
            error: 'img/icon_error.svg'
        },
        defaultOptions = {
            showClose: false,
            message: '',
            duration: 3000,
            type: 'success'
        };
    
    service.message = (options) => {
        options = $.extend({}, defaultOptions, options);
        let imgSrc = imgs[options.type] || imgs.success,
            html = `<div m-message m-img-src="${imgSrc}"
                        m-message-content="${options.message}"
                        m-message-close="${options.showClose}"
                        m-duration="${options.duration}">
                    </div>`;
        $body.append($compile(html)($rootScope));
    };

    service.success = (msg) => {
        return service.message({
            type: "success",
            message: msg
        });
    };

    service.error = (msg) => {
        return service.message({
            type: "error",
            message: msg
        });
    };

    return service;
}]);