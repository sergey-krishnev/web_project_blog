$(document).ready(function () {

    var path = $('#default-path').attr("href");
    var pathname = window.location.pathname;
    // buildTopics(path);
    pathname = pathname.replace("all", "topics/subjects");
    var id = pathname.match("\\d+");
    if (id === null) {
        buildSubjects(pathname);
    } else {
        var checkedPath = "topics/" + id;
        pathname = pathname.replace(id, checkedPath);
        buildSubjects(pathname + "/subjects");
        changeTopicName(pathname);
    }

    function buildSubjects(subjectsPath) {
        $.getJSON(subjectsPath, function (data) {
            $.each(data, function (key, value) {
                value.text = value.text.split(".")[0] + ".";
            });
            $("#subjectsTemplate").tmpl(data).appendTo(".aggregate-subjects");
        });
    }

    function changeTopicName(subjectsPath) {
        $.getJSON(subjectsPath, function (data) {
                $(".topicName").text(data.topicName);
        })
    }
    //
    // function buildSubject() {
    //     $(document).on('click', '.subject-read', function (event) {
    //         event.preventDefault();
    //         $(".topicName").css("display","none");
    //         $(".comments-form").css("display","block");
    //         $(".aggregate-subjects").empty();
    //         var subjectPath = $(this).attr("href");
    //         $.getJSON(subjectPath, function (data) {
    //             $("#subjectTemplate").tmpl(data).appendTo(".aggregate-post");
    //         });
    //         buildComments(subjectPath + "/comments");
    //         $.getJSON(subjectPath, function (data) {
    //             addComment(data.topicName, data.subjectName, subjectPath + "/comments");
    //         });
    //
    //     })
    // }
    // function buildComments(commentsPath) {
    //     $(".aggregate-comments").empty();
    //     $.getJSON(commentsPath, function (data) {
    //         $("#commentsTemplate").tmpl(data).appendTo(".aggregate-comments");
    //     })
    // }
    // function addComment(topicName, subjectName, updateCommentsPath) {
    //     $(document).on('click', '.add-comment', function () {
    //
    //         var today = new Date();
    //         var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //         var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //
    //         var map = {};
    //         map["id"] = 1;
    //         map["userName"] = "Dumiel";
    //         map["topicName"] = topicName;
    //         map["subjectName"] = subjectName;
    //         map["message"] = $(".text-message").val();
    //         map["date"] = date + ' ' + time;
    //         $.each(map, function (key, value) {
    //             alert(key + " : " + value)
    //         });
    //
    //         $.ajax({
    //             type: "POST",
    //             url: "/comments",
    //             data: JSON.stringify(map),
    //             contentType: 'application/json; charset=UTF-8',
    //             dataType: "json",
    //             success: function (data, textStatus, xhr) {
    //                 $(".text-message").empty();
    //                 alert("success");
    //                 // var htmlMap = $("#" + pathname + "Template").tmpl(map);
    //                 // alert(htmlMap);
    //                 // htmlMap.appendTo("#" + pathname + "Body"); //Change
    //                 // alert("success");
    //                 buildComments(updateCommentsPath)
    //             },
    //             error: function (jqXHR, textStatus, errorThrown) {
    //                 alert("error in operation")
    //             }
    //         })
    //     })
    // }
});