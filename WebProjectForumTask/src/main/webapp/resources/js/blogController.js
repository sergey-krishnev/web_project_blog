$(document).ready(function () {

    var path = $('#default-path').attr("href");
    var pathname = window.location.pathname;
    pathname = pathname.replace("all", "topics/subjects");
    var id = pathname.match("\\d+");
    if (id === null) {
        buildSubjects(pathname);
    } else {
        var checkedPath = "topics/" + id;
        pathname = pathname.replace(id, checkedPath);
        buildSubjects(pathname + "/subjects");
        changeTopicName(pathname);
    }

});

function buildSubjects(subjectsPath) {
    $.getJSON(subjectsPath, function (data) {
        $.each(data, function (key, value) {
            value.text = value.text.split(".")[0] + ".";
        });
        $("#subjectsTemplate").tmpl(data).appendTo(".aggregate-subjects");
    });
}

function changeTopicName(subjectsPath) {
    $.getJSON(subjectsPath, function (data) {
        $(".topicName").text(data.topicName);
    })
}