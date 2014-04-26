$(document).ready(function () {

    $("#MainMenuOptions").hide();

    $("#MainMenu").click(function () {
        $("#MainMenuOptions").show(500);
    });


    $("#MenuPanel").css("border", "1px solid black");
    $(".link").css("border", "1px solid black");
});