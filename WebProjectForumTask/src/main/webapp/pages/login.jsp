<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en"><head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Login</title>

    <!-- Bootstrap core CSS-->
    <link href="<c:url value="/resources/vendor/bootstrap/css/bootstrap.css" />" rel="stylesheet">

    <!-- Custom fonts for this template-->
    <link href="<c:url value="/resources/vendor/fontawesome-free/css/all.min.css" />" rel="stylesheet" type="text/css">

    <!-- Custom styles for this template-->
    <link href="<c:url value="/resources/css/sb-admin.css" />" rel="stylesheet">

</head>

<body class="bg-dark">
<a hidden name="url" id="url" href="${pageContext.request.contextPath}/"></a>
<input type="hidden" id ="lang" value="${pageContext.response.locale}"/>
<div class="container">
    <div class="card card-login mx-auto mt-5">
        <div class="card-header admin-login">Login</div>
        <div class="card-body">
            <form name="frm" action="login" method="post">
                <div class="form-group">
                    <div class="form-group">
                        <div class="form-label-group">
                            <input type="text" name="username" id="inputUsername" class="form-control" placeholder="Username" required="required" autofocus="autofocus">
                            <label for="inputUsername" class="admin-data-table-head-username">Username</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-label-group">
                            <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required="required">
                            <label for="inputPassword" class="admin-data-table-head-password">Password</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div>
                            <input class="btn btn-primary btn-block login-button-submit" name="submit" type="submit" value="Submit">
                        </div>
                    </div>
                    <div class="form-group">
                        <div>
                            <input class="btn btn-primary btn-block login-button-reset" name="reset" type="reset"  value="Reset">
                        </div>
                    </div>
                </div>

                <input type="hidden" name="<c:out value="${_csrf.parameterName}"/>"
                       value="<c:out value="${_csrf.token}"/>"/>
            </form>
            <div class="text-center">
                <a class="d-block small login-ref-home-page" href="/blog/all">Home page</a>
                <span>
                <a href="?lang=en_US" class="admin-language-en">English</a>
                |
                <a href="?lang=ru" class="admin-language-ru">Russian</a>
                </span>
            </div>
        </div>
    </div>
</div>

<!-- Bootstrap core JavaScript-->
<script src="<c:url value="/resources/vendor/jquery/jquery.min.js" />"></script>
<script src="<c:url value="/resources/vendor/bootstrap/js/bootstrap.bundle.min.js" />"></script>

<!-- Core plugin JavaScript-->
<script src="<c:url value="/resources/vendor/jquery-easing/jquery.easing.min.js" />"></script>
<script src="<c:url value="/resources/vendor/jquery-i18n-properties/jquery.i18n.properties.js" />"></script>
<script src="<c:url value="/resources/js/login.js" />"></script>



</body></html>
