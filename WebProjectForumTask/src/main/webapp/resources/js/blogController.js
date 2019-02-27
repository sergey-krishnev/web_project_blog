$(document).ready(function () {

    var pathname = window.location.pathname;
    var searchPage = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ) );
    pathname = pathname.replace("/blog/","");
    var id = pathname.substring(0,pathname.indexOf("/"));
    var numberPage = pathname.replace(id + "/page","");
    if (pathname === numberPage) {
        id = pathname;
        numberPage = 1;
    }
    paginate(id, numberPage,searchPage);
    // if (id === null) {
        // buildSubjects(pathname + "?" + searchPage + "&size=3");
        // $.getJSON(pathname + "?" + onlySearch + "&page=0&size=0", function (data) {
        //     var jsonObject = JSON.stringify(data);
        //     var count = JSON.parse(jsonObject).length;
        //     var pages = Math.floor(count / 3);
        //     if ((count % 3 !== 0) || (count === 0)) pages++;
        //     changeTopicNameToSearch(onlySearch,count);
        // var page = parseInt(searchPage.slice(-1));
        // if (page === 1) $("#newer-page").addClass("disabled");
        // if (page === pages) $("#older-page").addClass("disabled");
        // });
    // } else {
        // var checkedPath = "topics/" + id;
        // pathname = pathname.replace(id, checkedPath);
        // buildSubjects(pathname + "/subjects?" + searchPage + "&size=3");
        // $.getJSON(pathname + "/subjects", function (data) {
        //     var jsonObject = JSON.stringify(data);
        //     var count = JSON.parse(jsonObject).length;
        //     var pages = Math.floor(count / 3);
        //     if ((count % 3 !== 0) || (count === 0)) pages++;
        //     var page = parseInt(searchPage.slice(-1));
        //     if (page === 1) $("#newer-page").addClass("disabled");
        //     if (page === pages) $("#older-page").addClass("disabled");
        // });
        // changeTopicName(pathname);
    // }
    // internationalization();
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
            $(".admin-search").attr("placeholder",$.i18n.prop("admin-search"));
        }
    })
}

function changeTopicName(subjectsPath) {
    subjectsPath = subjectsPath.replace("/subjects","");
    $.getJSON(subjectsPath, function (data) {
        $(".topicName").text(data.topicName);
    })
}

function searchPage() {
    var search = $("#search-subjects").val();
    window.location.href = window.location.href + "?search=" + search;
}

function movePages(page,numberPage,id) {
    if (page === 1) {
        window.location.href = window.location.href.replace("/page"+numberPage,"");
    } else {
        window.location.href = window.location.href.replace("page" + numberPage, "page" + page);
    }
    if (numberPage === 1) {
        window.location.href = window.location.href.replace(id,id+"/page"+page);
    }
}
function paginate(id, numberPage,search) {
    var path;
    var home;
    if (search !== "") {
        search = "?" + search;
    }
    if (id === "all") {
        path = $('#subject-all-path').attr("href") + search;
        home = $('#home-path').attr("href");
    } else {
        path = $('#subject-id-path').attr("href") + search;
        path = path.replace("id",id);
        home = $('#home-id-path').attr("href");
        home = home.replace("id",id);
        changeTopicName(path)
    }
    var container = $('#paginate-example');
    container.pagination({
        dataSource: function (done) {
            $.ajax({
                type: 'GET',
                url: path,
                success: function (response) {
                    done(response);
                }
            });
        },
        pageNumber: numberPage,
        pageSize: 3,
        showNavigator: true,
        formatNavigator: '<span class="admin-format-navigator-showing">Showing</span> <%= currentPage %> <span class="admin-format-navigator-page">page</span>,' +
            ' <%= totalPage %> <span class="admin-format-navigator-pages">pages</span>, <%= totalNumber %> <span class="admin-format-navigator-entries">entries</span>',
        position: 'top',
        callback: function (data,pagination) {
            var currentSubject = $("#username").val();
            $.each(data, function (key, value) {
                value.text = value.text.split(".")[0] + ".";
            });
            $(".aggregate-subjects").empty();
            $("#subjectsTemplate").tmpl(data).appendTo(".aggregate-subjects");
            $('.subject-update[name = ' + currentSubject + ']').show();
            $('.admin-update[name = ' + currentSubject + ']').hide();
            internationalization();
        }
    });
    container.addHook('afterPageOnClick', function() {
        var page = container.pagination('getSelectedPageNum');
        movePages(page,numberPage,id)
    });
    container.addHook('afterNextOnClick', function() {
        var page = container.pagination('getSelectedPageNum');
        movePages(page,numberPage,id)
    });
    container.addHook('afterPreviousOnClick', function() {
        var page = container.pagination('getSelectedPageNum');
        movePages(page,numberPage,id)
    });


}