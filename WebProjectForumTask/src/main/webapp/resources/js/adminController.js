$(document).ready(function () {
    switchDashboard();
    buildTable();
    removeModal();
    addModal();
    updateModal();
    read();
});

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
    $(document).on('click','.nav-link',function (event) {
        event.preventDefault();
        $('#default-path').attr("href",$(this).attr("data-url"));
        var path = $(this).attr("data-url");
        var pathname = path.toString().replace("admin/", "");
        $(".display-tables").css("display", "none");
        $("#" + pathname + "-body").empty();
        buildTable();
        removeModal();
        addModal();
        updateModal();
        read();
    });
}

function buildTable() {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/","").toString();
    var pathnameCapital = pathname.charAt(0).toUpperCase() + pathname.slice(1);
    $("#" + pathname + "-body").empty();
    var idDispl = "#display-" + pathname + "-table";
    $(".pathname-capital").text(pathnameCapital);
    $(idDispl).css("display", "block");
    $.getJSON(path, function (data) {
        if (pathname === "subjects") {
            $.each(data, function (key, value) {
                value.text = value.text.split(".")[0] + ".";
            });
        }
        $("#" + pathname + "-template").tmpl(data).appendTo("#" + pathname + "-body");
    });
}

function removeSubmit(value) {
    var pathDelete = $(value).attr("data-url");
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/","").toString();
    $.ajax({
        url: pathDelete,
        type: "DELETE",
        success: function () {
            $("#" + pathname + "-body").empty();
            $.getJSON(path, function (data) {
                if (pathname === "subjects") {
                    $.each(data, function (key, value) {
                        value.text = value.text.split(".")[0] + ".";
                    });
                }
                $("#" + pathname + "-template").tmpl(data).appendTo("#" + pathname + "-body");
            });
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
    $.ajax({
        type: "POST",
        url: path,
        data: JSON.stringify(map),
        contentType: 'application/json; charset=UTF-8',
        dataType: "json",
        success: function () {
            $('#add-' + pathname + "-modal").modal('hide');
            $("#" + pathname + "-body").empty();
            $.getJSON(path, function (data) {
                if (pathname === "subjects") {
                    $.each(data, function (key, value) {
                        value.text = value.text.split(".")[0] + ".";
                    });
                }
                $("#" + pathname + "-template").tmpl(data).appendTo("#" + pathname + "-body");
            });
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
        data: JSON.stringify(map),
        contentType: 'application/json; charset=UTF-8',
        dataType: "json",
        success: function (data, textStatus, xhr) {
            $('#update-' + pathname + "-modal").modal('hide');
            $("#" + pathname + "-body").empty();
            $.getJSON(path, function (data) {
                if (pathname === "subjects") {
                    $.each(data, function (key, value) {
                        value.text = value.text.split(".")[0] + ".";
                    });
                }
                $("#" + pathname + "-template").tmpl(data).appendTo("#" + pathname + "-body");
            });
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
    $.getJSON("/admin/subjects", function (data) {
        var subjectDTO_data = '';
        subjectDTO_data += '<option selected disabled>Select the subject</option>';
        $.each(data, function (key, value) {
            subjectDTO_data += '<option value="' + value.subjectName + '">' + value.subjectName + '</option>';
        });
        $(".subjects-select-update").html(subjectDTO_data);
    });
}

function selectTopics() {
    $.getJSON("/admin/topics", function (data) {
        var topicDTO_data = '<option selected disabled>Select the topic</option>';
        topicDTO_data += '';
        $.each(data, function (key, value) {
            topicDTO_data += '<option value="' + value.topicName + '">' + value.topicName + '</option>';
        });
        $(".topics-select-update").html(topicDTO_data);
    });
}

function selectUsers() {
    $.getJSON("/admin/users", function (data) {
        var userDTO_data = '<option selected disabled>Select the user</option>';
        userDTO_data += '';
        $.each(data, function (key, value) {
            userDTO_data += '<option value="' + value.userName + '">' + value.userName + '</option>';
        });
        $(".users-select-update").html(userDTO_data);
    });
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