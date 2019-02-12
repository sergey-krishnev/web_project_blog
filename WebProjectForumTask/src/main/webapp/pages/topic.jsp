<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
    <title>Topic</title>

    <link href="<c:url value="resources/vendor/bootstrap/css/bootstrap.css" />" rel="stylesheet">

    <link href="<c:url value="resources/vendor/fontawesome-free/css/all.min.css" />" rel="stylesheet" type="text/css">

    <link href="<c:url value="resources/css/blog-home.css" />" rel="stylesheet">

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

<script src="<c:url value="resources/vendor/jquery/jquery.js" />"></script>
<script src="<c:url value="resources/vendor/bootstrap/js/bootstrap.bundle.js" />"></script>

<script src="https://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.js"></script>

<!-- Custom jQuery scripts -->
<script src="<c:url value="resources/js/topic.js" />"></script>

</body>
</html>
