$(document).ready(function () {

    var path = "/blog/topics";
    buildTopics(path);

    function buildTopics(path) {
        $.getJSON(path, function (data) {
            var topicDTO_data = '';
            topicDTO_data += '<li class="nav-item">';
            topicDTO_data += '<a class="nav-link all-topics" href="/blog/all">All Subjects</a>';
            topicDTO_data += '</li>';
            $.each(data, function (key, value) {
                topicDTO_data += '<li class="nav-item">';
                topicDTO_data += '<a class="nav-link all-topics" href="/blog/' + value.id + '">' + value.topicName + '</a>';
                topicDTO_data += '</li>';
            });
            $('.aggregate-topics').html(topicDTO_data)
            $("footer").css("display","block");
        });
    }
    // function switchTopic() {
    //     $(document).on('click', '.all-topics', function (event) {
    //         event.preventDefault();
    //         $(".aggregate-post").empty();
    //         $(".comments-form").css("display","none");
    //         var nameChanged = $(this).text();
    //         $('.topicName').css("display","block").text(nameChanged);
    //
    //         var subjectsPath = $(this).attr("data-url");
    //         buildSubjects(subjectsPath)
    //     });
    // }
    //

});