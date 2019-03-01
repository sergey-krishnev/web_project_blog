$(document).ready(function () {

    var pathname = window.location.pathname;
    pathname = pathname.replace("/post/","");
    var subjectPath = "/subjects/" + pathname;

    $.getJSON(subjectPath, function (data) {
        $("#subjectTemplate").tmpl(data).appendTo(".aggregate-post");
        internationalization();
    });
    buildComments(subjectPath + "/comments");
    $.getJSON(subjectPath, function (data) {
        addComment(data.topicName, data.subjectName, subjectPath + "/comments");
    });
    addSubjectForm(pathname);
    updateSubjectForm(pathname);
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
                $("." + index).text(value);
            });
            $(".admin-search").attr("placeholder",$.i18n.prop("admin-search"));
            $("#subject-name-add-form").attr("placeholder",$.i18n.prop("admin-data-table-head-subject"));

        }
    })
}

function addSubjectForm(pathname) {
    if (pathname.includes("add")) {
        $(".comment-form").css("display", "none");
        $(".subject-add-form").css("display", "block");
        selectTopics();
    }
}

function addSubjectSubmit() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var map = {};
    $(".subject-add").each(function () {
        map[$(this).attr("name")] = $(this).val();
    });
    map["id"] = 1;
    map["userName"] = $("#username").val();
    map["date"] = date + ' ' + time;

    $.ajax({
        type: "POST",
        url: "/subjects",
        headers : {
            "X-CSRF-Token" : $('meta[name="_csrf"]').attr('content')
        },
        data: JSON.stringify(map),
        contentType: 'application/json; charset=UTF-8',
        dataType: "json",
        success: function (data, textStatus, xhr) {
            alert("success");
            window.location.href = "/blog/all"
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var obj = JSON.parse(jqXHR.responseText);
            var objStr = obj.errors.toString();
            var array = objStr.split(',');
            var lang = $("#lang").val();
            $.i18n.properties({
                name: 'messages',
                path: '/resources/bundle',
                mode: 'both',
                language: lang,
                callback: function () {
                    $.each(array, function (index, value) {
                        var hashvalue = "." + value;
                        $(hashvalue).text($.i18n.prop(value));
                    })
                }
            })
        }
    })
}

function updateSubjectForm(pathname) {
    if (pathname.includes("update")) {
        $(".comment-form").css("display", "none");
        $(".subject-update-form").css("display", "block");
        pathname = pathname.replace("/update","");
        $.getJSON("/subjects/" + pathname, function (data) {
            selectWithSelectedTopics(data.topicName);
            $.each(data, function (key, value) {
                $("#" + key.toString() + "-update-form").val(value);
            });
            $(".update-subject-submit").attr("data-url","/subjects/" + data.id);
        });

    }
}

function updateSubjectSubmit(value) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var pathUpdate = $(value).data("url");
    var map = {};
    $(".subject-update").each(function () {
        map[$(this).attr("name")] = $(this).val();
    });
    map["id"] = 1;
    map["date"] = date + ' ' + time;

    $.ajax({
        type: "PUT",
        url: pathUpdate,
        headers: {
            "X-CSRF-Token": $('meta[name="_csrf"]').attr('content')
        },
        data: JSON.stringify(map),
        contentType: 'application/json; charset=UTF-8',
        dataType: "json",
        success: function (data, textStatus, xhr) {
            alert("success");
            window.location.href = "/blog/all"
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var obj = JSON.parse(jqXHR.responseText);
            var objStr = obj.errors.toString();
            var array = objStr.split(',');
            var lang = $("#lang").val();
            $.i18n.properties({
                name: 'messages',
                path: '/resources/bundle',
                mode: 'both',
                language: lang,
                callback: function () {
                    $.each(array, function (index, value) {
                        var hashvalue = "." + value;
                        $(hashvalue).text($.i18n.prop(value));
                    })
                }
            })
        }
    })
}

function buildComments(commentsPath) {
    $(".aggregate-comments").empty();
    $.getJSON(commentsPath, function (data) {
        $("#commentsTemplate").tmpl(data).appendTo(".aggregate-comments");
        internationalization();
    })
}

function addComment(topicName, subjectName, updateCommentsPath) {
    $(document).on('click', '.add-comment', function () {

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        var map = {};
        map["id"] = 1;
        map["userName"] = $("#username").val();
        map["topicName"] = topicName;
        map["subjectName"] = subjectName;
        map["message"] = $(".text-message").val();
        map["date"] = date + ' ' + time;

        $.ajax({
            type: "POST",
            url: "/comments",
            headers : {
                "X-CSRF-Token" : $('meta[name="_csrf"]').attr('content')
            },
            data: JSON.stringify(map),
            contentType: 'application/json; charset=UTF-8',
            dataType: "json",
            success: function (data, textStatus, xhr) {
                $(".text-message").empty();
                alert("success");
                // var htmlMap = $("#" + pathname + "Template").tmpl(map);
                // alert(htmlMap);
                // htmlMap.appendTo("#" + pathname + "Body"); //Change
                // alert("success");
                buildComments(updateCommentsPath)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var obj = JSON.parse(jqXHR.responseText);
                var objStr = obj.errors.toString();
                var array = objStr.split(',');
                var lang = $("#lang").val();
                $.i18n.properties({
                    name: 'messages',
                    path: '/resources/bundle',
                    mode: 'both',
                    language: lang,
                    callback: function () {
                        $.each(array, function (index, value) {
                            var hashvalue = "." + value;
                            $(hashvalue).text($.i18n.prop(value));
                        })
                    }
                })
            }
        })
    })
}

function selectTopics() {
    var lang = $("#lang").val();
    $.i18n.properties({
        name: 'admin',
        path: '/resources/bundle',
        mode: 'both',
        cache: true,
        language: lang,
        callback: function () {
            $.getJSON("/topics", function (data) {
                var topicDTO_data = '<option selected disabled>'+ $.i18n.prop("admin-modal-select-topic") +'</option>';
                topicDTO_data += '';
                $.each(data, function (key, value) {
                    topicDTO_data += '<option value="' + value.topicName + '">' + value.topicName + '</option>';
                });
                $(".topics-select-update").html(topicDTO_data);
            });
        }
    })
}

function selectWithSelectedTopics(topic) {
    $.getJSON("/topics", function (data) {
        var topicDTO_data = '';
        $.each(data, function (key, value) {
            if (value.topicName === topic) {
                topicDTO_data += '<option selected value="' + value.topicName + '">' + value.topicName + '</option>';
            } else {
                topicDTO_data += '<option value="' + value.topicName + '">' + value.topicName + '</option>';
            }
        });
        $(".topics-select-update").html(topicDTO_data);
    });
}

function searchPage() {
    var search = $("#search-subjects").val();
    location.href = "/blog/all?search=" + search;
}