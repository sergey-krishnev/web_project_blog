var glob = {
    id : null,
    path : $('#default-path').attr("href"),
    schemeHost : $("#url").attr("href"),
    pathname : $('#default-path').attr("href").toString().replace("admin/",""),
    Pathname : $('#default-path').attr("href").toString().replace("admin/","").charAt(0).toUpperCase() + $('#default-path').attr("href").replace("admin/","").slice(1)
}
// var path = $('#default-path').attr("href");
// var schemeHost = $("#url").attr("href");
// var id;
// var pathname = path.toString().replace("admin/","");
// var Pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);

$(document).ready(function () {

    $('.nav-link').click(function(event) {
        event.preventDefault();
        glob.path = $(this).attr("href");
        glob.pathname = glob.path.toString().replace("/admin/","");
        glob.Pathname = glob.pathname.charAt(0).toUpperCase() + glob.pathname.slice(1);
        // alert(Pathname);
        $(".displayTables").css("display", "none");
        $("#"+ glob.pathname + "Body").empty();
        var idDispl = "#display" + glob.Pathname + "Table";
        $(".Pathname").text(glob.Pathname);
        $(idDispl).css("display", "block");
        $.getJSON(glob.path, function (data) {
            if (glob.pathname === "subjects") {
                $.each(data, function (key, value) {
                    value.text = value.text.split(".")[0] + ".";
                });
            }
            $("#" + glob.pathname + "Template").tmpl(data).appendTo("#" + glob.pathname + "Body");
        });
    });


    //updateFormData
    $(document).on('click', '#'+glob.pathname+'Body'+' .update'+glob.Pathname, function() {
        glob.id = $(this).attr("id");
        alert(glob.Pathname);
        var selectedSubject;
        var selectedUser;
        var selectedTopic;
        $.getJSON(glob.path + "/" + id, function (data) {
            selectedSubject = data.subjectName;
            selectedUser = data.userName;
            selectedTopic = data.topicName;
            alert(path + "/" + id);
            $.each(data, function (key, value) {
                alert(key.toString() + ":" + value);
                $("#" + key.toString() + "Update" + Pathname + "Modal").val(value);
            });

        });
    });


    //adminPasteData

    var idDispl = "#display" + glob.Pathname + "Table";
    $(".Pathname").text(glob.Pathname);
    $(idDispl).css("display", "block");
    $.getJSON(glob.path, function (data) {
        if (glob.pathname === "subjects") {
            $.each(data, function (key, value) {
                value.text = value.text.split(".")[0] + ".";
            });
        }
        $("#" + glob.pathname + "Template").tmpl(data).appendTo("#" + glob.pathname + "Body");
    });

    // //addFormData
    // $(document).on('click', '.add' + Pathname, function() {
    //     $(".add" + Pathname + "Data").val("");
    //     $.getJSON("/admin/subjects", function (data) {
    //         var subjectDTO_data = '';
    //         subjectDTO_data += '<option selected disabled>Select the subject</option>';
    //         $.each(data, function (key, value) {
    //             subjectDTO_data += '<option value="' + value.subjectName + '">' + value.subjectName +'</option>';
    //         });
    //         $(".subjectsSelectUpdate").html(subjectDTO_data);
    //     });
    //     $.getJSON("/admin/users" ,function (data) {
    //         var userDTO_data = '<option selected disabled>Select the user</option>';
    //         userDTO_data += '';
    //         $.each(data, function (key, value) {
    //             userDTO_data += '<option value="' + value.userName + '">' + value.userName +'</option>';
    //         });
    //         $(".usersSelectUpdate").html(userDTO_data);
    //     });
    //     $.getJSON("/admin/topics" ,function (data) {
    //         var topicDTO_data = '<option selected disabled>Select the topic</option>';
    //         topicDTO_data += '';
    //         $.each(data, function (key, value) {
    //             topicDTO_data += '<option value="' + value.topicName + '">' + value.topicName +'</option>';
    //         });
    //         $(".topicsSelectUpdate").html(topicDTO_data);
    //     });
    // });
    // $(document).on('click', '#add' + Pathname + "ModalButton", function() {
    //     var today = new Date();
    //     var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //     var dateTime = date+' '+time;
    //     $("#dateAdd" + Pathname + "Modal").val(dateTime);
    //     var map = {};
    //     $(".add" + Pathname + "Data").each(function() {
    //         map[$(this).attr("name")] = $(this).val();
    //     });
    //     map["id"] = 1;
    //     alert(JSON.stringify(map));
    //     alert(schemeHost + path);
    //     $.ajax({
    //         type: "POST",
    //         url: path,
    //         data: JSON.stringify(map),
    //         contentType: 'application/json; charset=UTF-8',
    //         dataType: "json",
    //         success: function (data, textStatus, xhr) {
    //             // var htmlMap = $("#" + pathname + "Template").tmpl(map);
    //             // alert(htmlMap);
    //             // htmlMap.appendTo("#" + pathname + "Body"); //Change
    //             // alert("success");
    //             $("#" + pathname + "Body").empty();
    //             $.getJSON(path, function (data) {
    //                 if (pathname === "subjects") {
    //                     $.each(data, function (key, value) {
    //                         value.text = value.text.split(".")[0] + ".";
    //                     });
    //                 }
    //                 $("#" + pathname + "Template").tmpl(data).appendTo("#" + pathname + "Body");
    //             });
    //         },
    //         error: function (jqXHR, textStatus, errorThrown) {
    //             alert("error")
    //         }
    //     });
    // });
    // //deleteData
    // var pathDelete;
    // $(document).on('click', '.delete' + Pathname, function() {
    //     id = $(this).attr("id");
    //     pathDelete = path + "/" + id;
    // });
    // $(document).on('click', '#delete' + Pathname + "ModalButton", function() {
    //     $.ajax({
    //         url: pathDelete,
    //         type: "DELETE",
    //         success: function (data, textStatus, xhr) {
    //             $("#column" + id).css("display", "none");
    //         },
    //         error: function (xhr, textStatus, errorThrown) {
    //             alert('Error in Operation');
    //         }
    //     })
    // });
    //
    // //readData
    // $(document).on('click', '.readSubjects', function() {
    //     var id = $(this).attr("id");
    //     var pathRead = path + "/" + id;
    //     $.getJSON(pathRead,function (data) {
    //         $(".subjectNameRead").html(data.subjectName);
    //         $(".subjectsText").html(data.text);
    //     });
    // });
    //updateFormData
    // $(mylink).click(function() {
    //     id = $(this).attr("id");
    //     alert(Pathname);
    //     var selectedSubject;
    //     var selectedUser;
    //     var selectedTopic;
    //     $.getJSON(path + "/" + id,function (data) {
    //         selectedSubject = data.subjectName;
    //         selectedUser = data.userName;
    //         selectedTopic = data.topicName;
    //         alert(path + "/" + id);
    //         $.each(data, function (key, value) {
    //             alert(key.toString() + ":" + value);
    //             $("#" + key.toString() + "Update" + Pathname + "Modal").val(value);
    //         });
    //
    //     });
    //     $.getJSON("admin/subjects",function (data) {
    //         var subjectDTO_data = '';
    //         $.each(data, function (key, value) {
    //             if (value.subjectName === selectedSubject) {
    //                 subjectDTO_data += '<option selected value="' + value.subjectName + '">' + value.subjectName +'</option>';
    //             } else {
    //                 subjectDTO_data += '<option value="' + value.subjectName + '">' + value.subjectName +'</option>';
    //             }
    //
    //         });
    //         $(".subjectsSelectUpdate").html(subjectDTO_data);
    //     });
    //     $.getJSON("admin/users",function (data) {
    //         var userDTO_data = '';
    //         $.each(data, function (key, value) {
    //             if (value.userName === selectedUser) {
    //                 userDTO_data += '<option selected value="' + value.userName + '">' + value.userName + '</option>';
    //             } else {
    //                 userDTO_data += '<option value="' + value.userName + '">' + value.userName + '</option>';
    //             }
    //         });
    //         $(".usersSelectUpdate").html(userDTO_data);
    //     });
    //     $.getJSON("admin/topics",function (data) {
    //         var topicDTO_data = '';
    //         $.each(data, function (key, value) {
    //             if (value.topicName === selectedTopic) {
    //                 topicDTO_data += '<option selected value="' + value.topicName + '">' + value.topicName + '</option>';
    //             } else {
    //                 topicDTO_data += '<option value="' + value.topicName + '">' + value.topicName + '</option>';
    //             }
    //         });
    //         $(".topicsSelectUpdate").html(topicDTO_data);
    //     });
    //
    // });
    // $(document).on('click', '#update' + Pathname + "ModalButton", function() {
    //     var today = new Date();
    //     var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //     var dateTime = date+' '+time;
    //     $("#dateUpdate" + Pathname + "Modal").val(dateTime);
    //     var map = {};
    //     $(".update" + Pathname + "Data").each(function() {
    //         map[$(this).attr("name")] = $(this).val();
    //     });
    //     map["id"] = 1;
    //     $.ajax({
    //         type: "PUT",
    //         url: path + "/" + id,
    //         data: JSON.stringify(map),
    //         contentType: 'application/json; charset=UTF-8',
    //         dataType: "json",
    //         success: function (data, textStatus, xhr) {
    //             // map["id"] = id;
    //             // if (pathname === "subjects") {
    //             //     map["text"] = map["text"].split(".")[0] + ".";
    //             // }
    //             // var htmlMap = $("#" + pathname + "Template").tmpl(map).html();
    //             // $("#column" + id).html(htmlMap);
    //             // //Change
    //             // alert("success")
    //             $("#" + pathname + "Body").empty();
    //             $.getJSON(path, function (data) {
    //                 if (pathname === "subjects") {
    //                     $.each(data, function (key, value) {
    //                         value.text = value.text.split(".")[0] + ".";
    //                     });
    //                 }
    //                 $("#" + pathname + "Template").tmpl(data).appendTo("#" + pathname + "Body");
    //             });
    //         },
    //         error: function (jqXHR, textStatus, errorThrown) {
    //             alert("error")
    //         }
    //     });
    // });
});