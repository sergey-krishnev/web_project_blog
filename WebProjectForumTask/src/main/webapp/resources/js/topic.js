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
    internationalization();
});

function internationalization() {
    var lang = $("#lang").val();
    $.i18n.properties({
        name: 'admin',
        path: 'resources/bundle',
        mode: 'both',
        cache: true,
        language: lang,
        callback: function () {
            var array = $.i18n.map;
            $.each(array, function (index, value) {
                $("." + index).text(value);
            });
        }
    })
}