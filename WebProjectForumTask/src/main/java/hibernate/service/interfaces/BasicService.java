package hibernate.service.interfaces;

import java.util.List;

public interface BasicService<T> {

    List<T> getAll();

    T getById(int id);

    boolean getByName(String name);

    List<T> getLikeName(String s);

    List<T> getLikeNamePaginated(int page, int size, String s);

    List<T> getCustomLikeNamePaginated(int page, int size, String s, int id);

    void add(T modelDTO);

    void update(int id, T modelDTO);

    void delete(int id);

}
