package hibernate.service.interfaces;

import java.util.List;

public interface BasicService<T> {

    List<T> getAll();

    T getById(int id);

    List<T> getLikeName(String s);

    List<T> getLikeNamePaginated(int page, int size, String s);

    void add(T modelDTO);

    void update(int id, T modelDTO);

    void delete(int id);

}
