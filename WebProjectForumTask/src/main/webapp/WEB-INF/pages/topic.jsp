<%--
  Created by IntelliJ IDEA.
  User: skryshneu
  Date: 2/11/2019
  Time: 1:50 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Topic</title>

    <link href="vendor/bootstrap/css/bootstrap.css" rel="stylesheet">

    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">

    <!-- Custom styles for this template -->
    <link href="css/blog-home.css" rel="stylesheet">

</head>
<body>
<a type="hidden" id="default-path" href="blog/topics"></a>

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

<script src="vendor/jquery/jquery.js"></script>
<script src="vendor/bootstrap/js/bootstrap.bundle.js"></script>

<script src="https://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.js"></script>

<!-- Custom jQuery scripts -->
<script src="scripts/topic.js"></script>

</body>
</html>
