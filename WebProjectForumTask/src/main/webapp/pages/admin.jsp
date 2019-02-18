<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <sec:csrfMetaTags />
    <sec:authentication property="principal.username" var="username" />

    <title class="Pathname">Dashboard</title>

    <style type="text/css">
        .error {
            color: red;
        }
    </style>

    <!-- Bootstrap core CSS-->
    <link href="<c:url value="/resources/vendor/bootstrap/css/bootstrap.css" />" rel="stylesheet">

    <!-- Custom fonts for this template-->
    <link href="<c:url value="/resources/vendor/fontawesome-free/css/all.min.css" />" rel="stylesheet" type="text/css">

    <!-- Page level plugin CSS-->
    <link href="<c:url value="/resources/vendor/datatables/dataTables.bootstrap4.css" />" rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="<c:url value="/resources/css/sb-admin.css" />" rel="stylesheet">

    <link rel="shortcut icon" href="#" />

</head>

<body id="page-top">

<a hidden name="url" id="url" href="${pageContext.request.contextPath}/"></a>
<a type="hidden" id="default-path" href="admin/comments"></a>
<input type="hidden" id ="lang" value="${pageContext.response.locale}"/>

    <nav class="navbar navbar-expand navbar-dark bg-dark static-top">

        <a class="navbar-brand mr-1" href="#">Start FOUR ROOM Admin</a>

        <button class="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#">
            <i class="fas fa-bars"></i>
        </button>

        <span style="float: left">
        <a href="?lang=en_US">English</a>
        |
        <a href="?lang=ru">Russian</a>
        </span>

        <!-- Navbar Search -->
        <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Search for..." aria-label="Search"
                       aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-primary" type="button">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </form>

        <!-- Navbar -->
        <ul class="navbar-nav ml-auto ml-md-0">
            <li class="nav-item dropdown no-arrow">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">
                    ${username}
                    <i class="fas fa-user-circle fa-fw"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <a class="dropdown-item" href="/blog/all">Main page</a>
                    <a class="dropdown-item" href="#">Settings</a>
                    <a class="dropdown-item" href="#">Activity Log</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">Logout</a>
                </div>
            </li>
        </ul>

    </nav>

    <div id="wrapper">


        <!-- Sidebar -->
        <ul class="sidebar navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-url="admin/comments" href="#">
                    <i class="fas fa-fw fa-comments"></i>
                    <span>Comments</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link " data-url="admin/subjects" href="#">
                    <i class="fas fa-fw fa-list"></i>
                    <span>Subjects</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-url="admin/users" href="#">
                    <i class="fas fa-fw fa-users"></i>
                    <span>Users</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-url="admin/topics"  href="#">
                    <i class="fas fa-fw fa-list"></i>
                    <span>Topics</span></a>
            </li>
        </ul>

        <div id="content-wrapper">

            <div class="container-fluid">

                <!-- Breadcrumbs-->
                <ol class="breadcrumb">
                    <li class="breadcrumb-item pathname-capital">
                    </li>
                </ol>

                <!-- Comments DataTables Example -->

                <div id="adminTables">
                    <div id="display-comments-table" class="display-tables" style="display: none">
                        <div class="card mb-3">
                            <div class="card-header">
                                <i class="fas fa-comments"></i>
                                Comments Data Table
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered table-hover" width="100%" cellspacing="0">
                                        <thead>
                                        <tr>
                                            <th>Comment</th>
                                            <th>Username</th>
                                            <th>Topic name</th>
                                            <th>Subject name</th>
                                            <th>Date</th>
                                            <th colspan="2">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody id="comments-body"></tbody>
                                    </table>
                                    <button type="button" class="btn btn-info" id="add-comments" data-url ="/admin/comments" onclick="addModal()" data-toggle="modal"
                                            data-target="#add-comments-modal">Add new comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="display-subjects-table" class="display-tables" style="display: none">
                        <div class="card mb-3">
                            <div class="card-header">
                                <i class="fas fa-list"></i>
                                Subjects Data Table
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered table-hover" width="100%" cellspacing="0">
                                        <thead>
                                        <tr>
                                            <th>Subject name</th>
                                            <th>Description</th>
                                            <th>Username</th>
                                            <th>Topic name</th>
                                            <th>Date</th>
                                            <th colspan="3">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody id="subjects-body"></tbody>
                                    </table>
                                    <button type="button" class="btn btn-info" id="add-subjects" data-url ="/admin/subjects" onclick="addModal()" data-toggle="modal"
                                            data-target="#add-subjects-modal">Add new subject
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="display-users-table"  class="display-tables" style="display: none">
                        <div class="card mb-3">
                            <div class="card-header">
                                <i class="fas fa-users"></i>
                                Users Data Table
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered table-hover" width="100%" cellspacing="0">
                                        <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>Password</th>
                                            <th>Email</th>
                                            <th>First name</th>
                                            <th>Last name</th>
                                            <th colspan="2">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody id="users-body"></tbody>
                                    </table>
                                    <button type="button" class="btn btn-info" id="add-users" data-url ="/admin/users" onclick="addModal()" data-toggle="modal"
                                            data-target="#add-users-modal">Add new user
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="display-topics-table" class="display-tables" style="display: none">
                        <div class="card mb-3">
                            <div class="card-header">
                                <i class="fas fa-list"></i>
                                Topics Data Table
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered table-hover" width="100%" cellspacing="0">
                                        <thead>
                                        <tr>
                                            <th>Topic name</th>
                                            <th colspan="2">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody id="topics-body"></tbody>
                                    </table>
                                    <button type="button" class="btn btn-info" id="add-topics" data-url ="/admin/topics" onclick="addModal()" data-toggle="modal"
                                            data-target="#add-topics-modal">Add new topic
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- /.container-fluid -->

            <!-- Sticky Footer -->
            <footer class="sticky-footer">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Copyright © FOUR ROOM 2019</span>
                    </div>
                </div>
            </footer>

        </div>
        <!-- /.content-wrapper -->

    </div>
    <!-- /#wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
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

    <!-- Modal Delete Comments-->
    <div class="modal fade" id="delete-comments-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Delete the comment?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Delete" below if you are ready to delete this comment.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <button class="btn btn-primary" id="delete-comments-modal-button" type="button" onclick="removeSubmit(this)" data-url ="#" data-dismiss="modal">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Update Comments-->
    <div class="modal fade" id="update-comments-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Update the comment</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="message-update-comments-modal">Comment</label>
                        <input name="message" id="message-update-comments-modal" class="form-control update-comments-data"
                               placeholder="Comment" type="text">
                        <div class="error NotEmpty-commentDTO-message"></div>
                        <div class="error BadWords-commentDTO-message"></div>
                    </div>
                    <div class="form-group">
                        <label for="userName-update-comments-modal">Username</label>
                        <select name="userName" id="userName-update-comments-modal"
                                class="form-control update-comments-data users-select-update"></select>
                    </div>
                    <div class="form-group">
                        <label for="topicName-update-comments-modal">Topic name:</label>
                        <select name="topicName" id="topicName-update-comments-modal"
                                class="form-control update-comments-data topics-select-update"></select>
                    </div>
                    <div class="form-group">
                        <label for="subjectName-update-comments-modal">Subject name:</label>
                        <select name="subjectName" id="subjectName-update-comments-modal"
                                class="form-control update-comments-data subjects-select-update"></select>
                    </div>
                    <input id="date-update-comments-modal" name="date" type="hidden" class="update-comments-data" value="">
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <button class="btn btn-primary" id="update-comments-modal-button" type="button" onclick="updateSubmit(this)" data-url ="#">
                        Update
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Add Comments-->
    <div class="modal fade" id="add-comments-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add the comment</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="message-add-comments-modal">Comment</label>
                        <input name="message" id="message-add-comments-modal" class="form-control add-comments-data"
                               placeholder="Comment" type="text">
                        <div class="error NotEmpty-commentDTO-message"></div>
                        <div class="error BadWords-commentDTO-message"></div>
                    </div>
                    <div class="form-group">
                        <label for="userName-add-comments-modal">Username</label>
                        <select name="userName" id="userName-add-comments-modal"
                                class="form-control add-comments-data users-select-update">
                        </select>
                        <div class="error NotEmpty-commentDTO-userName"></div>
                    </div>
                    <div class="form-group">
                        <label for="topicName-add-comments-modal">Topic name:</label>
                        <select name="topicName" id="topicName-add-comments-modal"
                                class="form-control add-comments-data topics-select-update">
                        </select>
                        <div class="error NotEmpty-commentDTO-topicName"></div>
                    </div>
                    <div class="form-group">
                        <label for="subjectName-add-comments-modal">Subject name:</label>
                        <select name="subjectName" id="subjectName-add-comments-modal"
                                class="form-control add-comments-data subjects-select-update">
                        </select>
                        <div class="error NotEmpty-commentDTO-subjectName"></div>
                    </div>
                    <input id="date-add-comments-modal" name="date" type="hidden" class="add-comments-data" value="">
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <button class="btn btn-primary" id="add-comments-modal-button" onclick="addSubmit()" type="button">Add
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Delete Subjects-->
    <div class="modal fade" id="delete-subjects-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Delete the subject?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Delete" below if you are ready to delete this subject.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <button class="btn btn-primary" id="delete-subjects-modal-button" type="button" onclick="removeSubmit(this)" data-url ="#" data-dismiss="modal">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Update Subjects-->
    <div class="modal fade" id="update-subjects-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Update the subject</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="subjectName-update-subjects-modal">Subject name:</label>
                        <input name="subjectName" id="subjectName-update-subjects-modal" type="text"
                               class="form-control update-subjects-data" value="" placeholder="Subject name">
                        <div class="error NotEmpty-subjectDTO-subjectName"></div>
                        <div class="error BadWords-subjectDTO-subjectName"></div>
                        <div class="error SameSubjectName-subjectDTO-subject"></div>
                    </div>
                    <div class="form-group">
                        <label for="userName-update-subjects-modal">Username:</label>
                        <select name="userName" id="userName-update-subjects-modal"
                                class="form-control users-select-update update-subjects-data"></select>
                    </div>
                    <div class="form-group">
                        <label for="topicName-update-subjects-modal">Topic name:</label>
                        <select name="topicName" id="topicName-update-subjects-modal"
                                class="form-control topics-select-update update-subjects-data"></select>
                    </div>
                    <input id="date-update-subjects-modal" name="date" type="hidden" class="update-subjects-data" value="">
                    <div class="form-group">
                        <label for="text-update-subjects-modal">Text</label>
                        <textarea name="text" id="text-update-subjects-modal" type="text"
                                  class="form-control update-subjects-data" placeholder="Text" rows=5></textarea>
                        <div class="error NotEmpty-subjectDTO-text"></div>
                        <div class="error BadWords-subjectDTO-text"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <button class="btn btn-primary" id="update-subjects-modal-button" type="button" onclick="updateSubmit(this)" data-url ="#">
                        Update
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Add Subjects-->
    <div class="modal fade" id="add-subjects-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add the subject</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="subjectName-add-subjects-modal">Subject name:</label>
                        <input name="subjectName" id="subjectName-add-subjects-modal" type="text"
                               class="form-control add-subjects-data" value="" placeholder="Subject name">
                        <div class="error NotEmpty-subjectDTO-subjectName"></div>
                        <div class="error BadWords-subjectDTO-subjectName"></div>
                        <div class="error SameSubjectName-subjectDTO-subject"></div>
                    </div>
                    <div class="form-group">
                        <label for="userName-add-subjects-modal">Username:</label>
                        <select name="userName" id="userName-add-subjects-modal"
                                class="form-control users-select-update add-subjects-data"></select>
                        <div class="error NotEmpty-subjectDTO-userName"></div>
                    </div>
                    <div class="form-group">
                        <label for="topicName-add-subjects-modal">Topic name:</label>
                        <select name="topicName" id="topicName-add-subjects-modal"
                                class="form-control topics-select-update add-subjects-data"></select>
                        <div class="error NotEmpty-subjectDTO-topicName"></div>
                    </div>
                    <input id="date-add-subjects-modal" name="date" type="hidden" class="add-subjects-data" value="">
                    <div class="form-group">
                        <label for="text-add-subjects-modal">Text</label>
                        <textarea name="text" id="text-add-subjects-modal" type="text" class="form-control add-subjects-data"
                                  placeholder="Text" rows=5></textarea>
                        <div class="error NotEmpty-subjectDTO-text"></div>
                        <div class="error BadWords-subjectDTO-text"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <button class="btn btn-primary" id="add-subjects-modal-button" onclick="addSubmit()" type="button">Add
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Read Subjects-->
    <div class="modal fade" id="read-subjects-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title subjectName-read"></h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body subjects-text">
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Delete Users-->
    <div class="modal fade" id="delete-users-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Delete the user?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Delete" below if you are ready to delete this user.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <button class="btn btn-primary" id="delete-users-modal-button" type="button" onclick="removeSubmit(this)" data-url ="#" data-dismiss="modal">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Update Users-->
    <div class="modal fade" id="update-users-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Update the user?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="userName-update-users-modal">Username:</label>
                        <input name="userName" id="userName-update-users-modal" type="text"
                               class="form-control update-users-data" value="" placeholder="Username"/>
                        <div class="error NotEmpty-userDTO-userName"></div>
                        <div class="error BadWords-userDTO-userName"></div>
                        <div class="error SameUserName-userDTO-userName"></div>
                    </div>
                    <div class="form-group">
                        <label for="password-update-users-modal">Password:</label>
                        <input name="password" id="password-update-users-modal" type="text"
                               class="form-control update-users-data" value="" placeholder="Password"
                               required="required"/>
                        <div class="error NotEmpty-userDTO-password"></div>
                    </div>
                    <div class="form-group">
                        <label for="email-update-users-modal">E-mail:</label>
                        <input name="email" type="text" id="email-update-users-modal" class="form-control update-users-data"
                               value="" placeholder="E-mail"/>
                        <div class="error NotEmpty-userDTO-email"></div>
                        <div class="error Email-userDTO-email"></div>
                    </div>
                    <div class="form-group">
                        <label for="firstName-update-users-modal">First name:</label>
                        <input name="firstName" type="text" id="firstName-update-users-modal"
                               class="form-control update-users-data" value="" placeholder="First name"/>
                        <div class="error NotEmpty-userDTO-firstName"></div>
                        <div class="error BadWords-userDTO-firstName"></div>
                    </div>
                    <div class="form-group">
                        <label for="lastName-update-users-modal">Last name:</label>
                        <input name="lastName" type="text" id="lastName-update-users-modal"
                               class="form-control update-users-data" value="" placeholder="Last name"/>
                        <div class="error NotEmpty-userDTO-lastName"></div>
                        <div class="error BadWords-userDTO-lastName"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <button class="btn btn-primary" id="update-users-modal-button" type="button" onclick="updateSubmit(this)" data-url ="/">
                        Update
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Add Users-->
    <div class="modal fade" id="add-users-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add the user</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="userName-add-users-modal">Username:</label>
                        <input name="userName" id="userName-add-users-modal" type="text" class="form-control add-users-data"
                               value="" placeholder="Username"/>
                        <div class="error NotEmpty-userDTO-userName"></div>
                        <div class="error BadWords-userDTO-userName"></div>
                        <div class="error SameUserName-userDTO-userName"></div>
                    </div>
                    <div class="form-group">
                        <label for="password-add-users-modal">Password:</label>
                        <input name="password" id="password-add-users-modal" type="text" class="form-control add-users-data"
                               value="" placeholder="Password" required="required"/>
                        <div class="error NotEmpty-userDTO-password"></div>
                    </div>
                    <div class="form-group">
                        <label for="email-add-users-modal">E-mail:</label>
                        <input name="email" type="text" id="email-add-users-modal" class="form-control add-users-data"
                               value="" placeholder="E-mail"/>
                        <div class="error NotEmpty-userDTO-email"></div>
                        <div class="error Email-userDTO-email"></div>
                    </div>
                    <div class="form-group">
                        <label for="firstName-add-users-modal">First name:</label>
                        <input name="firstName" type="text" id="firstName-add-users-modal"
                               class="form-control add-users-data" value="" placeholder="First name"/>
                        <div class="error NotEmpty-userDTO-firstName"></div>
                        <div class="error BadWords-userDTO-firstName"></div>
                    </div>
                    <div class="form-group">
                        <label for="lastName-add-users-modal">Last name:</label>
                        <input name="lastName" type="text" id="lastName-add-users-modal" class="form-control add-users-data"
                               value="" placeholder="Last name"/>
                        <div class="error NotEmpty-userDTO-lastName"></div>
                        <div class="error BadWords-userDTO-lastName"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a class="btn btn-primary" id="add-users-modal-button" onclick="addSubmit()" type="button">Add</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Delete Topics-->
    <div class="modal fade" id="delete-topics-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Delete the topic?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Delete" below if you are ready to delete this topic.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <button class="btn btn-primary" id="delete-topics-modal-button" type="button" onclick="removeSubmit(this)" data-url ="#" data-dismiss="modal">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Update Topics-->
    <div class="modal fade" id="update-topics-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Update the topic?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="topicName-update-topics-modal">Topic name:</label>
                        <input name="topicName" id="topicName-update-topics-modal" type="text"
                               class="form-control update-topics-fata" value="" placeholder="Topic name"/>
                        <div class="error NotEmpty-topicDTO-topicName"></div>
                        <div class="error BadWords-topicDTO-topicName"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <button class="btn btn-primary" id="update-topics-modal-button" type="button" onclick="updateSubmit(this)" data-url ="#">
                        Update
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Add Topics-->
    <div class="modal fade" id="add-topics-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add the topic</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="topicName-add-topics-modal">Topic name:</label>
                        <input name="topicName" id="topicName-add-topics-modal" type="text"
                               class="form-control add-topics-data" value="" placeholder="Topic name"/>
                        <div class="error NotEmpty-topicDTO-topicName"></div>
                        <div class="error BadWords-topicDTO-topicName"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a class="btn btn-primary" id="add-topics-modal-button" onclick="addSubmit()" type="button">Add</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Templates -->
    <script id="comments-template" type="text/x-jQuery-tmpl">
        <tr id = "column\${id}">
            <td>\${message}</td>
            <td>\${userName}</td>
            <td>\${topicName}</td>
            <td>\${subjectName}</td>
            <td>\${date}</td>
            <td><button type="button" class = "btn btn-primary update-comments" data-url ="/admin/comments/\${id} "id ="\${id}" data-toggle="modal" data-target="#update-comments-modal">Update</button></td>
            <td><button type="button" class = "btn btn-danger delete-comments" data-url ="/admin/comments/\${id}" data-id ="\${id}" data-toggle="modal" data-target="#delete-comments-modal">Delete</button></td>
        </tr>

    </script>

    <script id="subjects-template" type="text/x-jQuery-tmpl">
        <tr id = "column\${id}">
            <td>\${subjectName}</td>
            <td>\${text}</td>
            <td>\${userName}</td>
            <td>\${topicName}</td>
            <td>\${date}</td>
            <td><button type="button" class = "btn btn-success read-subjects" data-url ="/admin/subjects/\${id}" id ="\${id}" data-toggle="modal" data-target="#read-subjects-modal">Read</button></td>
            <td><button type="button" class = "btn btn-primary update-subjects" data-url ="/admin/subjects/\${id}" id ="\${id}" data-toggle="modal" data-target="#update-subjects-modal">Update</button></td>
            <td><button type="button" class = "btn btn-danger delete-subjects" data-url ="/admin/subjects/\${id}" data-id ="\${id}" data-toggle="modal" data-target="#delete-subjects-modal">Delete</button></td>
        </tr>

    </script>

    <script id="users-template" type="text/x-jQuery-tmpl">
        <tr id = "column\${id}">
            <td>\${userName}</td>
            <td>\${password}</td>
            <td>\${email}</td>
            <td>\${firstName}</td>
            <td>\${lastName}</td>
            <td><button type="button" class = "btn btn-primary update-users" data-url ="/admin/users/\${id}" id ="\${id}" data-toggle="modal" data-target="#update-users-modal">Update</button></td>
            <td><button type="button" class = "btn btn-danger delete-users" data-url ="/admin/users/\${id}" data-id ="\${id}" data-toggle="modal" data-target="#delete-users-modal">Delete</button></td>
        </tr>

    </script>

    <script id="topics-template" type="text/x-jQuery-tmpl">
        <tr id = "column\${id}">
            <td>\${topicName}</td>
            <td><button type="button" class = "btn btn-primary update-topics" data-url ="/admin/topics/\${id}" id ="\${id}" data-toggle="modal" data-target="#update-topics-modal">Update</button></td>
            <td><button type="button" class = "btn btn-danger delete-topics" data-url ="/admin/topics/\${id}" data-id ="\${id}" data-toggle="modal" data-target="#delete-topics-modal">Delete</button></td>
        </tr>

    </script>

    <!-- Bootstrap core JavaScript-->
    <script src="<c:url value="/resources/vendor/jquery/jquery.min.js" />"></script>
    <script src="<c:url value="/resources/vendor/bootstrap/js/bootstrap.bundle.min.js" />"></script>
    <script src="<c:url value="/resources/vendor/bootstrap/js/bootstrap.js" />"></script>
    <script src="<c:url value="/resources/vendor/jquery-i18n-properties/jquery.i18n.properties.js" />"></script>

    <!-- Core plugin JavaScript-->
    <script src="<c:url value="/resources/vendor/jquery-easing/jquery.easing.min.js" />"></script>

    <!-- Custom scripts for all pages-->
    <script src="<c:url value="/resources/js/sb-admin.min.js" />"></script>
    <script src="https://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.js"></script>
    <script src="<c:url value="/resources/js/adminController.js" />"></script>


    <!-- Page level plugin JavaScript-->
    <script src="<c:url value="/resources/vendor/datatables/jquery.dataTables.js" />"></script>
    <script src="<c:url value="/resources/vendor/datatables/dataTables.bootstrap4.js" />"></script>

    <!-- Demo scripts for this page-->
    <script src="<c:url value="/resources/js/demo/datatables-demo.js" />"></script>


</body>
</html>