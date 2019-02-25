package hibernate.service.interfaces;

import hibernate.dto.CommentDTO;
import hibernate.dto.SubjectDTO;
import hibernate.dto.TopicDTO;
import hibernate.dto.UsersDTO;
import hibernate.model.Comment;
import hibernate.model.Subject;
import hibernate.model.Topic;
import hibernate.model.Users;

import java.sql.Date;
import java.util.List;

public interface CRUDService {

    boolean searchBySubjectName(String subject);

    List<SubjectDTO> searchSubjectByTopic(Topic topic);

    TopicDTO searchTopicById(int topicId);

    SubjectDTO searchSubjectById(int subjectId);

    List<TopicDTO> searchAllTopic();

    List<TopicDTO> searchAllTopicPaginated(int page, int size);

    List<TopicDTO> searchLikeTopicPaginated(int page, int size, String search);

    List<TopicDTO> searchLikeTopicName(String search);

    List<SubjectDTO> searchAllSubject();

    List<SubjectDTO> searchLikeSubjectName(String search);

    List<SubjectDTO> searchLikeSubjectNamePaginated(int page, int size, String search);

    List<SubjectDTO> searchAllSubjectPaginated(int page, int size);

    List<SubjectDTO> searchSubjectByTopicPaginated(int topicId, int page, int size);

    List<CommentDTO> searchCommentBySubject(Subject subject);

    List<CommentDTO> searchAllComment();

    List<CommentDTO> searchLikeComment(String search);

    List<CommentDTO> searchLikeCommentPaginated(int page, int size, String search);

    List<CommentDTO> searchAllCommentPaginated(int page, int size);

    void insertTopic(TopicDTO topicDTO);

    List<UsersDTO> searchAllUsers();

    List<UsersDTO> searchAllUsersPaginated(int page, int size);

    List<UsersDTO> searchLikeUserPaginated(int page, int size, String search);

    List<UsersDTO> searchLikeUserName(String search);

    Boolean searchByUserName(String username);

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
