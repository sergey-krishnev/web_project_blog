// var glob = {
//     id : null,
//     path : $('#default-path').attr("href"),
//     schemeHost : $("#url").attr("href"),
//     pathname : $('#default-path').attr("href").toString().replace("admin/",""),
//     Pathname : $('#default-path').attr("href").toString().replace("admin/","").charAt(0).toUpperCase() + $('#default-path').attr("href").replace("admin/","").slice(1)
// }
var path = $('#default-path').attr("href");
var schemeHost = $("#url").attr("href");
var pathname = path.toString().replace("admin/","").toString();
var Pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
var updatePath = '.update' + Pathname;
var updateModalPath = '#update' + Pathname + "ModalButton";
var addPath = '#add' + Pathname;
var addModalPath = '#add' + Pathname + "ModalButton";

$(document).ready(function () {
    switchDashboard(path, pathname);
    buildTable(path, Pathname, pathname);
    add(addPath, addModalPath, Pathname, path, pathname);
    remove(Pathname, path);
    read(path);
    update(updatePath, updateModalPath, Pathname, path, pathname);
    function switchDashboard(path, pathname) {
        $(document).on('click','.nav-link',function (event) {
            event.preventDefault();
            var pathChanged = $(this).attr("data-url");
            var pathnameChanged = pathChanged.toString().replace("admin/", "");
            var PathnameChanged = pathnameChanged.charAt(0).toUpperCase() + pathnameChanged.slice(1);
            var updatePathChanged = '.update' + PathnameChanged;
            var updateModalPathChanged = '#update' + PathnameChanged + "ModalButton";
            var addPathChanged = '#add' + PathnameChanged;
            var addModalPathChanged = '#add' + PathnameChanged + "ModalButton";
            // alert(Pathname);
            $(".displayTables").css("display", "none");
            $("#" + pathnameChanged + "Body").empty();
            buildTable(pathChanged, PathnameChanged,pathnameChanged);
            add(addPathChanged, addModalPathChanged, PathnameChanged, pathChanged, pathnameChanged);
            remove(PathnameChanged, pathChanged);
            read(pathChanged);
            update(updatePathChanged, updateModalPathChanged, PathnameChanged, pathChanged, pathnameChanged);
        });
    }
    function buildTable(path, Pathname, pathname) {
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

    function add(addPath, addModalPath, Pathname, path, pathname) {
        $(document).on('click', addPath, function () {
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
        });
        $(document).on('click', addModalPath, function () {
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
        });
    }
    function remove(Pathname, path) {

        var pathDelete;
        $(document).on('click', '.delete' + Pathname, function() {
            var id = $(this).attr("id");
            pathDelete = path + "/" + id;
        });
        $(document).on('click', '#delete' + Pathname + "ModalButton", function() {
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
        });
    }

    function read(path) {
        $(document).on('click', '.readSubjects', function () {
            var id = $(this).attr("id");
            var pathRead = path + "/" + id;
            $.getJSON(pathRead, function (data) {
                $(".subjectNameRead").html(data.subjectName);
                $(".subjectsText").html(data.text);
            });
        });
    }
    //update
    function update(updatePath, updateModalPath, Pathname, path, pathname) {
        $(document).on('click', updatePath, function () {
            $(".error").text("");
            id = $(this).attr("id");
            var selectedSubject;
            var selectedUser;
            var selectedTopic;
            $.getJSON(path + "/" + id, function (data) {
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

        });
        $(document).on('click', updateModalPath, function () {
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
                url: path + "/" + id,
                data: JSON.stringify(map),
                contentType: 'application/json; charset=UTF-8',
                dataType: "json",
                success: function (data, textStatus, xhr) {
                    $('#update' + Pathname + "Modal").modal('hide');
                    // map["id"] = id;
                    // if (pathname === "subjects") {
                    //     map["text"] = map["text"].split(".")[0] + ".";
                    // }
                    // var htmlMap = $("#" + pathname + "Template").tmpl(map).html();
                    // $("#column" + id).html(htmlMap);
                    // //Change
                    // alert("success")
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
        });
    }
});