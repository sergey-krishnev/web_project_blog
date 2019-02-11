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
            buildComments(subjectPath + "/comments")
        })
    }
    function buildComments(commentsPath) {
        $(".aggregate-comments").empty();
        $.getJSON(commentsPath, function (data) {
            $("#commentsTemplate").tmpl(data).appendTo(".aggregate-comments");
        })

    }

});