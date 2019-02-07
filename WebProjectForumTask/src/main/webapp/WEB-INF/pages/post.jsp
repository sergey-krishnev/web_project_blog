<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Start FOUR ROOM</title>

    <!-- Bootstrap core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/blog-post.css" rel="stylesheet">

</head>

<body>

<!-- Navigation -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
        <a class="navbar-brand" href="#">Start FOUR ROOM</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
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
                    <a class="nav-link" href="${pageContext.request.contextPath}/login">Login</a>
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
            <div class="card my-4">
                <h5 class="card-header">Leave a Comment:</h5>
                <div class="card-body">
                    <form>
                        <div class="form-group">
                            <textarea class="form-control" rows="3"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>

            <!-- Single Comment -->
            <div class="aggregate-comments">
                <%--<div class="media mb-4">--%>
                    <%--<img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">--%>
                    <%--<div class="media-body">--%>
                        <%--<h5 class="mt-0">Commenter Name</h5>--%>
                        <%--Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras--%>
                        <%--purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi--%>
                        <%--vulputate fringilla. Donec lacinia congue felis in faucibus.--%>
                    <%--</div>--%>
                <%--</div>--%>
                <%--<div class="media mb-4">--%>
                    <%--<img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">--%>
                    <%--<div class="media-body">--%>
                        <%--<h5 class="mt-0">Commenter Name</h5>--%>
                        <%--Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras--%>
                        <%--purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi--%>
                        <%--vulputate fringilla. Donec lacinia congue felis in faucibus.--%>
                    <%--</div>--%>
                <%--</div>--%>
                <%--<div class="media mb-4">--%>
                    <%--<img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">--%>
                    <%--<div class="media-body">--%>
                        <%--<h5 class="mt-0">Commenter Name</h5>--%>
                        <%--Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras--%>
                        <%--purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi--%>
                        <%--vulputate fringilla. Donec lacinia congue felis in faucibus.--%>
                    <%--</div>--%>
                <%--</div>--%>
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
                </div>
            </div>

        </div>

    </div>
    <!-- /.row -->

</div>
<!-- /.container -->

<!-- Footer -->
<footer class="py-5 bg-dark">
    <div class="container">
        <p class="m-0 text-center text-white">Copyright &copy; Your Website 2018</p>
    </div>
    <!-- /.container -->
</footer>

<!-- Bootstrap core JavaScript -->
<script src="vendor/jquery/jquery.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="scripts/script.js"></script>

</body>

</html>

