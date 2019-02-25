package hibernate.service.implementations;

import hibernate.dao.implementations.AppUserPrincipal;
import hibernate.dao.interfaces.CRUDDao;
import hibernate.dto.CommentDTO;
import hibernate.dto.SubjectDTO;
import hibernate.dto.TopicDTO;
import hibernate.dto.UsersDTO;
import hibernate.model.Comment;
import hibernate.model.Subject;
import hibernate.model.Topic;
import hibernate.model.Users;
import hibernate.service.interfaces.CRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class CRUDServiceImpl implements CRUDService {

    @Autowired
    private CRUDDao crudDao;

    public void setCrudDao(CRUDDao crudDao) {
        this.crudDao = crudDao;
    }


    private static java.sql.Date stringAsDate(String s) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        java.util.Date date = null;
        try {
            date = sdf.parse(s);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return new java.sql.Date(date.getTime());
    }

    @Transactional(readOnly = true)
    @Override
    public boolean searchBySubjectName(String subjectName) {
        List<Subject> subjects = crudDao.searchAllSubject();
        for (Subject subject : subjects) {
            if (subjectName.equals(subject.getName())) {
                return true;
            }
        }
        return false;
    }

    @Transactional(readOnly = true)
    @Override
    public List<SubjectDTO> searchSubjectByTopic(Topic topic) {
        List<Subject> subjectList = topic.getSubjects();
        List<SubjectDTO> subjects = new ArrayList<>();
        subjectToSubjectDTO(subjectList, subjects);
        return subjects;
    }

    @Transactional(readOnly = true)
    @Override
    public TopicDTO searchTopicById(int topicId) {
        Topic topic = crudDao.searchTopicById(topicId);
        TopicDTO topicDTO = new TopicDTO();
        topicDTO.setId(topic.getId());
        topicDTO.setTopicName(topic.getName());
        topicDTO.setSubjects(searchSubjectByTopic(topic));
        return topicDTO;
    }

    @Transactional(readOnly = true)
    @Override
    public SubjectDTO searchSubjectById(int subjectId) {
        Subject subject = crudDao.searchSubjectById(subjectId);
        SubjectDTO subjectDTO = new SubjectDTO();
        subjectDTO.setId(subject.getId());
        subjectDTO.setUserName(subject.getUsers().getNickname());
        subjectDTO.setSubjectName(subject.getName());
        subjectDTO.setDate(subject.getFormattedDateSending());
        subjectDTO.setTopicName(subject.getTopic().getName());
        subjectDTO.setText(subject.getText());
        subjectDTO.setComments(searchCommentBySubject(subject));
        return subjectDTO;
    }

    @Transactional(readOnly = true)
    @Override
    public List<TopicDTO> searchAllTopic() {
        List<Topic> topicList = crudDao.searchAllTopic();
        List<TopicDTO> topics = new ArrayList<>();
        topicToTopicDTO(topicList, topics);
        return topics;
    }

    @Transactional(readOnly = true)
    @Override
    public List<TopicDTO> searchAllTopicPaginated(int page, int size) {
        List<Topic> topicList = crudDao.searchAllTopic();
        List<TopicDTO> topics = new ArrayList<>();
        topicToTopicDTO(topicList, topics);
        int start = 0;
        start += (page-1) * size;
        int div = topics.size()/size;
        int mod = topics.size()%size;
        if (page-1 == div) return topics.subList(start,start + mod);
        if (start + size > topics.size()) return new ArrayList<>();
        return topics.subList(start, start + size);
    }

    @Transactional(readOnly = true)
    @Override
    public List<TopicDTO> searchLikeTopicPaginated(int page, int size, String search) {
        List<Topic> topicList = crudDao.searchLikeTopicName(search);
        List<TopicDTO> topics = new ArrayList<>();
        topicToTopicDTO(topicList, topics);
        int start = 0;
        start += (page-1) * size;
        int div = topics.size()/size;
        int mod = topics.size()%size;
        if (page-1 == div) return topics.subList(start,start + mod);
        if (start + size > topics.size()) return new ArrayList<>();
        return topics.subList(start, start + size);
    }

    @Transactional(readOnly = true)
    @Override
    public List<TopicDTO> searchLikeTopicName(String search) {
        List<Topic> topics = crudDao.searchLikeTopicName(search);
        List<TopicDTO> topicDTOList = new ArrayList<>();
        topicToTopicDTO(topics, topicDTOList);
        return topicDTOList;
    }

    private void topicToTopicDTO(List<Topic> topicList, List<TopicDTO> topics) {
        for (Topic topic : topicList) {
            TopicDTO topicDTO = new TopicDTO();
            topicDTO.setId(topic.getId());
            topicDTO.setTopicName(topic.getName());
            topicDTO.setSubjects(searchSubjectByTopic(topic));
            topics.add(topicDTO);
        }
    }

    @Transactional(readOnly = true)
    @Override
    public List<SubjectDTO> searchAllSubject() {
        List<Subject> subjects = crudDao.searchAllSubject();
        List<SubjectDTO> subjectDTOList = new ArrayList<>();
        subjectToSubjectDTO(subjects, subjectDTOList);
        return subjectDTOList;
    }

    @Transactional(readOnly = true)
    @Override
    public List<SubjectDTO> searchLikeSubjectName(String search) {
        List<Subject> subjects = crudDao.searchLikeSubjectName(search);
        List<SubjectDTO> subjectDTOList = new ArrayList<>();
        subjectToSubjectDTO(subjects, subjectDTOList);
        return subjectDTOList;
    }

    @Transactional(readOnly = true)
    @Override
    public List<SubjectDTO> searchLikeSubjectNamePaginated(int page, int size, String search) {
        List<Subject> subjectList = crudDao.searchLikeSubjectName(search);
        List<SubjectDTO> subjects = new ArrayList<>();
        subjectToSubjectDTO(subjectList, subjects);
        int start = 0;
        start += (page-1) * size;
        int div = subjects.size()/size;
        int mod = subjects.size()%size;
        if (page-1 == div) return subjects.subList(start,start + mod);
        if (start + size > subjects.size()) return new ArrayList<>();
        return subjects.subList(start, start + size);
    }

    @Transactional(readOnly = true)
    @Override
    public List<SubjectDTO> searchAllSubjectPaginated(int page, int size) {
        List<Subject> subjectList = crudDao.searchAllSubject();
        List<SubjectDTO> subjects = new ArrayList<>();
        subjectToSubjectDTO(subjectList, subjects);
        int start = 0;
        start += (page-1) * size;
        int div = subjects.size()/size;
        int mod = subjects.size()%size;
        if (page-1 == div) return subjects.subList(start,start + mod);
        if (start + size > subjects.size()) return new ArrayList<>();
        return subjects.subList(start, start + size);
    }

    @Transactional(readOnly = true)
    @Override
    public List<SubjectDTO> searchSubjectByTopicPaginated(int topicId, int page, int size) {
        TopicDTO topicDTO = searchTopicById(topicId);
        List<SubjectDTO> subjects = topicDTO.getSubjects();
        int start = 0;
        start += (page-1) * size;
        int div = subjects.size()/size;
        int mod = subjects.size()%size;
        if (page-1 == div) return subjects.subList(start,start + mod);
        if (start + size > subjects.size()) return new ArrayList<>();
        return subjects.subList(start, start + size);
    }

    private void subjectToSubjectDTO(List<Subject> subjects, List<SubjectDTO> subjectDTOList) {
        for (Subject subject : subjects) {
            SubjectDTO subjectDTO = new SubjectDTO();
            subjectDTO.setId(subject.getId());
            subjectDTO.setUserName(subject.getUsers().getNickname());
            subjectDTO.setSubjectName(subject.getName());
            subjectDTO.setTopicName(subject.getTopic().getName());
            subjectDTO.setDate(subject.getFormattedDateSending());
            subjectDTO.setText(subject.getText());
            subjectDTO.setComments(searchCommentBySubject(subject));
            subjectDTOList.add(subjectDTO);
        }
    }

    @Transactional(readOnly = true)
    @Override
    public List<CommentDTO> searchCommentBySubject(Subject subject) {
        List<Comment> commentList = subject.getComments();
        List<CommentDTO> comments = new ArrayList<>();
        commentToCommentDTO(commentList, comments);
        return comments;
    }

    @Transactional(readOnly = true)
    @Override
    public List<CommentDTO> searchAllComment() {
        List<Comment> commentList = crudDao.searchAllComment();
        List<CommentDTO> comments = new ArrayList<>();
        commentToCommentDTO(commentList, comments);
        return comments;
    }

    @Transactional(readOnly = true)
    @Override
    public List<CommentDTO> searchLikeComment(String search) {
        List<Comment> commentList = crudDao.searchLikeComment(search);
        List<CommentDTO> comments = new ArrayList<>();
        commentToCommentDTO(commentList, comments);
        return comments;
    }

    @Transactional(readOnly = true)
    @Override
    public List<CommentDTO> searchLikeCommentPaginated(int page, int size, String search) {
        List<Comment> commentList = crudDao.searchLikeComment(search);
        List<CommentDTO> comments = new ArrayList<>();
        commentToCommentDTO(commentList, comments);
        int start = 0;
        start += (page-1) * size;
        int div = comments.size()/size;
        int mod = comments.size()%size;
        if (page-1 == div) return comments.subList(start,start + mod);
        if (start + size > comments.size()) return new ArrayList<>();
        return comments.subList(start, start + size);
    }

    @Transactional(readOnly = true)
    @Override
    public List<CommentDTO> searchAllCommentPaginated(int page, int size) {
        List<Comment> commentList = crudDao.searchAllComment();
        List<CommentDTO> comments = new ArrayList<>();
        commentToCommentDTO(commentList, comments);
        int start = 0;
        start += (page-1) * size;
        int div = comments.size()/size;
        int mod = comments.size()%size;
        if (page-1 == div) return comments.subList(start,start + mod);
        if (start + size > comments.size()) return new ArrayList<>();
        return comments.subList(start, start + size);
    }


    @Transactional
    @Override
    public void insertTopic(TopicDTO topicDTO) {
        crudDao.insertTopic(topicDTO.getTopicName());
    }

    @Transactional(readOnly = true)
    @Override
    public List<UsersDTO> searchAllUsers() {
        List<Users> usersList = crudDao.searchAllUsers();
        List<UsersDTO> users = new ArrayList<>();
        userToUserDTO(usersList, users);
        return users;
    }

    @Transactional(readOnly = true)
    @Override
    public List<UsersDTO> searchAllUsersPaginated(int page, int size) {
        List<Users> usersList = crudDao.searchAllUsers();
        List<UsersDTO> users = new ArrayList<>();
        userToUserDTO(usersList, users);
        int start = 0;
        start += (page-1) * size;
        int div = users.size()/size;
        int mod = users.size()%size;
        if (page-1 == div) return users.subList(start,start + mod);
        if (start + size > users.size()) return new ArrayList<>();
        return users.subList(start, start + size);
    }

    @Transactional(readOnly = true)
    @Override
    public List<UsersDTO> searchLikeUserPaginated(int page, int size, String search) {
        List<Users> userList = crudDao.searchLikeUser(search);
        List<UsersDTO> users = new ArrayList<>();
        userToUserDTO(userList, users);
        int start = 0;
        start += (page-1) * size;
        int div = users.size()/size;
        int mod = users.size()%size;
        if (page-1 == div) return users.subList(start,start + mod);
        if (start + size > users.size()) return new ArrayList<>();
        return users.subList(start, start + size);
    }

    @Transactional(readOnly = true)
    @Override
    public List<UsersDTO> searchLikeUserName(String search) {
        List<Users> userList = crudDao.searchLikeUser(search);
        List<UsersDTO> users = new ArrayList<>();
        userToUserDTO(userList, users);
        return users;
    }

    private void userToUserDTO(List<Users> usersList, List<UsersDTO> users) {
        for (Users user : usersList) {
            UsersDTO usersDTO = new UsersDTO();
            usersDTO.setId(user.getId());
            usersDTO.setUserName(user.getNickname());
            usersDTO.setPassword(user.getPassword());
            usersDTO.setEmail(user.getEmail());
            usersDTO.setFirstName(user.getFirstName());
            usersDTO.setLastName(user.getLastName());
            users.add(usersDTO);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Boolean searchByUserName(String userName) {
        List<Users> users = crudDao.searchAllUsers();
        for (Users user : users) {
            if (userName.equals(user.getNickname())) {
                return true;
            }
        }
        return false;
    }

    @Transactional
    @Override
    public void updateTopic(int topicId, TopicDTO topicDTO) {
        crudDao.updateTopic(topicId, topicDTO.getTopicName());
    }

    @Transactional
    @Override
    public void deleteTopic(int topicId) {
        crudDao.deleteTopic(topicId);
    }

    @Transactional
    @Override
    public void insertSubject(SubjectDTO subjectDTO) {
        crudDao.insertSubject(subjectDTO.getSubjectName(), stringAsDate(subjectDTO.getDate()), subjectDTO.getText(),
                subjectDTO.getUserName(), subjectDTO.getTopicName());
    }

    @Transactional
    @Override
    public void updateSubject(int subjectId, SubjectDTO subjectDTO) {
        crudDao.updateSubject(subjectId, subjectDTO.getSubjectName(), stringAsDate(subjectDTO.getDate()), subjectDTO.getText(),
                subjectDTO.getUserName(), subjectDTO.getTopicName());
    }

    @Transactional
    @Override
    public void deleteSubject(int subjectId) {
        crudDao.deleteSubject(subjectId);
    }

    @Transactional
    @Override
    public void insertUsers(UsersDTO usersDTO) {
        crudDao.insertUsers(usersDTO.getUserName(),usersDTO.getPassword(),usersDTO.getEmail(),usersDTO.getFirstName(),
                usersDTO.getLastName());
    }

    @Transactional(readOnly = true)
    @Override
    public UsersDTO searchUserById(int userId) {
        Users users = crudDao.searchUserById(userId);
        UsersDTO usersDTO = new UsersDTO();
        usersDTO.setId(users.getId());
        usersDTO.setUserName(users.getNickname());
        usersDTO.setPassword(users.getPassword());
        usersDTO.setEmail(users.getEmail());
        usersDTO.setFirstName(users.getFirstName());
        usersDTO.setLastName(users.getLastName());
        return usersDTO;
    }

    @Transactional
    @Override
    public void updateUsers(int userId, UsersDTO usersDTO) {
        crudDao.updateUsers(userId, usersDTO.getUserName(),usersDTO.getPassword(),usersDTO.getEmail(),usersDTO.getFirstName(),
                usersDTO.getLastName());
    }

    @Transactional
    @Override
    public void deleteUsers(int userId) {
        crudDao.deleteUsers(userId);
    }

    @Transactional(readOnly = true)
    @Override
    public CommentDTO searchCommentById(int commentId) {
        Comment comment = crudDao.searchCommentById(commentId);
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setId(comment.getId());
        commentDTO.setUserName(comment.getUsers().getNickname());
        commentDTO.setSubjectName(comment.getSubject().getName());
        commentDTO.setTopicName(comment.getSubject().getTopic().getName());
        commentDTO.setMessage(comment.getMessage());
        commentDTO.setDate(comment.getFormattedDateSending());
        return commentDTO;
    }

    @Transactional
    @Override
    public void insertComment(CommentDTO commentDTO) {
        crudDao.insertComment(commentDTO.getMessage(), stringAsDate(commentDTO.getDate()), commentDTO.getUserName(),
                commentDTO.getSubjectName());
    }

    @Transactional
    @Override
    public void updateComment(int commentId, CommentDTO commentDTO) {
        crudDao.updateComment(commentId, commentDTO.getMessage(), stringAsDate(commentDTO.getDate()), commentDTO.getUserName(),
                commentDTO.getSubjectName());
    }

    @Transactional
    @Override
    public void deleteComment(int commentId) {
        crudDao.deleteComment(commentId);
    }

    private void commentToCommentDTO(List<Comment> commentList, List<CommentDTO> comments) {
        for (Comment comment : commentList) {
            CommentDTO commentDTO = new CommentDTO();
            commentDTO.setId(comment.getId());
            commentDTO.setUserName(comment.getUsers().getNickname());
            commentDTO.setSubjectName(comment.getSubject().getName());
            commentDTO.setTopicName(comment.getSubject().getTopic().getName());
            commentDTO.setMessage(comment.getMessage());
            commentDTO.setDate(comment.getFormattedDateSending());
            comments.add(commentDTO);
        }
    }
}
