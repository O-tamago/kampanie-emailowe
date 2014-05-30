$(document).ready(function () {



    $("#MainMenu").click(function () {
        $("#MainMenuOptions").show(500);
    });
    $("#emailPassword").focus(function () {
        $("#emailPassword").prop("type", "text");
    });
    $("#emailPassword").focusout(function () {
        $("#emailPassword").prop("type", "password");
    });
    $("#MenuPanel").css("border", "1px solid black");
    $(".link").css("border", "1px solid black");


    $(".tipRight").tooltip({
        placement: "right"
    });
    $(".tipTop").tooltip({
        placement: "top"
    });
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
    });



$(".sidebar-nav li").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("active");

});
});