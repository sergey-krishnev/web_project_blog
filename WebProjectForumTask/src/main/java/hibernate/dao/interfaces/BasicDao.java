package hibernate.dao.interfaces;

import hibernate.model.Comment;
import hibernate.model.Subject;
import hibernate.model.Topic;
import hibernate.model.Users;

import java.sql.Date;
import java.util.List;

public interface BasicDao<T> {

    List<T> getAll();

    T getById(int id);

    List<T> getLikeName(String s);

    T getByName(String name);

    void add(T model);

    void update(int id, T model);

    void delete(int id);

}
