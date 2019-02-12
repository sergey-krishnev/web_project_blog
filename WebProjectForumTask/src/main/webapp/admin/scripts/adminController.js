$(document).ready(function () {

    switchDashboard();
    buildTable();
    removeModal();

});

function removeModal() {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/","").toString();
    var Pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
    $('#delete' + Pathname + 'Modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var id = button.data('id');
        var pathDelete;
        pathDelete = path + "/" + id;
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
        removeModal()
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
        success: function (data, textStatus, xhr) {
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
        error: function (xhr, textStatus, errorThrown) {
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
    $.getJSON("/admin/subjects", function (data) {
        var subjectDTO_data = '';
        subjectDTO_data += '<option selected disabled>Select the subject</option>';
        $.each(data, function (key, value) {
            subjectDTO_data += '<option value="' + value.subjectName + '">' + value.subjectName + '</option>';
        });
        $(".subjectsSelectUpdate").html(subjectDTO_data);
    });
    $.getJSON("/admin/users", function (data) {
        var userDTO_data = '<option selected disabled>Select the user</option>';
        userDTO_data += '';
        $.each(data, function (key, value) {
            userDTO_data += '<option value="' + value.userName + '">' + value.userName + '</option>';
        });
        $(".usersSelectUpdate").html(userDTO_data);
    });
    $.getJSON("/admin/topics", function (data) {
        var topicDTO_data = '<option selected disabled>Select the topic</option>';
        topicDTO_data += '';
        $.each(data, function (key, value) {
            topicDTO_data += '<option value="' + value.topicName + '">' + value.topicName + '</option>';
        });
        $(".topicsSelectUpdate").html(topicDTO_data);
    });
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
        success: function (data, textStatus, xhr) {
            $('#add' + Pathname + "Modal").modal('hide');
            // var htmlMap = $("#" + pathname + "Template").tmpl(map);
            // alert(htmlMap);
            // htmlMap.appendTo("#" + pathname + "Body"); //Change
            // alert("success");
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
                    })
                }
            })
        }
    });
}

function updateModal(id) {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/","").toString();
    var Pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
    var pathUpdate = path + "/" + id;
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

    });
    $.getJSON("admin/subjects", function (data) {
        var subjectDTO_data = '';
        $.each(data, function (key, value) {
            if (value.subjectName === selectedSubject) {
                subjectDTO_data += '<option selected value="' + value.subjectName + '">' + value.subjectName + '</option>';
            } else {
                subjectDTO_data += '<option value="' + value.subjectName + '">' + value.subjectName + '</option>';
            }

        });
        $(".subjectsSelectUpdate").html(subjectDTO_data);
    });
    $.getJSON("admin/users", function (data) {
        var userDTO_data = '';
        $.each(data, function (key, value) {
            if (value.userName === selectedUser) {
                userDTO_data += '<option selected value="' + value.userName + '">' + value.userName + '</option>';
            } else {
                userDTO_data += '<option value="' + value.userName + '">' + value.userName + '</option>';
            }
        });
        $(".usersSelectUpdate").html(userDTO_data);
    });
    $.getJSON("admin/topics", function (data) {
        var topicDTO_data = '';
        $.each(data, function (key, value) {
            if (value.topicName === selectedTopic) {
                topicDTO_data += '<option selected value="' + value.topicName + '">' + value.topicName + '</option>';
            } else {
                topicDTO_data += '<option value="' + value.topicName + '">' + value.topicName + '</option>';
            }
        });
        $(".topicsSelectUpdate").html(topicDTO_data);
    });
}

function updateSubmit(pathUpdate) {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/", "").toString();
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

function read(id) {
    var path = $('#default-path').attr("href");
    var pathRead = path + "/" + id;
    $.getJSON(pathRead, function (data) {
        $(".subjectNameRead").html(data.subjectName);
        $(".subjectsText").html(data.text);
    });

}