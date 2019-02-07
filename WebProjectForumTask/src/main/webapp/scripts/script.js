$(document).ready(function () {

    var pathname = window.location.pathname;

    $.getJSON("http://localhost:8080/topics", function (data) {
        var topicDTO_data = '';
            topicDTO_data += '<a href="/">All</a>';
        $.each(data, function (key, value) {
            topicDTO_data += '<li>';
            topicDTO_data += '<a href="/' + value.id + '">' + value.topicName + '</a>';
            topicDTO_data += '</li>';
        });
        $('.aggregate-topics').append(topicDTO_data)
    });

    $.getJSON("http://localhost:8080/" + pathname, function (data) {
        $('.topicName').text(data.topicName);
    });

    var subjectsPath = "http://localhost:8080/topics" + pathname + "/subjects";
         <!-- Blog Post -->
    $.getJSON(subjectsPath, function (data) {

        var AllSubjectsDTO_data = '';

        $.each(data, function (key, value) {
            AllSubjectsDTO_data += '<div class = "card mb-4">';
            AllSubjectsDTO_data += '<div class = "card-body">';
            AllSubjectsDTO_data += '<h2 class = "card-title">' + value.subjectName + '</h2>';
            AllSubjectsDTO_data += '<p class = "card-text">' + value.description + '</p>';
            AllSubjectsDTO_data += '<a href="/post/' + value.id + '" class = "btn btn-primary">Read More &rarr;</a>';
            AllSubjectsDTO_data += '</div>';
            AllSubjectsDTO_data += '<div class="card-footer text-muted">Posted on ' + value.date + ' by ';
            AllSubjectsDTO_data += '<a href="#">' + value.userName + '</a>';
            AllSubjectsDTO_data += '</div></div>';

        });
        $('.aggregate-subjects').html(AllSubjectsDTO_data)
    });
});