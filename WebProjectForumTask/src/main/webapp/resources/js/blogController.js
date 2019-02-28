$(document).ready(function () {

    // var pathname = window.location.pathname;
    // var searchPage = '';//decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ) );
    // pathname = pathname.replace("/blog/","");
    // var id = pathname.substring(0,pathname.indexOf("/"));
    // var numberPage = pathname.replace(id + "/page","");
    // if (pathname === numberPage) {
    //     id = pathname;
    //     numberPage = 1;
    // }
    paginate();
});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

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

// function searchPage() {
//     var search = $("#search-subjects").val();
//     window.location.href = window.location.href + "?search=" + search;
// }

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

function paginate() {
    // var path;
    // var home;
    // if (search !== "") {
    //     search = "?" + search;
    // }
    // if (id === "all") {
    //     path = $('#subject-all-path').attr("href") + search;
    //     home = $('#home-path').attr("href");
    // } else {
    //     path = $('#subject-id-path').attr("href") + search;
    //     path = path.replace("id",id);
    //     home = $('#home-id-path').attr("href");
    //     home = home.replace("id",id);
    //      changeTopicName(path)
    // }
    var pagination = $('#pagination-demo');
    var visiblePages = 3;
    var pages = Math.ceil(parseInt(pagination.attr("data-length"))/3);
    pagination.twbsPagination({
        totalPages: pages,
        visiblePages: visiblePages,
        onPageClick: function (event,page) {
            var currentPage = getParameterByName("page").toString();
            var buttonPage = page.toString();

        }
    });
    // var currentPage = getParameterByName('page');
    // var container = $('#paginate-example');
    // var totalNumber =  container.attr("data-length");
    // var numberPage;
    // container.pagination({
    //     totalNumber: totalNumber,
    //     pageNumber: currentPage,
    //     pageSize: 3,
    //     showNavigator: true,
    //     formatNavigator: '<span class="admin-format-navigator-showing">Showing</span> <%= currentPage %> <span class="admin-format-navigator-page">page</span>,' +
    //         ' <%= totalPage %> <span class="admin-format-navigator-pages">pages</span>, <%= totalNumber %> <span class="admin-format-navigator-entries">entries</span>',
    //     position: 'top',
    //     callback: function (pagination) {
    //         var currentSubject = $("#username").val();
    //         numberPage = pagination.pageNumber;
    //         $('.subject-update[name = ' + currentSubject + ']').show();
    //         $('.admin-update[name = ' + currentSubject + ']').hide();
    //         internationalization();
    //     }
    // });
    // container.addHook('afterPageOnClick', function() {
    //     var page = container.pagination('getSelectedPageNum');
    //     movePages(page,numberPage,id)
    // });
    // container.addHook('afterNextOnClick', function() {
    //     var page = container.pagination('getSelectedPageNum');
    //     movePages(page,numberPage,id)
    // });
    // container.addHook('afterPreviousOnClick', function() {
    //     var page = container.pagination('getSelectedPageNum');
    //     movePages(page,numberPage,id)
    // });



}