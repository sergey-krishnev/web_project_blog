package hibernate.dao.implementations;

import hibernate.dao.interfaces.BasicDao;
import hibernate.model.Comment;
import hibernate.model.Subject;
import hibernate.model.Topic;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TopicDaoImpl<T> implements BasicDao<Topic> {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public List<Topic> getAll() {
        Criteria cr = sessionFactory.getCurrentSession().createCriteria(Topic.class);
        return cr.list();
    }

    @Override
    public Topic getById(int id) {
        Criteria cr = sessionFactory.getCurrentSession().createCriteria(Topic.class);
        cr.add(Restrictions.eq("id", id));
        return (Topic) cr.list().get(0);
    }

    @Override
    public List<Topic> getLikeName(String s) {
        Session session = sessionFactory.getCurrentSession();
        Criteria cr = session.createCriteria(Topic.class);
        cr.add(Restrictions.ilike("name", s, MatchMode.ANYWHERE));
        return cr.list();
    }

    @Override
    public Topic getByName(String name) {
        Session session = sessionFactory.getCurrentSession();
        Criteria cr = session.createCriteria(Topic.class);
        cr.add(Restrictions.eq("name",name));
        return (Topic) cr.list().get(0);
    }

    @Override
    public void add(Topic model) {
        Session session = sessionFactory.getCurrentSession();
        Topic topic = new Topic();
        topic.setName(model.getName());
        session.save(topic);
    }

    @Override
    public void update(int id, Topic model) {
        Session session = sessionFactory.getCurrentSession();
        Topic topic = (Topic) session.get(Topic.class,id);
        topic.setName(model.getName());
        session.update(topic);
    }

    @Override
    public void delete(int id) {
        Session session = sessionFactory.getCurrentSession();
        Topic topic = (Topic) session.get(Topic.class,id);
        List<Subject> subjects = topic.getSubjects();
        deleteSubjectList(session, subjects);
        session.delete(topic);
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

}
