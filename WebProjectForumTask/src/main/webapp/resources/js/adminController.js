$(document).ready(function () {
    switchDashboard();
    removeModal();
    addModal();
    updateModal();
    read();
    pastePagination();
    buildTable();
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

            $(".admin-search").attr("placeholder",$.i18n.prop("admin-search"));
            $("#message-add-comments-modal").attr("placeholder",$.i18n.prop("admin-data-table-head-comment"));
            $("#subjectName-add-subjects-modal").attr("placeholder",$.i18n.prop("admin-data-table-head-subject"));
            $("#text-add-subjects-modal").attr("placeholder",$.i18n.prop("admin-data-table-head-text"));
            $("#userName-add-users-modal").attr("placeholder",$.i18n.prop("admin-data-table-head-username"));
            $("#password-add-users-modal").attr("placeholder",$.i18n.prop("admin-data-table-head-password"));
            $("#email-add-users-modal").attr("placeholder",$.i18n.prop("admin-data-table-head-email"));
            $("#firstName-add-users-modal").attr("placeholder",$.i18n.prop("admin-data-table-head-first-name"));
            $("#lastName-add-users-modal").attr("placeholder",$.i18n.prop("admin-data-table-head-last-name"));
            $("#topicName-add-topics-modal").attr("placeholder",$.i18n.prop("admin-data-table-head-topic"));

        }
    })
}

function removeModal() {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/","").toString();
    $('#delete-' + pathname + '-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var pathDelete = button.data('url');
        $("#delete-" + pathname + "-modal-button").attr("data-url", pathDelete);
    });
}

function switchDashboard() {
    $(document).on('click','.entities-link',function (event) {
        event.preventDefault();
        var oldPath = $('#default-path').attr("href");
        var oldPathname = oldPath.toString().replace("admin/", "");
        $(".paginate-"+oldPathname).empty();
        $('#word-search').val("");
        $('#search-path').attr("data-id","");
        $('#default-path').attr("href",$(this).attr("data-url"));
        var path = $(this).attr("data-url");
        var pathname = path.toString().replace("admin/", "");
        $(".display-tables").css("display", "none");
        $("#" + pathname + "-body").empty();
        removeModal();
        addModal();
        updateModal();
        read();
        pastePagination();
        buildTable();
    });
}

function removeSubmit(value) {
    var pathDelete = $(value).attr("data-url");
    $.ajax({
        url: pathDelete,
        type: "DELETE",
        headers : {
            "X-CSRF-Token" : $('meta[name="_csrf"]').attr('content')
        },
        success: function () {
            buildTable();
        },
        error: function () {
            alert('Error in Operation');
        }
    })
}

function addModal() {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/","").toString();
    $(".error").text("");
    $(".add-" + pathname + "-data").val("");
    selectSubjects();
    selectUsers();
    selectTopics();
}

function addSubmit() {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/","").toString();
    $(".error").text("");
    var dateTime = getCurrentDate();
    $("#date-add-" + pathname + "-modal").val(dateTime);
    var map = {};
    $(".add-" + pathname + "-data").each(function () {
        map[$(this).attr("name")] = $(this).val();
    });
    map["id"] = 1;
    alert(JSON.stringify(map));
    $.ajax({
        type: "POST",
        url: path,
        headers : {
            "X-CSRF-Token" : $('meta[name="_csrf"]').attr('content')
        },
        data: JSON.stringify(map),
        contentType: 'application/json; charset=UTF-8',
        dataType: "json",
        success: function () {
            $('#add-' + pathname + "-modal").modal('hide');
            buildTable()
        },
        error: function (jqXHR) {
            var obj = JSON.parse(jqXHR.responseText);
            var objStr = obj.errors.toString();
            var array = objStr.split(',');
            var lang = $("#lang").val();
            $.i18n.properties({
                name: 'messages',
                path: 'resources/bundle',
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
    });
}

function updateModal() {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/", "").toString();
    $('#update-' + pathname + '-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var pathUpdate = button.data('url');
        $("#update-" + pathname + "-modal-button").attr("data-url", pathUpdate);
        $(".error").text("");
        var selectedSubject;
        var selectedUser;
        var selectedTopic;
        $.getJSON(pathUpdate, function (data) {
            selectedSubject = data.subjectName;
            selectedUser = data.userName;
            selectedTopic = data.topicName;
            $.each(data, function (key, value) {
                $("#" + key.toString() + "-update-" + pathname + "-modal").val(value);
            });
            selectWithSelectedSubjects(selectedSubject);
            selectWithSelectedUsers(selectedUser);
            selectWithSelectedTopics(selectedTopic);
        });
    });
}

function updateSubmit(value) {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/", "").toString();
    var pathUpdate = $(value).attr("data-url");
    $(".error").text("");
    var dateTime = getCurrentDate();
    $("#date-update-" + pathname + "-modal").val(dateTime);
    var map = {};
    $(".update-" + pathname + "-data").each(function () {
        map[$(this).attr("name")] = $(this).val();
    });
    map["id"] = 1;
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
            $('#update-' + pathname + "-modal").modal('hide');
            buildTable();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var obj = JSON.parse(jqXHR.responseText);
            var objStr = obj.errors.toString();
            var array = objStr.split(',');
            var lang = $("#lang").val();
            $.i18n.properties({
                name: 'messages',
                path: 'resources/bundle',
                mode: 'both',
                language: lang,
                callback: function () {
                    $.each(array, function (index, value) {
                        var hashvalue = "." + value;
                        $(hashvalue).text($.i18n.prop(value));
                    });
                }
            })
        }
    })
}

function read() {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/", "").toString();
    $('#read-' + pathname + '-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var pathRead = button.data('url');

        $.getJSON(pathRead, function (data) {
            $(".subjectName-read").html(data.subjectName);
            $(".subjects-text").html(data.text);
        });
    });
}

function selectSubjects() {
    var lang = $("#lang").val();
    $.i18n.properties({
        name: 'admin',
        path: '/resources/bundle',
        mode: 'both',
        cache: true,
        language: lang,
        callback: function () {
            $.getJSON("/admin/subjects", function (data) {
                var subjectDTO_data = '';
                subjectDTO_data += '<option selected disabled>' + $.i18n.prop("admin-modal-select-subject") + '</option>';
                $.each(data, function (key, value) {
                    subjectDTO_data += '<option value="' + value.subjectName + '">' + value.subjectName + '</option>';
                });
                $(".subjects-select-update").html(subjectDTO_data);
            });
        }
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
            $.getJSON("/admin/topics", function (data) {
                var topicDTO_data = '<option selected disabled>' + $.i18n.prop("admin-modal-select-topic") + '</option>';
                topicDTO_data += '';
                $.each(data, function (key, value) {
                    topicDTO_data += '<option value="' + value.topicName + '">' + value.topicName + '</option>';
                });
                $(".topics-select-update").html(topicDTO_data);
            });
        }
    })
}

function selectUsers() {
    var lang = $("#lang").val();
    $.i18n.properties({
        name: 'admin',
        path: '/resources/bundle',
        mode: 'both',
        cache: true,
        language: lang,
        callback: function () {
            $.getJSON("/admin/users", function (data) {
                var userDTO_data = '<option selected disabled>' + $.i18n.prop("admin-modal-select-user") + '</option>';
                userDTO_data += '';
                $.each(data, function (key, value) {
                    userDTO_data += '<option value="' + value.userName + '">' + value.userName + '</option>';
                });
                $(".users-select-update").html(userDTO_data);
            });
        }
    })
}

function selectWithSelectedSubjects(subject) {
    $.getJSON("admin/subjects", function (data) {
        var subjectDTO_data = '';
        $.each(data, function (key, value) {
            if (value.subjectName === subject) {
                subjectDTO_data += '<option selected value="' + value.subjectName + '">' + value.subjectName + '</option>';
            } else {
                subjectDTO_data += '<option value="' + value.subjectName + '">' + value.subjectName + '</option>';
            }

        });
        $(".subjects-select-update").html(subjectDTO_data);
    });
}

function selectWithSelectedTopics(topic) {
    $.getJSON("admin/topics", function (data) {
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

function selectWithSelectedUsers(user) {
    $.getJSON("admin/users", function (data) {
        var userDTO_data = '';
        $.each(data, function (key, value) {
            if (value.userName === user) {
                userDTO_data += '<option selected value="' + value.userName + '">' + value.userName + '</option>';
            } else {
                userDTO_data += '<option value="' + value.userName + '">' + value.userName + '</option>';
            }
        });
        $(".users-select-update").html(userDTO_data);
    });
}

function getCurrentDate() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
}

function searchPagination() {
    var searchWord = $('#word-search').val();
    pastePagination();
    buildTable(searchWord);
}

function pastePagination() {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/", "").toString();
    var data ='<div id="format-navigator-'+ pathname +'"></div>';
    data +='<ul id="paginate-'+ pathname +'" class="pagination"></ul>';
    // var data = '<ul id="pagination-demo-'+ pathname +'" class="pagination-sm justify-content-center"></ul>';
    $(".paginate-"+pathname).html(data);
}

function moveFormatNavigator() {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/", "").toString();
    var navPagination = $(".paginationjs-nav");
    $("#format-navigator-" + pathname).html(navPagination.html());
    navPagination.hide();
}

function buildTable(search) {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/", "").toString();
    if (search !== undefined) {
        path = path + "?search=" + search;
    }
    $("#" + pathname + "-body").empty();
    var idDispl = "#display-" + pathname + "-table";
    $(idDispl).css("display", "block");
    $('#paginate-' + pathname).pagination({
        dataSource: function(done) {
            $.ajax({
                type: 'GET',
                url: path,
                success: function(response) {
                    done(response);
                }
            });
        },
        pageSize: 5,
        showNavigator: true,
        formatNavigator: '<span class="admin-format-navigator-showing">Showing</span> <%= currentPage %> <span class="admin-format-navigator-page">page</span>,' +
            ' <%= totalPage %> <span class="admin-format-navigator-pages">pages</span>, <%= totalNumber %> <span class="admin-format-navigator-entries">entries</span>',
        position: 'top',
        callback: function (data) {
            if (pathname === "subjects") {
                $.each(data, function (key, value) {
                    value.text = value.text.split(".")[0] + ".";
                });
            }
            $("#" + pathname + "-body").empty();
            $("#" + pathname + "-template").tmpl(data).appendTo("#" + pathname + "-body");
            moveFormatNavigator();
            internationalization();
        }
    });

}