package hibernate.service.interfaces;

import hibernate.dto.CommentDTO;
import hibernate.dto.SubjectDTO;
import hibernate.dto.TopicDTO;
import hibernate.dto.UsersDTO;
import hibernate.model.Subject;
import hibernate.model.Topic;
import hibernate.model.Users;

import java.sql.Date;
import java.util.List;

public interface CRUDService {

    List<SubjectDTO> searchSubjectByTopic(Topic topic);

    TopicDTO searchTopicById(int topicId);

    SubjectDTO searchSubjectById(int subjectId);

    List<TopicDTO> searchAllTopic();

    List<SubjectDTO> searchAllSubject();

    List<CommentDTO> searchCommentBySubject(Subject subject);

    List<CommentDTO> searchAllComment();

    void insertTopic(TopicDTO topicDTO);

    List<UsersDTO> searchAllUsers();

    void updateTopic(int topicId, TopicDTO topicDTO);

    void deleteTopic(int topicId);

    void insertSubject(SubjectDTO subjectDTO);

    void updateSubject(int subjectId, SubjectDTO subjectDTO);

    void deleteSubject(int subjectId);

    void insertUsers(UsersDTO usersDTO);

    UsersDTO searchUserById(int userId);

    void updateUsers(int userId, UsersDTO usersDTO);

    void deleteUsers(int userId);

    CommentDTO searchCommentById(int commentId);

    void insertComment(CommentDTO commentDTO);

    void updateComment(int commentId, CommentDTO commentDTO);

    void deleteComment(int commentId);
}
