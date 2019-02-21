$(document).ready(function () {

    var pathname = window.location.pathname;
    var search = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ) );
    pathname = pathname.replace("all", "topics/subjects");
    var id = pathname.match("\\d+");
    if (id === null) {
        buildSubjects(pathname + "?" + search + "&size=3");
        $.getJSON(pathname, function (data) {
            var jsonObject = JSON.stringify(data);
            var count = JSON.parse(jsonObject).length;
            var pages = Math.floor(count / 3);
            if (count % 3 !== 0) pages++;
        var page = parseInt(search.slice(-1));
        if (page === 1) $("#newer-page").addClass("disabled");
        if (page === pages) $("#older-page").addClass("disabled");
        });
    } else {
        var checkedPath = "topics/" + id;
        pathname = pathname.replace(id, checkedPath);
        buildSubjects(pathname + "/subjects?" + search + "&size=3");
        $.getJSON(pathname + "/subjects", function (data) {
            var jsonObject = JSON.stringify(data);
            var count = JSON.parse(jsonObject).length;
            var pages = Math.floor(count / 3);
            if ((count % 3 !== 0) || (count === 0)) pages++;
            var page = parseInt(search.slice(-1));
            if (page === 1) $("#newer-page").addClass("disabled");
            if (page === pages) $("#older-page").addClass("disabled");
        });
        changeTopicName(pathname);
    }
});

function olderPage() {
    var search = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ) );
    var page = parseInt(search.slice(-1));
    page++;
    search = search.replace(/.$/,page);
    window.location.href = window.location.pathname + "?" + search;
}

function newerPage() {
    var search = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ) );
    var page = parseInt(search.slice(-1));
    page--;
    search = search.replace(/.$/,page);
    window.location.href = window.location.pathname + "?" + search;
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