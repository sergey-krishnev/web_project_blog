package hibernate.dao.interfaces;

import hibernate.dto.CommentDTO;
import hibernate.model.Comment;
import hibernate.model.Subject;
import hibernate.model.Topic;
import hibernate.model.Users;

import java.sql.Date;
import java.util.List;

public interface CRUDDao{

    List<Topic> searchAllTopic();

    List<Subject> searchAllSubject();

    Topic searchTopicById(int topicId);

    Subject searchSubjectById(int subjectId);

    List<Comment> searchAllComment();

    List<Users> searchAllUsers();

    Users searchByUserName(String username);

    Topic searchByTopicName(String topicName);

    Subject searchBySubjectName(String subjectName);

    void insertTopic(String topicName);

    void updateTopic(int topicId, String topicName);

    void deleteTopic(int topicId);

    void insertSubject(String subjectName, Date date, String text, String userName, String topicName);

    void updateSubject(int subjectId, String subjectName, Date date, String text, String userName, String topicName);

    void deleteSubject(int subjectId);

    void insertUsers(String userName, String password, String email, String firstName, String lastName);

    Users searchUserById(int userId);

    void updateUsers(int userId, String userName, String password, String email, String firstName, String lastName);

    void deleteUsers(int userId);

    Comment searchCommentById(int commentId);

    void insertComment(String message, Date date, String userName, String subjectName);

    void updateComment(int commentId, String message, Date date, String userName, String subjectName);

    void deleteComment(int commentId);
}
