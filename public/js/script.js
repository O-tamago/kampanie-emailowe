$(document).ready(function () {

    $("#MainMenuOptions").hide();

    $("#MainMenu").click(function () {
        $("#MainMenuOptions").toggle(500);
    });

    $("#MenuPanel").mouseleave(function () {

        setTimeout(function () {
            $("#MainMenuOptions").hide(500);
        }, 1000);

    });

    $("#MenuPanel").css("border", "1px solid black");
    $(".link").css("border", "1px solid black");
});