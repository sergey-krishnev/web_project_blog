$(document).ready(function () {

    var pathname = window.location.pathname;
    pathname = pathname.replace("/post","");

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

    $.getJSON("http://localhost:8080/subjects" + pathname, function (data) {

        var subjectDTO_data = '';
        <!-- Title -->
        subjectDTO_data += '<h1 class="mt-4">' + data.subjectName + '</h1>';

        <!-- Author -->
        subjectDTO_data += '<p class="lead">by <a href="#">' + data.userName + '</a></h1>';

        subjectDTO_data += '<hr>';

        <!-- Date/Time -->
        subjectDTO_data += '<p>Posted on ' + data.date + '</p>';

        subjectDTO_data += '<hr>';

        <!-- Post Content -->
        subjectDTO_data += '<p class="lead">' + data.text + '</p>';


        $('.aggregate-post').html(subjectDTO_data)
    });

    $.getJSON("http://localhost:8080/subjects" + pathname + "/comments", function (data) {
        var commentDTO_data = '';
        $.each(data, function (key, value) {

            commentDTO_data += '<div class="media mb-4">';
            commentDTO_data += '<img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">';
            commentDTO_data += '<div class="media-body">';
            commentDTO_data += '<h5 class="mt-0">' + value.userName + '<span class="small"> at ' + value.date + '</span></h5>';
            commentDTO_data += value.message;
            commentDTO_data += '</div></div>';
            // <div class="media mb-4">
            //         <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
            //         <div class="media-body">
            //         <h5 class="mt-0">Commenter Name</h5>
            //     Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras
            //     purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
            //     vulputate fringilla. Donec lacinia congue felis in faucibus.
            //     </div>
            //     </div>
        });
        $('.aggregate-comments').html(commentDTO_data)
    });


});