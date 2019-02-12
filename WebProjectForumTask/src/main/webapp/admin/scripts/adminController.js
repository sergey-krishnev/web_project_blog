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
    var Pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
    $('#delete' + Pathname + 'Modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var pathDelete = button.data('url');
        $("#delete" + Pathname + "ModalButton").attr("data-url", pathDelete);
    });
}

function switchDashboard() {
    $(document).on('click','.nav-link',function (event) {
        event.preventDefault();
        $('#default-path').attr("href",$(this).attr("data-url"));
        var path = $(this).attr("data-url");
        var pathname = path.toString().replace("admin/", "");
        $(".displayTables").css("display", "none");
        $("#" + pathname + "Body").empty();
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
    var Pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
    $("#" + pathname + "Body").empty();
    var idDispl = "#display" + Pathname + "Table";
    $(".Pathname").text(Pathname);
    $(idDispl).css("display", "block");
    $.getJSON(path, function (data) {
        if (pathname === "subjects") {
            $.each(data, function (key, value) {
                value.text = value.text.split(".")[0] + ".";
            });
        }
        $("#" + pathname + "Template").tmpl(data).appendTo("#" + pathname + "Body");
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
            $("#" + pathname + "Body").empty();
            $.getJSON(path, function (data) {
                if (pathname === "subjects") {
                    $.each(data, function (key, value) {
                        value.text = value.text.split(".")[0] + ".";
                    });
                }
                $("#" + pathname + "Template").tmpl(data).appendTo("#" + pathname + "Body");
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
    var Pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
    $(".error").text("");
    $(".add" + Pathname + "Data").val("");
    selectSubjects();
    selectUsers();
    selectTopics();

}

function addSubmit() {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/","").toString();
    var Pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
    $(".error").text("");
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    $("#dateAdd" + Pathname + "Modal").val(dateTime);
    var map = {};
    $(".add" + Pathname + "Data").each(function () {
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
            $('#add' + Pathname + "Modal").modal('hide');
            $("#" + pathname + "Body").empty();
            $.getJSON(path, function (data) {
                if (pathname === "subjects") {
                    $.each(data, function (key, value) {
                        value.text = value.text.split(".")[0] + ".";
                    });
                }
                $("#" + pathname + "Template").tmpl(data).appendTo("#" + pathname + "Body");
            });
        },
        error: function (jqXHR) {
            var obj = JSON.parse(jqXHR.responseText);
            var objStr = obj.errors.toString();
            var array = objStr.split(',');
            var lang = $("#lang").val();
            $.i18n.properties({
                name: 'messages',
                path: '/bundle',
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
    var Pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
    $('#update' + Pathname + 'Modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var pathUpdate = button.data('url');
        $("#update" + Pathname + "ModalButton").attr("data-url", pathUpdate);
        $(".error").text("");
        var selectedSubject;
        var selectedUser;
        var selectedTopic;
        $.getJSON(pathUpdate, function (data) {
            selectedSubject = data.subjectName;
            selectedUser = data.userName;
            selectedTopic = data.topicName;
            $.each(data, function (key, value) {
                $("#" + key.toString() + "Update" + Pathname + "Modal").val(value);
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
    var Pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
    $(".error").text("");
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    $("#dateUpdate" + Pathname + "Modal").val(dateTime);
    var map = {};
    $(".update" + Pathname + "Data").each(function () {
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
            $('#update' + Pathname + "Modal").modal('hide');
            $("#" + pathname + "Body").empty();
            $.getJSON(path, function (data) {
                if (pathname === "subjects") {
                    $.each(data, function (key, value) {
                        value.text = value.text.split(".")[0] + ".";
                    });
                }
                $("#" + pathname + "Template").tmpl(data).appendTo("#" + pathname + "Body");
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var obj = JSON.parse(jqXHR.responseText);
            var objStr = obj.errors.toString();
            var array = objStr.split(',');
            var lang = $("#lang").val();
            $.i18n.properties({
                name: 'messages',
                path: '/bundle',
                mode: 'both',
                language: lang,
                callback: function () {
                    $.each(array, function (index, value) {
                        var hashvalue = "." + value;
                        $(hashvalue).text($.i18n.prop(value));
                        // $("#NotEmpty.subjectDTO.subject").text($.i18n.prop("NotEmpty.subjectDTO.subject"));
                    });
                }
            })
        }
    })
}

function read() {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/", "").toString();
    var Pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
    $('#read' + Pathname + 'Modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var pathRead = button.data('url');

        $.getJSON(pathRead, function (data) {
            $(".subjectNameRead").html(data.subjectName);
            $(".subjectsText").html(data.text);
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
        $(".subjectsSelectUpdate").html(subjectDTO_data);
    });
}

function selectTopics() {
    $.getJSON("/admin/topics", function (data) {
        var topicDTO_data = '<option selected disabled>Select the topic</option>';
        topicDTO_data += '';
        $.each(data, function (key, value) {
            topicDTO_data += '<option value="' + value.topicName + '">' + value.topicName + '</option>';
        });
        $(".topicsSelectUpdate").html(topicDTO_data);
    });
}

function selectUsers() {
    $.getJSON("/admin/users", function (data) {
        var userDTO_data = '<option selected disabled>Select the user</option>';
        userDTO_data += '';
        $.each(data, function (key, value) {
            userDTO_data += '<option value="' + value.userName + '">' + value.userName + '</option>';
        });
        $(".usersSelectUpdate").html(userDTO_data);
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
        $(".subjectsSelectUpdate").html(subjectDTO_data);
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
        $(".topicsSelectUpdate").html(topicDTO_data);
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
        $(".usersSelectUpdate").html(userDTO_data);
    });
}