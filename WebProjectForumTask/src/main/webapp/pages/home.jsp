<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>FOUR ROOM Home</title>

    <!-- Bootstrap core CSS -->
    <link href="<c:url value="/resources/vendor/bootstrap/css/bootstrap.css" />" rel="stylesheet">

    <link href="<c:url value="/resources/vendor/fontawesome-free/css/all.min.css" />" rel="stylesheet" type="text/css">

    <!-- Custom styles for this template -->
    <link href="<c:url value="/resources/css/blog-home.css" />" rel="stylesheet">


</head>

<body>
<a type="hidden" id="default-path" href="topics"></a>
<!-- Navigation -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
        <a class="navbar-brand" href="#">Start FOUR ROOM</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
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
                <li class="nav-item">
                    <a class="nav-link" href="${pageContext.request.contextPath}/admin">Link admin</a>
                </li><%--timely--%>
                    <%--<sec:authorize access="!isAuthenticated()">--%>
                        <%--<a class="nav-link" href="${pageContext.request.contextPath}/login">Login</a>--%>
                    <%--</sec:authorize>--%>
                    <%--<sec:authorize access="isAuthenticated()">--%>
                <li class="nav-item dropdown no-arrow">
                    <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-user-circle fa-fw"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                        <%--<sec:authorize access="hasRole('ADMIN')">--%>
                        <%--<a class="dropdown-item" href="/admin">Admin panel</a>--%>
                        <%--</sec:authorize>--%>
                        <a class="dropdown-item" href="#">Settings</a>
                        <a class="dropdown-item" href="#">Activity Log</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">Logout</a>
                    </div>
                </li>
                    <%--</sec:authorize>--%>
            </ul>
        </div>
    </div>
</nav>

<!-- Page Content -->
<div class="container">

    <div class="row">

        <!-- Blog Entries Column -->
        <div class="col-md-8">
            <div class="justify-content-between">
                <h1 class="my-6 topicName">All Subjects </h1>
            </div>
            <div class="aggregate-subjects"></div>


            <!-- Pagination -->
            <ul class="pagination justify-content-center mb-4">
                <li class="page-item">
                    <a class="page-link" href="#">&larr; Older</a>
                </li>
                <li class="page-item disabled">
                    <a class="page-link" href="#">Newer &rarr;</a>
                </li>
            </ul>

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

            <div class="card my-4">
                <h5 class="card-header">Add own subject</h5>
                <div class="card-body">
                    <p class="card-text">Select the button to add.</p>
                    <a href="/post/add" class = "btn btn-primary">Add new subject</a>
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

<script id="subjectsTemplate" type="text/x-jQuery-tmpl">
                <div class = "card mb-4">
                <div class = "card-body">
                <h2 class = "card-title">\${subjectName}</h2>
                <p class = "card-text">\${text}</p>
                <a href="/post/\${id}" class = "btn btn-primary subject-read">Read More &rarr;</a>
                </div>
                <div class="card-footer text-muted">Posted on \${date} by
                <a href="#">\${userName}</a>
                </div></div>
</script>


<!-- Bootstrap core JavaScript -->
<script src="<c:url value="/resources/vendor/jquery/jquery.js" />"></script>
<script src="<c:url value="/resources/vendor/bootstrap/js/bootstrap.bundle.js" />"></script>

<script src="https://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.js"></script>

<!-- Custom jQuery scripts -->
<script src="<c:url value="/resources/js/blogController.js" />"></script>

</body>

</html>
