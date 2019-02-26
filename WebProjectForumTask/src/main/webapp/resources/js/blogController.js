$(document).ready(function () {

    var pathname = window.location.pathname;
    var searchPage = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ) );
    var onlySearch = searchPage.replace("&page=1", "");
    pathname = pathname.replace("all", "topics/subjects");
    var id = pathname.match("\\d+");
    if (id === null) {
        buildSubjects(pathname + "?" + searchPage + "&size=3");
        $.getJSON(pathname + "?" + onlySearch + "&page=0&size=0", function (data) {
            var jsonObject = JSON.stringify(data);
            var count = JSON.parse(jsonObject).length;
            var pages = Math.floor(count / 3);
            if ((count % 3 !== 0) || (count === 0)) pages++;
            changeTopicNameToSearch(onlySearch,count);
        var page = parseInt(searchPage.slice(-1));
        if (page === 1) $("#newer-page").addClass("disabled");
        if (page === pages) $("#older-page").addClass("disabled");
        });
    } else {
        var checkedPath = "topics/" + id;
        pathname = pathname.replace(id, checkedPath);
        buildSubjects(pathname + "/subjects?" + searchPage + "&size=3");
        $.getJSON(pathname + "/subjects", function (data) {
            var jsonObject = JSON.stringify(data);
            var count = JSON.parse(jsonObject).length;
            var pages = Math.floor(count / 3);
            if ((count % 3 !== 0) || (count === 0)) pages++;
            var page = parseInt(searchPage.slice(-1));
            if (page === 1) $("#newer-page").addClass("disabled");
            if (page === pages) $("#older-page").addClass("disabled");
        });
        changeTopicName(pathname);
    }
    internationalization();
});

function internationalization() {
    var lang = $("#lang").val();
    $.i18n.properties({
        name: 'admin',
        path: '/resources/bundle',
        mode: 'both',
        cache: true,
        language: lang,
        callback: function () {
            var array = $.i18n.map;
            $.each(array, function (index, value) {
                $("." + index).html(value);
            });
        }
    })
}

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

function searchPage() {
    var search = $("#search-subjects").val();
    location.href = "?search=" + search + "&page=1";
}

function changeTopicNameToSearch(onlySearch,count) {
    if(onlySearch.includes("search=")) {
        var word = onlySearch.replace("search=","");
        $(".topicName").text('Search by word "'+ word +'"');
    }
    if (count === 0) {
        $(".topicName").text('No results with word "'+ word +'"');
    }
}