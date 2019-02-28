package hibernate.dao.implementations;

import hibernate.dao.interfaces.BasicDao;
import hibernate.model.Comment;
import hibernate.model.Subject;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SubjectDaoImpl<T> implements BasicDao<Subject> {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public List<Subject> getAll() {
        Criteria cr = sessionFactory.getCurrentSession().createCriteria(Subject.class);
        return cr.list();
    }

    @Override
    public Subject getById(int id) {
        Criteria cr = sessionFactory.getCurrentSession().createCriteria(Subject.class);
        cr.add(Restrictions.eq("id", id));
        return (Subject) cr.list().get(0);
    }

    @Override
    public List<Subject> getLikeName(String s) {
        Session session = sessionFactory.getCurrentSession();
        Criteria cr = session.createCriteria(Subject.class);
        cr.add(Restrictions.ilike("name", s, MatchMode.ANYWHERE));
        return cr.list();
    }

    @Override
    public Subject getByName(String name) {
        Session session = sessionFactory.getCurrentSession();
        Criteria cr = session.createCriteria(Subject.class);
        cr.add(Restrictions.eq("name",name));
        return (Subject) cr.list().get(0);
    }

    @Override
    public void add(Subject model) {
        Session session = sessionFactory.getCurrentSession();
        Subject subject = new Subject();
        subject.setUsers(model.getUsers());
        subject.setTopic(model.getTopic());
        subject.setName(model.getName());
        subject.setDate(model.getDate());
        subject.setText(model.getText());
        session.save(subject);
    }

    @Override
    public void update(int id, Subject model) {
        Session session = sessionFactory.getCurrentSession();
        Subject subject = (Subject) session.get(Subject.class, id);
        subject.setUsers(model.getUsers());
        subject.setTopic(model.getTopic());
        subject.setName(model.getName());
        subject.setDate(model.getDate());
        subject.setText(model.getText());
        session.update(subject);
    }

    @Override
    public void delete(int id) {
        Session session = sessionFactory.getCurrentSession();
        Subject subject = (Subject) session.get(Subject.class, id);
        List<Comment> comments = subject.getComments();
        for (Comment comment : comments) {
            session.delete(comment);
        }
        session.delete(subject);
    }
}
