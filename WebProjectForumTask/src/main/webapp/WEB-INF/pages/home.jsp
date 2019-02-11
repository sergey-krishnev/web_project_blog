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
    <link href="blog/vendor/bootstrap/css/bootstrap.css" rel="stylesheet">

    <link href="blog/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">

    <!-- Custom styles for this template -->
    <link href="blog/css/blog-home.css" rel="stylesheet">


</head>

<body>
<a type="hidden" id="default-path" href="blog/topics"></a>
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
                    <a class="nav-link" href="${pageContext.request.contextPath}/admin">Link admin</a> <%--timely--%>
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
                </li>
            </ul>
        </div>
    </div>
</nav>

<!-- Page Content -->
<div class="container">

    <div class="row">

        <!-- Blog Entries Column -->
        <div class="col-md-8">
            <h1 class="my-4 topicName">All Subjects</h1>
            <div class="aggregate-subjects"></div>
            <div class="aggregate-post"></div>
            <!-- Comments Form -->
            <div class="card my-4 comments-form" style="display: none">
                <h5 class="card-header">Leave a Comment:</h5>
                <div class="card-body">
                    <form>
                        <div class="form-group">
                            <textarea class="form-control text-message" rows="3"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary add-comment">Submit</button>
                    </form>
                </div>
            </div>
            <div class="aggregate-comments"></div>
            <%--<!-- Blog Post -->--%>
            <%--<div class="card mb-4">--%>
                <%--<div class="card-body">--%>
                    <%--<h2 class="card-title">Post Title</h2>--%>
                    <%--<p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!</p>--%>
                    <%--<a href="#" class="btn btn-primary">Read More &rarr;</a>--%>
                <%--</div>--%>
                <%--<div class="card-footer text-muted">--%>
                    <%--Posted on January 1, 2017 by--%>
                    <%--<a href="#">Start Bootstrap</a>--%>
                <%--</div>--%>
            <%--</div>--%>



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

            <!-- Categories Widget -->
            <div class="card my-4">
                <h5 class="card-header">Topics</h5>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <ul class="list-unstyled mb-0 aggregate-topics">

                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Side Widget -->
            <div class="card my-4">
                <h5 class="card-header">Side Widget</h5>
                <div class="card-body">
                    You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!
                    You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!
                    You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!
                    You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!
                </div>
            </div>

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
<footer class="py-5 bg-dark">
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
                <a href="/blog/subjects/\${id}" class = "btn btn-primary subject-read">Read More &rarr;</a>
                </div>
                <div class="card-footer text-muted">Posted on \${date} by
                <a href="#">\${userName}</a>
                </div></div>
</script>

<script id="commentsTemplate" type="text/x-jQuery-tmpl">
            <hr>
           <div class="media mb-4">
            <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
            <div class="media-body">
            <h5 class="mt-0">\${userName}<span class="small"> at \${date}</span></h5>
            \${message};
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
<script src="blog/vendor/jquery/jquery.min.js"></script>
<script src="blog/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

<script src="https://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.js"></script>

<!-- Custom jQuery scripts -->
<script src="blog/scripts/blogController.js"></script>

</body>

</html>

