<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <sec:csrfMetaTags />

    <title>FOUR ROOM</title>

    <style type="text/css">
        .error {
            color: red;
        }
    </style>

    <!-- Bootstrap core CSS -->
    <link href="<c:url value="/resources/vendor/bootstrap/css/bootstrap.css" />" rel="stylesheet">

    <link href="<c:url value="/resources/vendor/fontawesome-free/css/all.min.css" />" rel="stylesheet" type="text/css">

    <!-- Custom styles for this template -->
    <link href="<c:url value="/resources/css/blog-post.css" />" rel="stylesheet">

    <!-- Page level plugin CSS-->
    <link href="<c:url value="/resources/vendor/datatables/dataTables.bootstrap4.css" />" rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="<c:url value="/resources/css/sb-admin.css" />" rel="stylesheet">

</head>

<body>
<input type="hidden" id ="lang" value="${pageContext.response.locale}"/>

<!-- Navigation -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
        <a class="navbar-brand" href="#">FOUR ROOM</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <span style="float: left">
        <a href="?lang=en_US" class="admin-language-en">English</a>
        |
        <a href="?lang=ru" class="admin-language-ru">Russian</a>
        </span>

        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <sec:authorize access="!isAuthenticated()">
                    <li class="nav-item">
                        <a class="nav-link admin-login" href="${pageContext.request.contextPath}/login">Login</a>
                    </li>
                </sec:authorize>
                <sec:authorize access="isAuthenticated()">
                    <sec:authentication property="principal.username" var="username" />
                    <input type="hidden" id ="username" value="${username}"/>
                    <li class="nav-item dropdown no-arrow">
                        <a class="nav-link dropdown-toggle" href="#" id="subjectDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                ${username}
                            <i class="fas fa-user-circle fa-fw"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="subjectDropdown">
                            <sec:authorize access="hasRole('ADMIN')">
                                <a class="dropdown-item admin-dropdown-admin-page" href="/admin">Admin panel</a>
                            </sec:authorize>
                            <a class="dropdown-item admin-dropdown-settings" href="#">Settings</a>
                            <a class="dropdown-item admin-dropdown-activity-log" href="#">Activity Log</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item admin-dropdown-logout" href="#" data-toggle="modal" data-target="#logoutModal">Logout</a>
                        </div>
                    </li>
                </sec:authorize>
            </ul>
        </div>
    </div>
</nav>

<!-- Page Content -->
<div class="container">

    <div class="row">

        <!-- Post Content Column -->
        <div class="col-lg-8">

            <div class="aggregate-post"></div>

            <!-- Subject add form -->
            <div class="subject-add-form" style="display: none">
                <h1>New subject</h1>
                <div class="form-group">
                <label for="subject-name-add-form" class="admin-data-table-head-subject">Subject name</label>
            <input name="subjectName" class="form-control form-control-lg subject-add" id="subject-name-add-form" type="text" placeholder="Subject name">
                    <div class="error NotEmpty-subjectDTO-subjectName"></div>
                    <div class="error SameSubjectName-subjectDTO-subject"></div>
                    <div class="error BadWords-subjectDTO-subjectName"></div>
                </div>
                <div class="form-group">
                <label for="topic-name-add-form" class="admin-data-table-head-topic">Topic name</label>
                <select name="topicName" class="form-control form-control-lg topics-select-update subject-add" id="topic-name-add-form">
                </select>
                    <div class="error NotEmpty-subjectDTO-topicName"></div>
                </div>
                <div class="form-group">
                    <label for="text-add-form" class="admin-data-table-head-text">Text</label>
                    <textarea name="text" class="form-control subject-add" id="text-add-form" rows="12"></textarea>
                    <div class="error NotEmpty-subjectDTO-text"></div>
                    <div class="error BadWords-subjectDTO-text"></div>
                </div>
                <button type="button"  class="btn btn-primary admin-modal-add-foot-button-add" onclick="addSubjectSubmit()">Add</button>
            </div>

            <!-- Subject Update Form -->
            <div class="subject-update-form" style="display: none">
                <h1 class="admin-modal-update-subject-head">Update the subject</h1>
                <div class="form-group">
                    <label for="subjectName-update-form" class="admin-data-table-head-subject">Subject name</label>
                    <input name="subjectName" class="form-control form-control-lg subject-update" id="subjectName-update-form" type="text" placeholder="Subject name">
                    <div class="error NotEmpty-subjectDTO-subjectName"></div>
                    <div class="error SameSubjectName-subjectDTO-subject"></div>
                    <div class="error BadWords-subjectDTO-subjectName"></div>
                </div>

                <div class="form-group">
                    <label for="topicName-update-form" class="admin-data-table-head-topic">Topic name</label>
                    <select name="topicName" class="form-control form-control-lg topics-select-update subject-update" id="topicName-update-form">
                    </select>
                    <div class="error NotEmpty-subjectDTO-topicName"></div>
                </div>

                <div class="form-group">
                    <label for="text-update-form" class="admin-data-table-head-text">Text</label>
                    <textarea name="text" class="form-control subject-update" id="text-update-form" rows="12"></textarea>
                    <div class="error NotEmpty-subjectDTO-text"></div>
                    <div class="error BadWords-subjectDTO-text"></div>
                </div>

                <input class="subject-update" id="userName-update-form" name="userName" type="hidden" value="">

                <button type="button" data-url = "#" class="btn btn-primary update-subject-submit admin-data-table-body-update" onclick="updateSubjectSubmit(this)">Update</button>

            </div>


            <!-- Comments Form -->
            <sec:authorize access="!isAuthenticated()">
            <div class="error user-message-login">Have to log in to leave comment</div>
            </sec:authorize>
            <div class="error NotEmpty-commentDTO-message"></div>
            <div class="error BadWords-commentDTO-message"></div>
            <div class="card my-4 comment-form">
                <h5 class="card-header">Leave a Comment:</h5>
                <div class="card-body">
                    <form>
                        <div class="form-group">
                            <textarea class="form-control text-message" rows="3"></textarea>
                        </div>
                        <button type="button" class="btn btn-primary add-comment admin-modal-add-foot-button-add">Add</button>
                    </form>
                </div>
            </div>

            <!-- Single Comment -->

            <div class="aggregate-comments">

            </div>
        </div>

        <!-- Sidebar Widgets Column -->
        <div class="col-md-4">

            <!-- Search Widget -->
            <div class="card my-4">
                <h5 class="card-header user-card-head-search">Search</h5>
                <div class="card-body">
                    <div class="input-group">
                        <input type="text" id="search-subjects" class="form-control" placeholder="Search for...">
                        <span class="input-group-btn">
                  <button class="btn btn-secondary user-card-body-button-go" type="button" onclick="searchPage()">Go!</button>
                </span>
                    </div>
                </div>
            </div>

            <!-- Categories Widget -->
            <jsp:include page="topic.jsp" />

        </div>

    </div>
    <!-- /.row -->

</div>
<!-- /.container -->

<%--Logout Modal--%>
<div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                <a class="btn btn-primary" href="<c:url value="/logout" />">Logout</a>
            </div>
        </div>
    </div>
</div>

<!-- Footer -->
<footer class="py-5 bg-dark" style="display: none">
    <div class="container">
        <p class="m-0 text-center text-white">Copyright &copy; FOUR ROOM 2019</p>
    </div>
    <!-- /.container -->
</footer>

<script id="commentsTemplate" type="text/x-jQuery-tmpl">
            <hr>
           <div class="media mb-4">
            <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
            <div class="media-body">
            <h5 class="mt-0">\${userName}<span class="small"> at \${date}</span></h5>
            \${message}
            </div>
           </div>
</script>

<script id="subjectTemplate" type="text/x-jQuery-tmpl">
    <h1 class="mt-4">\${subjectName}</h1>
    <p class="lead">by <a href="#">\${userName}</a></h1>
    <hr>
    <p>Posted on \${date}</p>
    <hr>
    <p class="lead">\${text}</p>
</script>

<!-- Bootstrap core JavaScript-->
<script src="<c:url value="/resources/vendor/jquery/jquery.min.js" />"></script>
<script src="<c:url value="/resources/vendor/bootstrap/js/bootstrap.js" />"></script>
<script src="<c:url value="/resources/vendor/bootstrap/js/bootstrap.bundle.js" />"></script>
<script src="<c:url value="/resources/vendor/jquery-i18n-properties/jquery.i18n.properties.js" />"></script>

<script src="https://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.js"></script>
<script src="<c:url value="/resources/js/postController.js" />"></script>

</body>

</html>

