$(document).ready(function () {

    var pathname = window.location.pathname;
    pathname = pathname.replace("/post/","");
    var subjectPath = "/blog/subjects/" + pathname;

    $.getJSON(subjectPath, function (data) {
        $("#subjectTemplate").tmpl(data).appendTo(".aggregate-post");
    });
    buildComments(subjectPath + "/comments");
    $.getJSON(subjectPath, function (data) {
        addComment(data.topicName, data.subjectName, subjectPath + "/comments");
    });
    addSubjectForm(pathname);
});

function addSubjectForm(pathname) {
    if (pathname === "add") {

    }
}

function buildComments(commentsPath) {
    $(".aggregate-comments").empty();
    $.getJSON(commentsPath, function (data) {
        $("#commentsTemplate").tmpl(data).appendTo(".aggregate-comments");
    })
}

function addComment(topicName, subjectName, updateCommentsPath) {
    $(document).on('click', '.add-comment', function () {

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        var map = {};
        map["id"] = 1;
        map["userName"] = "Dumiel";
        map["topicName"] = topicName;
        map["subjectName"] = subjectName;
        map["message"] = $(".text-message").val();
        map["date"] = date + ' ' + time;
        $.each(map, function (key, value) {
            alert(key + " : " + value)
        });

        $.ajax({
            type: "POST",
            url: "/blog/comments",
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
        })
    })
}