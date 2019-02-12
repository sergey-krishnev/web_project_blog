<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Start FOUR ROOM</title>

    <style type="text/css">
        .error {
            color: red;
        }
    </style>

    <!-- Bootstrap core CSS -->
    <link href="<c:url value="/resources/vendor/bootstrap/css/bootstrap.css" />" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="<c:url value="/resources/css/blog-post.css" />" rel="stylesheet">

</head>

<body>

<input type="hidden" id ="lang" value="${pageContext.response.locale}"/>

<!-- Navigation -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
        <a class="navbar-brand" href="#">Start FOUR ROOM</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <span style="float: left">
        <a href="?lang=en_US">English</a>
        |
        <a href="?lang=ru">Russian</a>
        </span>

        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home
                        <span class="sr-only">(current)</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Services</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Contact</a>
                </li>
                <%--<li class="nav-item">--%>
                    <%--<a class="nav-link" href="${pageContext.request.contextPath}/login">Login</a>--%>
                <%--</li>--%>
                <li class="nav-item">
                    <a class="nav-link" href="${pageContext.request.contextPath}/admin">Link admin</a>
                </li>
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

            <hr>

            <!-- Comments Form -->
            <div class="error NotEmpty-commentDTO-message"></div>
            <div class="error BadWords-commentDTO-message"></div>
            <div class="card my-4">
                <h5 class="card-header">Leave a Comment:</h5>
                <div class="card-body">
                    <form>
                        <div class="form-group">
                            <textarea class="form-control text-message" rows="3"></textarea>
                        </div>
                        <button type="button" class="btn btn-primary add-comment">Submit</button>
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
                <h5 class="card-header">Search</h5>
                <div class="card-body">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search for...">
                        <span class="input-group-btn">
                  <button class="btn btn-secondary" type="button">Go!</button>
                </span>
                    </div>
                </div>
            </div>

            <!-- Categories Widget -->
            <jsp:include page="topic.jsp" />

            <!-- Side Widget -->
            <div class="card my-4">
                <h5 class="card-header">Side Widget</h5>
                <div class="card-body">
                    You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!
                </div>
            </div>

        </div>

    </div>
    <!-- /.row -->

</div>
<!-- /.container -->

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

<!-- Bootstrap core JavaScript -->
<script src="<c:url value="/resources/vendor/jquery/jquery.js" />"></script>
<script src="<c:url value="/resources/vendor/bootstrap/js/bootstrap.bundle.js" />"></script>
<script src="<c:url value="/resources/vendor/jquery-i18n-properties/jquery.i18n.properties.js" />"></script>

<script src="https://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.js"></script>

<script src="<c:url value="/resources/js/postController.js" />"></script>

</body>

</html>

