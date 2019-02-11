$(document).ready(function () {

    var path = $('#default-path').attr("href");

    buildTopics(path);
    buildSubjects(path + "/subjects");
    switchTopic();
    buildSubject();

    function buildTopics(path) {
        $.getJSON(path, function (data) {
            var topicDTO_data = '';
            topicDTO_data += '<li class="nav-item">';
            topicDTO_data += '<a class="nav-link all-topics" data-url="/blog/topics/subjects" href="#">All Subjects</a>';
            topicDTO_data += '</li>';
            $.each(data, function (key, value) {
                topicDTO_data += '<li class="nav-item">';
                topicDTO_data += '<a class="nav-link all-topics" data-url="/blog/topics/' + value.id + '/subjects" href="#">' + value.topicName + '</a>';
                topicDTO_data += '</li>';
            });
            $('.aggregate-topics').html(topicDTO_data)
        });
    }
    function switchTopic() {
        $(document).on('click', '.all-topics', function (event) {
            event.preventDefault();
            $(".aggregate-post").empty();
            $(".comments-form").css("display","none");
            var nameChanged = $(this).text();
            $('.topicName').css("display","block").text(nameChanged);

            var subjectsPath = $(this).attr("data-url");
            buildSubjects(subjectsPath)
        });
    }

    function buildSubjects(subjectsPath) {
        $(".aggregate-comments").empty();
        $(".aggregate-post").empty();
        $(".aggregate-subjects").empty();
        $.getJSON(subjectsPath, function (data) {

            $.each(data, function (key, value) {
                value.text = value.text.split(".")[0] + ".";
            });
            $("#subjectsTemplate").tmpl(data).appendTo(".aggregate-subjects");
        });
    }

    function buildSubject() {
        $(document).on('click', '.subject-read', function (event) {
            event.preventDefault();
            $(".topicName").css("display","none");
            $(".comments-form").css("display","block");
            $(".aggregate-subjects").empty();
            var subjectPath = $(this).attr("href");
            $.getJSON(subjectPath, function (data) {
                $("#subjectTemplate").tmpl(data).appendTo(".aggregate-post");
            });
            buildComments(subjectPath + "/comments");
            $.getJSON(subjectPath, function (data) {
                addComment(data.topicName, data.subjectName, subjectPath + "/comments");
            });

        })
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
                url: "/comments",
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
                    alert("error in operation")
                }
            })
        })
    }

});