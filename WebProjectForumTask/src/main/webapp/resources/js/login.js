$(document).ready(function () {
    internationalization();
});


function internationalization() {
    var lang = $("#lang").val();
    var array;
    $.i18n.properties({
        name: 'admin',
        path: '/resources/bundle',
        mode: 'both',
        cache: true,
        language: lang,
        callback: function () {
            array = $.i18n.map;
            $.each(array, function (index, value) {
                $("." + index).text(value);
            });
            $(".login-button-submit").val($.i18n.prop("login-button-submit"));
            $(".login-button-reset").val($.i18n.prop("login-button-reset"));

        }
    })
}