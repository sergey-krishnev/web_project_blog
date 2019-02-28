package hibernate.dao.implementations;

import hibernate.dao.interfaces.BasicDao;
import hibernate.model.Comment;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CommentDaoImpl<T> implements BasicDao<Comment> {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public List<Comment> getAll() {
        Criteria cr = sessionFactory.getCurrentSession().createCriteria(Comment.class);
        return cr.list();
    }

    @Override
    public Comment getById(int id) {
        Criteria cr = sessionFactory.getCurrentSession().createCriteria(Comment.class);
        cr.add(Restrictions.eq("id", id));
        return (Comment) cr.list().get(0);
    }

    @Override
    public List<Comment> getLikeName(String s) {
        Session session = sessionFactory.getCurrentSession();
        Criteria cr = session.createCriteria(Comment.class);
        cr.add(Restrictions.ilike("message", s, MatchMode.ANYWHERE));
        return cr.list();
    }

    @Override
    public Comment getByName(String name) {
        Session session = sessionFactory.getCurrentSession();
        Criteria cr = session.createCriteria(Comment.class);
        cr.add(Restrictions.eq("message",name));
        return (Comment) cr.list().get(0);
    }

    @Override
    public void add(Comment model) {
        Session session = sessionFactory.getCurrentSession();
        Comment comment = new Comment();
        comment.setMessage(model.getMessage());
        comment.setDate(model.getDate());
        comment.setSubject(model.getSubject());
        comment.setUsers(model.getUsers());
        session.save(comment);
    }

    @Override
    public void update(int id, Comment model) {
        Session session = sessionFactory.getCurrentSession();
        Comment comment = (Comment) session.get(Comment.class, id);
        comment.setMessage(model.getMessage());
        comment.setDate(model.getDate());
        comment.setSubject(model.getSubject());
        comment.setUsers(model.getUsers());
        session.update(comment);
    }

    @Override
    public void delete(int id) {
        Session session = sessionFactory.getCurrentSession();
        Comment comment = (Comment) session.get(Comment.class, id);
        session.delete(comment);
    }
}
