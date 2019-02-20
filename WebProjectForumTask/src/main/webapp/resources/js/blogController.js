$(document).ready(function () {

    var pathname = window.location.pathname;
    var search = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ) );
    pathname = pathname.replace("all", "topics/subjects");
    var id = pathname.match("\\d+");
    if (id === null) {
        buildSubjects(pathname + "?" + search + "&size=3");
    } else {
        var checkedPath = "topics/" + id;
        pathname = pathname.replace(id, checkedPath);
        buildSubjects(pathname + "/subjects");
        changeTopicName(pathname);
    }
});

function olderPage(value) {         //fix this
    var href = $(value).attr("href");
    var page = parseInt(href.slice(-1));
    page++;
    href = href.replace(/.$/,page);
    $(value).attr("href", href);
}

function newerPage(value) {         //fix this
    var href = $(value).attr("href");
    var page = parseInt(href.slice(-1));
    page--;
    href = href.replace(/.$/,page);
    $(value).attr("href", href);
}

function buildSubjects(subjectsPath) {
    var currentSubject = $("#username").val();
    $.getJSON(subjectsPath, function (data) {
        $.each(data, function (key, value) {
            value.text = value.text.split(".")[0] + ".";
        });
        $("#subjectsTemplate").tmpl(data).appendTo(".aggregate-subjects");
        $('.subject-update[name = ' + currentSubject + ']').show();
        $('.admin-update[name = ' + currentSubject + ']').hide();
    });
}

function changeTopicName(subjectsPath) {
    $.getJSON(subjectsPath, function (data) {
        $(".topicName").text(data.topicName);
    })
}