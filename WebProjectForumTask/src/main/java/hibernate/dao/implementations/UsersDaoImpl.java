package hibernate.dao.implementations;

import hibernate.dao.interfaces.BasicDao;
import hibernate.model.Authority;
import hibernate.model.Comment;
import hibernate.model.Subject;
import hibernate.model.Users;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UsersDaoImpl<T> implements BasicDao<Users> {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public List<Users> getAll() {
        Criteria cr = sessionFactory.getCurrentSession().createCriteria(Users.class);
        return cr.list();
    }

    @Override
    public Users getById(int id) {
        Criteria cr = sessionFactory.getCurrentSession().createCriteria(Users.class);
        cr.add(Restrictions.eq("id", id));
        return (Users) cr.list().get(0);
    }

    @Override
    public List<Users> getLikeName(String s) {
        Session session = sessionFactory.getCurrentSession();
        Criteria cr = session.createCriteria(Users.class);
        cr.add(Restrictions.ilike("nickname", s, MatchMode.ANYWHERE));
        return cr.list();
    }

    @Override
    public Users getByName(String name) {
        Session session = sessionFactory.getCurrentSession();
        Criteria cr = session.createCriteria(Users.class);
        cr.add(Restrictions.eq("nickname", name));
        return (Users) cr.list().get(0);
    }

    @Override
    public void add(Users model) {
        Session session = sessionFactory.getCurrentSession();
        Users users = new Users();
        users.setNickname(model.getNickname());
        users.setPassword(model.getPassword());
        users.setEmail(model.getEmail());
        users.setFirstName(model.getFirstName());
        users.setLastName(model.getLastName());
        session.save(users);
    }

    @Override
    public void update(int id, Users model) {
        Session session = sessionFactory.getCurrentSession();
        Users users = (Users) session.get(Users.class, id);
        users.setNickname(model.getNickname());
        users.setPassword(model.getPassword());
        users.setEmail(model.getEmail());
        users.setFirstName(model.getFirstName());
        users.setLastName(model.getLastName());
        session.update(users);
    }

    @Override
    public void delete(int id) {
        Session session = sessionFactory.getCurrentSession();
        Users users = (Users) session.get(Users.class, id);
        List<Subject> subjects = users.getSubjects();
        deleteSubjectList(session, subjects);
        List<Comment> comments = users.getComments();
        for (Comment comment : comments) {
            session.delete(comment);
        }
        List<Authority> authorities = users.getAuthorities();
        for (Authority authority : authorities) {
            session.delete(authority);
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
}
