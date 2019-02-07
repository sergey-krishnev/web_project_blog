package hibernate.dao.implementations;

import hibernate.dao.interfaces.CRUDDao;
import hibernate.dto.CommentDTO;
import hibernate.model.Comment;
import hibernate.model.Subject;
import hibernate.model.Topic;
import hibernate.model.Users;
import org.apache.log4j.Logger;
import org.hibernate.*;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.jws.soap.SOAPBinding;
import java.sql.Date;
import java.util.List;

@Repository
public class CriteriaDaoImpl implements CRUDDao {

    private final static Logger LOGGER = Logger.getLogger(CriteriaDaoImpl.class);
    private final static String TYPE = "Criteria";

    @Autowired
    private SessionFactory sessionFactory;

    public CriteriaDaoImpl() {
    }


    @Override
    public List<Topic> searchAllTopic() {
        Criteria cr = sessionFactory.getCurrentSession().createCriteria(Topic.class);
        return cr.list();
    }

    @Override
    public List<Subject> searchAllSubject() {
        Criteria cr = sessionFactory.getCurrentSession().createCriteria(Subject.class);
        return cr.list();
    }

    @Override
    public Topic searchTopicById(int topicId) {
        Criteria cr = sessionFactory.getCurrentSession().createCriteria(Topic.class);
        cr.add(Restrictions.eq("id", topicId));
        return (Topic) cr.list().get(0);
    }

    @Override
    public Subject searchSubjectById(int subjectId) {
        Criteria cr = sessionFactory.getCurrentSession().createCriteria(Subject.class);
        cr.add(Restrictions.eq("id", subjectId));
        return (Subject) cr.list().get(0);
    }

    @Override
    public List<Comment> searchAllComment() {
        Criteria cr = sessionFactory.getCurrentSession().createCriteria(Comment.class);
        return cr.list();
    }

    @Override
    public List<Users> searchAllUsers() {
        Criteria cr = sessionFactory.getCurrentSession().createCriteria(Users.class);
        return cr.list();
    }

    @Override
    public Users searchByUserName(String username) {
        Session session = sessionFactory.getCurrentSession();
        Criteria cr = session.createCriteria(Users.class);
        cr.add(Restrictions.eq("nickname", username));
        return (Users) cr.list().get(0);
    }

    @Override
    public Topic searchByTopicName(String topicName) {
        Session session = sessionFactory.getCurrentSession();
        Criteria cr = session.createCriteria(Topic.class);
        cr.add(Restrictions.eq("name", topicName));
        return (Topic) cr.list().get(0);
    }

    @Override
    public Subject searchBySubjectName(String subjectName) {
        Session session = sessionFactory.getCurrentSession();
        Criteria cr = session.createCriteria(Subject.class);
        cr.add(Restrictions.eq("name", subjectName));
        return (Subject) cr.list().get(0);
    }

    @Override
    public void insertTopic(String topicName) {
        Session session = sessionFactory.getCurrentSession();
        Topic topic = new Topic();
        topic.setName(topicName);
        session.save(topic);
    }

    @Override
    public void updateTopic(int topicId, String topicName) {
        Session session = sessionFactory.getCurrentSession();
        Topic topic = (Topic) session.get(Topic.class,topicId);
        topic.setName(topicName);
        session.update(topic);
    }

    @Override
    public void deleteTopic(int topicId) {
        Session session = sessionFactory.getCurrentSession();
        Topic topic = (Topic) session.get(Topic.class,topicId);
        List<Subject> subjects = topic.getSubjects();
        deleteSubjectList(session, subjects);
        session.delete(topic);
    }

    @Override
    public void insertSubject(String subjectName, Date date, String text, String userName, String topicName) {
        Session session = sessionFactory.getCurrentSession();
        Users users = searchByUserName(userName);
        Topic topic = searchByTopicName(topicName);
        Subject subject = new Subject();
        subject.setUsers(users);
        subject.setTopic(topic);
        subject.setName(subjectName);
        subject.setDate(date);
        subject.setText(text);
        session.save(subject);
    }

    @Override
    public void updateSubject(int subjectId, String subjectName, Date date, String text, String userName, String topicName) {
        Session session = sessionFactory.getCurrentSession();
        Subject subject = (Subject) session.get(Subject.class, subjectId);
        Users users = searchByUserName(userName);
        Topic topic = searchByTopicName(topicName);
        subject.setUsers(users);
        subject.setTopic(topic);
        subject.setName(subjectName);
        subject.setDate(date);
        subject.setText(text);
        session.update(subject);
    }

    @Override
    public void deleteSubject(int subjectId) {
        Session session = sessionFactory.getCurrentSession();
        Subject subject = (Subject) session.get(Subject.class, subjectId);
        List<Comment> comments = subject.getComments();
        for (Comment comment : comments) {
            session.delete(comment);
        }
        session.delete(subject);
    }

    @Override
    public void insertUsers(String userName, String password, String email, String firstName, String lastName) {
        Session session = sessionFactory.getCurrentSession();
        Users users = new Users();
        users.setNickname(userName);
        users.setPassword(password);
        users.setEmail(email);
        users.setFirstName(firstName);
        users.setLastName(lastName);
        session.save(users);
    }

    @Override
    public Users searchUserById(int userId) {
        Criteria cr = sessionFactory.getCurrentSession().createCriteria(Users.class);
        cr.add(Restrictions.eq("id", userId));
        return (Users) cr.list().get(0);
    }

    @Override
    public void updateUsers(int userId, String userName, String password, String email, String firstName, String lastName) {
        Session session = sessionFactory.getCurrentSession();
        Users users = (Users) session.get(Users.class, userId);
        users.setNickname(userName);
        users.setPassword(password);
        users.setEmail(email);
        users.setFirstName(firstName);
        users.setLastName(lastName);
        session.update(users);
    }

    @Override
    public void deleteUsers(int userId) {
        Session session = sessionFactory.getCurrentSession();
        Users users = (Users) session.get(Users.class, userId);
        List<Subject> subjects = users.getSubjects();
        deleteSubjectList(session, subjects);
        List<Comment> comments = users.getComments();
        for (Comment comment : comments) {
            session.delete(comment);
        }
        session.delete(users);
    }

    private void deleteSubjectList(Session session, List<Subject> subjects) {
        for (Subject subject : subjects) {
            List<Comment> comments = subject.getComments();
            for (Comment comment : comments) {
                session.delete(comment);
            }
            session.delete(subject);
        }
    }

    @Override
    public Comment searchCommentById(int commentId) {
        Criteria cr = sessionFactory.getCurrentSession().createCriteria(Comment.class);
        cr.add(Restrictions.eq("id", commentId));
        return (Comment) cr.list().get(0);
    }

    @Override
    public void insertComment(String message, Date date, String userName, String subjectName) {
        Session session = sessionFactory.getCurrentSession();
        Subject subject = searchBySubjectName(subjectName);
        Users users = searchByUserName(userName);
        Comment comment = new Comment();
        comment.setMessage(message);
        comment.setDate(date);
        comment.setSubject(subject);
        comment.setUsers(users);
        session.save(comment);
    }

    @Override
    public void updateComment(int commentId, String message, Date date, String userName, String subjectName) {
        Session session = sessionFactory.getCurrentSession();
        Subject subject = searchBySubjectName(subjectName);
        Users users = searchByUserName(userName);
        Comment comment = (Comment) session.get(Comment.class, commentId);
        comment.setMessage(message);
        comment.setMessage(message);
        comment.setDate(date);
        comment.setSubject(subject);
        comment.setUsers(users);
        session.update(comment);
    }

    @Override
    public void deleteComment(int commentId) {
        Session session = sessionFactory.getCurrentSession();
        Comment comment = (Comment) session.get(Comment.class, commentId);
        session.delete(comment);
    }

}
