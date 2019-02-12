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

    // $.getJSON("http://localhost:8080/subjects" + pathname, function (data) {
    //
    //     var subjectDTO_data = '';
    //     <!-- Title -->
    //     subjectDTO_data += '<h1 class="mt-4">' + data.subjectName + '</h1>';
    //
    //     <!-- Author -->
    //     subjectDTO_data += '<p class="lead">by <a href="#">' + data.userName + '</a></h1>';
    //
    //     subjectDTO_data += '<hr>';
    //
    //     <!-- Date/Time -->
    //     subjectDTO_data += '<p>Posted on ' + data.date + '</p>';
    //
    //     subjectDTO_data += '<hr>';
    //
    //     <!-- Post Content -->
    //     subjectDTO_data += '<p class="lead">' + data.text + '</p>';
    //
    //
    //     $('.aggregate-post').html(subjectDTO_data)
    // });
    //
    // $.getJSON("http://localhost:8080/subjects" + pathname + "/comments", function (data) {
    //     var commentDTO_data = '';
    //     $.each(data, function (key, value) {
    //
    //         commentDTO_data += '<div class="media mb-4">';
    //         commentDTO_data += '<img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">';
    //         commentDTO_data += '<div class="media-body">';
    //         commentDTO_data += '<h5 class="mt-0">' + value.userName + '<span class="small"> at ' + value.date + '</span></h5>';
    //         commentDTO_data += value.message;
    //         commentDTO_data += '</div></div>';
    //         // <div class="media mb-4">
    //         //         <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
    //         //         <div class="media-body">
    //         //         <h5 class="mt-0">Commenter Name</h5>
    //         //     Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras
    //         //     purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
    //         //     vulputate fringilla. Donec lacinia congue felis in faucibus.
    //         //     </div>
    //         //     </div>
    //     });
    //     $('.aggregate-comments').html(commentDTO_data)
    // });


});