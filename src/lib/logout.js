$(function() {
    $("#logout").click(function () {
        console.log("logout");
        STORAGE.remove('USERINFO');
        window.location = 'login.html';
    });
});