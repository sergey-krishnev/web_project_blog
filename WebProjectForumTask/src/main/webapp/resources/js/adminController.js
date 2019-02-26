$(document).ready(function () {
    switchDashboard();
    buildTable("?page=1&&size=5");
    buildShowingNumberInfo(1,5);
    buildShowingNumberButtons();
    removeModal();
    addModal();
    updateModal();
    read();
    switchNumberPage();
    // internationalization();
});

// function internationalization() {
//     var lang = $("#lang").val();
//     $.i18n.properties({
//         name: 'admin',
//         path: 'resources/bundle',
//         mode: 'both',
//         cache: true,
//         language: lang,
//         callback: function () {
//             var array = $.i18n.map;
//             $.each(array, function (index, value) {
//                 $("." + index).text(value);
//             });
//         }
//     })
// }

function removeModal() {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/","").toString();
    $('#delete-' + pathname + '-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var pathDelete = button.data('url');
        $("#delete-" + pathname + "-modal-button").attr("data-url", pathDelete);
    });
}

function switchDashboard() {
    $(document).on('click','.nav-link',function (event) {
        event.preventDefault();
        $('#search-path').attr("data-id","");
        $('#default-path').attr("href",$(this).attr("data-url"));
        var path = $(this).attr("data-url");
        var pathname = path.toString().replace("admin/", "");
        $(".display-tables").css("display", "none");
        $("#" + pathname + "-body").empty();
        buildTable("?page=1&&size=5");
        buildShowingNumberInfo(1,5);
        buildShowingNumberButtons();
        removeModal();
        addModal();
        updateModal();
        read();
        // internationalization();
    });
}

function buildTable(page) {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/","").toString();
    var pathnameCapital = pathname.charAt(0).toUpperCase() + pathname.slice(1);
    $("#" + pathname + "-body").empty();
    var idDispl = "#display-" + pathname + "-table";
    $(".pathname-capital").text(pathnameCapital);
    $("#" + pathname + "-current-page").val(page);
    $(idDispl).css("display", "block");
    $.getJSON(path + page, function (data) {
        if (pathname === "subjects") {
            $.each(data, function (key, value) {
                value.text = value.text.split(".")[0] + ".";
            });
        }
        $("#" + pathname + "-template").tmpl(data).appendTo("#" + pathname + "-body");
    });
}

function buildShowingNumberInfo(start, end) {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/","").toString();
    $.getJSON(path, function (data) {
        var jsonObject= JSON.stringify(data);
        var count = JSON.parse(jsonObject).length;
        var showingNumberInfo = 'Showing ' + start + ' to ' + end + ' of ' + count + ' entries';
        $("#showing-numbers-"+pathname).text(showingNumberInfo);
    });
}

function buildSearchShowingNumberInfo(start, end) {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/","").toString();
    var searchPath = path + "?search=" + $('#search-path').attr("data-id") + "&page=0&size=0";
    $.getJSON(searchPath, function (data) {
        var jsonObject= JSON.stringify(data);
        var count = JSON.parse(jsonObject).length;
        var showingNumberInfo = 'Showing ' + start + ' to ' + end + ' of ' + count + ' entries';
        $("#showing-numbers-"+pathname).text(showingNumberInfo);
    });
}

function buildShowingNumberButtons() {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/","").toString();
    $.getJSON(path, function (data) {
        var jsonObject = JSON.stringify(data);
        var count = JSON.parse(jsonObject).length;
        var pages = Math.floor(count/5);
        if(count%5 !== 0) pages++;
        var showingNumberButtons = '';
        showingNumberButtons += '<nav aria-label="Page navigation">';
        showingNumberButtons += '<ul class="pagination justify-content-end">';
        showingNumberButtons += '<li class="page-item previous-link disabled">';
        showingNumberButtons += '<a class="page-link " href="#" tabindex="-1" onclick="previousPage(event)">Previous</a>';
        showingNumberButtons += '</li>';
        for (var i = 1; i <= pages; i++) {
            showingNumberButtons += '<li class="page-item"><a class="page-link number-link" id="' + i + '" data-href="?page=' + i + '&&size=5">' + i + '</a></li>';
        }
        if (pages === 1) {
            showingNumberButtons += '<li class="page-item next-link disabled"><a class="page-link" href="#" onclick="nextPage(event)">Next</a></li>';
        } else {
            showingNumberButtons += '<li class="page-item next-link"><a class="page-link" href="#" onclick="nextPage(event)">Next</a></li>';
        }
        showingNumberButtons += '</ul>';
        showingNumberButtons += '</nav>';
        $("#buttons-numbers-"+pathname).html(showingNumberButtons);
    });
}

function buildSearchShowingNumberButtons() {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/","").toString();
    var search = $('#search-path').attr("data-id");
    var searchPath = path + "?search=" + search + "&page=0&size=0";
    $.getJSON(searchPath, function (data) {
        var jsonObject = JSON.stringify(data);
        var count = JSON.parse(jsonObject).length;
        var pages = Math.floor(count/5);
        if(count%5 !== 0) pages++;
        var showingNumberButtons = '';
        showingNumberButtons += '<nav aria-label="Page navigation">';
        showingNumberButtons += '<ul class="pagination justify-content-end">';
        showingNumberButtons += '<li class="page-item previous-link disabled">';
        showingNumberButtons += '<a class="page-link " href="#" tabindex="-1" onclick="searchPreviousPage(event)">Previous</a>';
        showingNumberButtons += '</li>';
        for (var i = 1; i <= pages; i++) {
            showingNumberButtons += '<li class="page-item"><a class="page-link search-number-link" id="' + i + '" data-href="?search='+ search +'&page=' + i + '&&size=5" ' +
                'onclick="switchSearchNumberPage(this,event)">' + i + '</a></li>';
        }
        if (pages === 1) {
            showingNumberButtons += '<li class="page-item next-link disabled"><a class="page-link" href="#" onclick="searchNextPage(event)">Next</a></li>';
        } else {
            showingNumberButtons += '<li class="page-item next-link"><a class="page-link" href="#" onclick="searchNextPage(event)">Next</a></li>';
        }
        showingNumberButtons += '</ul>';
        showingNumberButtons += '</nav>';
        $("#buttons-numbers-"+pathname).html(showingNumberButtons);
    });
}

function switchNumberPage() {
    $(document).on('click','.number-link',function (event) {
        event.preventDefault();
        var path = $('#default-path').attr("href");
        var pathname = path.toString().replace("admin/","").toString();
        var pageQuery = $(this).attr("data-href");
        var page = parseInt($(this).attr("id"));
        $("#" + pathname + "-current-page").attr("data-id",page);
        buildTable(pageQuery);
        buildShowingNumberInfo(1+(page-1)*5,5+(page-1)*5);
        $.getJSON(path, function (data) {
            var jsonObject = JSON.stringify(data);
            var count = JSON.parse(jsonObject).length;
            var pages = Math.floor(count / 5);
            if (count % 5 !== 0) pages++;

            if (page === pages) $(".next-link").addClass("disabled"); else {
                $(".next-link").removeClass("disabled")
            }
            if (page !== 1) {$(".previous-link").removeClass("disabled")} else {
                $(".previous-link").addClass("disabled")
            }
        })
    });
}

function switchSearchNumberPage(value,event) {
        event.preventDefault();
        var path = $('#default-path').attr("href");
        var pathname = path.toString().replace("admin/","").toString();
        var pageQuery = $(value).attr("data-href");
        var page = parseInt($(value).attr("id"));
        $("#" + pathname + "-body").empty();
        $("#" + pathname + "-current-page").attr("data-id",page);
        var search = $('#search-path').attr("data-id");
        var searchPath = path + "?search=" + search + "&page=0&size=0";
        buildTable(pageQuery);
        buildSearchShowingNumberInfo(1+(page-1)*5,5+(page-1)*5);
        $.getJSON(searchPath, function (data) {
            var jsonObject = JSON.stringify(data);
            var count = JSON.parse(jsonObject).length;
            var pages = Math.floor(count / 5);
            if (count % 5 !== 0) pages++;

            if (page === pages) $(".next-link").addClass("disabled"); else {
                $(".next-link").removeClass("disabled")
            }
            if (page !== 1) {$(".previous-link").removeClass("disabled")} else {
                $(".previous-link").addClass("disabled")
            }
        })
}

function nextPage(event) {
    event.preventDefault();
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/","").toString();
    var hiddenPage = $("#" + pathname + "-current-page");
    var currentPage = parseInt(hiddenPage.attr("data-id"));
    hiddenPage.attr("data-id", parseInt(currentPage)+1);
    var pageQuery = "?page=" + (parseInt(currentPage)+1) + "&&size=5";
    buildTable(pageQuery);
    buildShowingNumberInfo(1+(currentPage)*5,5+(currentPage)*5);
    $.getJSON(path, function (data) {
        var jsonObject = JSON.stringify(data);
        var count = JSON.parse(jsonObject).length;
        var pages = Math.floor(count / 5);
        if (count % 5 !== 0) pages++;

        if (parseInt(currentPage)+1 === pages) $(".next-link").addClass("disabled"); else {
            $(".next-link").removeClass("disabled")
        }
        if (parseInt(currentPage)+1 !== 1) {$(".previous-link").removeClass("disabled")} else {
            $(".previous-link").addClass("disabled")
        }
    })
}

function searchNextPage(event) {
    event.preventDefault();
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/","").toString();
    var hiddenPage = $("#" + pathname + "-current-page");
    var currentPage = parseInt(hiddenPage.attr("data-id"));
    var searchWord = $('#word-search').val();
    var searchPath = path + "?search=" + searchWord + "&page=0&size=0";
    hiddenPage.attr("data-id", parseInt(currentPage)+1);
    var pageQuery = "?search="+ searchWord +"&page=" + (parseInt(currentPage)+1) + "&&size=5";
    buildTable(pageQuery);
    buildShowingNumberInfo(1+(currentPage)*5,5+(currentPage)*5);
    $.getJSON(searchPath, function (data) {
        var jsonObject = JSON.stringify(data);
        var count = JSON.parse(jsonObject).length;
        var pages = Math.floor(count / 5);
        if (count % 5 !== 0) pages++;

        if (parseInt(currentPage)+1 === pages) $(".next-link").addClass("disabled"); else {
            $(".next-link").removeClass("disabled")
        }
        if (parseInt(currentPage)+1 !== 1) {$(".previous-link").removeClass("disabled")} else {
            $(".previous-link").addClass("disabled")
        }
    })
}

function previousPage(event) {
    event.preventDefault();
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/","").toString();
    var hiddenPage = $("#" + pathname + "-current-page");
    var currentPage = parseInt(hiddenPage.attr("data-id"));
    hiddenPage.attr("data-id", parseInt(currentPage)-1);
    var pageQuery = "?page=" + (parseInt(currentPage)-1) + "&&size=5";
    buildTable(pageQuery);
    buildShowingNumberInfo(1+(currentPage-2)*5,5+(currentPage-2)*5);
    $.getJSON(path, function (data) {
        var jsonObject = JSON.stringify(data);
        var count = JSON.parse(jsonObject).length;
        var pages = Math.floor(count / 5);
        if (count % 5 !== 0) pages++;

        if (parseInt(currentPage)-1 === pages) $(".next-link").addClass("disabled"); else {
            $(".next-link").removeClass("disabled")
        }
        if (parseInt(currentPage)-1 !== 1) {$(".previous-link").removeClass("disabled")} else {
            $(".previous-link").addClass("disabled")
        }
    })
}

function searchPreviousPage(event) {
    event.preventDefault();
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/","").toString();
    var hiddenPage = $("#" + pathname + "-current-page");
    var currentPage = parseInt(hiddenPage.attr("data-id"));
    var searchWord = $('#word-search').val();
    var searchPath = path + "?search=" + searchWord + "&page=0&size=0";
    hiddenPage.attr("data-id", parseInt(currentPage)-1);
    var pageQuery = "?search="+ searchWord +"&page=" + (parseInt(currentPage)-1) + "&&size=5";
    buildTable(pageQuery);
    buildShowingNumberInfo(1+(currentPage-2)*5,5+(currentPage-2)*5);
    $.getJSON(searchPath, function (data) {
        var jsonObject = JSON.stringify(data);
        var count = JSON.parse(jsonObject).length;
        var pages = Math.floor(count / 5);
        if (count % 5 !== 0) pages++;

        if (parseInt(currentPage)-1 === pages) $(".next-link").addClass("disabled"); else {
            $(".next-link").removeClass("disabled")
        }
        if (parseInt(currentPage)-1 !== 1) {$(".previous-link").removeClass("disabled")} else {
            $(".previous-link").addClass("disabled")
        }
    })
}

function removeSubmit(value) {
    var pathDelete = $(value).attr("data-url");
    $.ajax({
        url: pathDelete,
        type: "DELETE",
        headers : {
            "X-CSRF-Token" : $('meta[name="_csrf"]').attr('content')
        },
        success: function () {
            buildTable("?page=1&&size=5");
            buildShowingNumberInfo(1,5);
            buildShowingNumberButtons();
        },
        error: function () {
            alert('Error in Operation');
        }
    })
}

function addModal() {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/","").toString();
    $(".error").text("");
    $(".add-" + pathname + "-data").val("");
    selectSubjects();
    selectUsers();
    selectTopics();
}

function addSubmit() {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/","").toString();
    $(".error").text("");
    var dateTime = getCurrentDate();
    $("#date-add-" + pathname + "-modal").val(dateTime);
    var map = {};
    $(".add-" + pathname + "-data").each(function () {
        map[$(this).attr("name")] = $(this).val();
    });
    map["id"] = 1;
    alert(JSON.stringify(map));
    $.ajax({
        type: "POST",
        url: path,
        headers : {
            "X-CSRF-Token" : $('meta[name="_csrf"]').attr('content')
        },
        data: JSON.stringify(map),
        contentType: 'application/json; charset=UTF-8',
        dataType: "json",
        success: function () {
            $('#add-' + pathname + "-modal").modal('hide');
            buildTable("?page=1&&size=5");
            buildShowingNumberInfo(1,5);
            buildShowingNumberButtons();
        },
        error: function (jqXHR) {
            var obj = JSON.parse(jqXHR.responseText);
            var objStr = obj.errors.toString();
            var array = objStr.split(',');
            var lang = $("#lang").val();
            $.i18n.properties({
                name: 'messages',
                path: 'resources/bundle',
                mode: 'both',
                language: lang,
                callback: function () {
                    $.each(array, function (index, value) {
                        var hashvalue = "." + value;
                        $(hashvalue).text($.i18n.prop(value));
                    })
                }
            })
        }
    });
}

function updateModal() {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/", "").toString();
    $('#update-' + pathname + '-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var pathUpdate = button.data('url');
        $("#update-" + pathname + "-modal-button").attr("data-url", pathUpdate);
        $(".error").text("");
        var selectedSubject;
        var selectedUser;
        var selectedTopic;
        $.getJSON(pathUpdate, function (data) {
            selectedSubject = data.subjectName;
            selectedUser = data.userName;
            selectedTopic = data.topicName;
            $.each(data, function (key, value) {
                $("#" + key.toString() + "-update-" + pathname + "-modal").val(value);
            });
            selectWithSelectedSubjects(selectedSubject);
            selectWithSelectedUsers(selectedUser);
            selectWithSelectedTopics(selectedTopic);
        });
    });
}

function updateSubmit(value) {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/", "").toString();
    var pathUpdate = $(value).attr("data-url");
    $(".error").text("");
    var dateTime = getCurrentDate();
    $("#date-update-" + pathname + "-modal").val(dateTime);
    var map = {};
    $(".update-" + pathname + "-data").each(function () {
        map[$(this).attr("name")] = $(this).val();
    });
    map["id"] = 1;
    $.ajax({
        type: "PUT",
        url: pathUpdate,
        headers: {
            "X-CSRF-Token": $('meta[name="_csrf"]').attr('content')
        },
        data: JSON.stringify(map),
        contentType: 'application/json; charset=UTF-8',
        dataType: "json",
        success: function (data, textStatus, xhr) {
            $('#update-' + pathname + "-modal").modal('hide');
            buildTable("?page=1&&size=5");
            buildShowingNumberInfo(1,5);
            buildShowingNumberButtons();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var obj = JSON.parse(jqXHR.responseText);
            var objStr = obj.errors.toString();
            var array = objStr.split(',');
            var lang = $("#lang").val();
            $.i18n.properties({
                name: 'messages',
                path: 'resources/bundle',
                mode: 'both',
                language: lang,
                callback: function () {
                    $.each(array, function (index, value) {
                        var hashvalue = "." + value;
                        $(hashvalue).text($.i18n.prop(value));
                    });
                }
            })
        }
    })
}

function read() {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/", "").toString();
    $('#read-' + pathname + '-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var pathRead = button.data('url');

        $.getJSON(pathRead, function (data) {
            $(".subjectName-read").html(data.subjectName);
            $(".subjects-text").html(data.text);
        });
    });
}

function selectSubjects() {
    $.getJSON("/admin/subjects", function (data) {
        var subjectDTO_data = '';
        subjectDTO_data += '<option selected disabled>Select the subject</option>';
        $.each(data, function (key, value) {
            subjectDTO_data += '<option value="' + value.subjectName + '">' + value.subjectName + '</option>';
        });
        $(".subjects-select-update").html(subjectDTO_data);
    });
}

function selectTopics() {
    $.getJSON("/admin/topics", function (data) {
        var topicDTO_data = '<option selected disabled>Select the topic</option>';
        topicDTO_data += '';
        $.each(data, function (key, value) {
            topicDTO_data += '<option value="' + value.topicName + '">' + value.topicName + '</option>';
        });
        $(".topics-select-update").html(topicDTO_data);
    });
}

function selectUsers() {
    $.getJSON("/admin/users", function (data) {
        var userDTO_data = '<option selected disabled>Select the user</option>';
        userDTO_data += '';
        $.each(data, function (key, value) {
            userDTO_data += '<option value="' + value.userName + '">' + value.userName + '</option>';
        });
        $(".users-select-update").html(userDTO_data);
    });
}

function selectWithSelectedSubjects(subject) {
    $.getJSON("admin/subjects", function (data) {
        var subjectDTO_data = '';
        $.each(data, function (key, value) {
            if (value.subjectName === subject) {
                subjectDTO_data += '<option selected value="' + value.subjectName + '">' + value.subjectName + '</option>';
            } else {
                subjectDTO_data += '<option value="' + value.subjectName + '">' + value.subjectName + '</option>';
            }

        });
        $(".subjects-select-update").html(subjectDTO_data);
    });
}

function selectWithSelectedTopics(topic) {
    $.getJSON("admin/topics", function (data) {
        var topicDTO_data = '';
        $.each(data, function (key, value) {
            if (value.topicName === topic) {
                topicDTO_data += '<option selected value="' + value.topicName + '">' + value.topicName + '</option>';
            } else {
                topicDTO_data += '<option value="' + value.topicName + '">' + value.topicName + '</option>';
            }
        });
        $(".topics-select-update").html(topicDTO_data);
    });
}

function selectWithSelectedUsers(user) {
    $.getJSON("admin/users", function (data) {
        var userDTO_data = '';
        $.each(data, function (key, value) {
            if (value.userName === user) {
                userDTO_data += '<option selected value="' + value.userName + '">' + value.userName + '</option>';
            } else {
                userDTO_data += '<option value="' + value.userName + '">' + value.userName + '</option>';
            }
        });
        $(".users-select-update").html(userDTO_data);
    });
}

function getCurrentDate() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
}

function buildSearchTable() {
    var path = $('#default-path').attr("href");
    var pathname = path.toString().replace("admin/","").toString();
    var pathnameCapital = pathname.charAt(0).toUpperCase() + pathname.slice(1);
    var searchWord = $('#word-search').val();
    $('#search-path').attr("data-id", searchWord);
    var searchQuery = "?search=" + searchWord + "&page=1&size=5";
    $("#" + pathname + "-body").empty();
    buildTable(searchQuery);
    $(".pathname-capital").text(pathnameCapital + ': Search by word "'+ searchWord +'"');
    buildSearchShowingNumberInfo(1,5);
    buildSearchShowingNumberButtons();
    switchSearchNumberPage();
}